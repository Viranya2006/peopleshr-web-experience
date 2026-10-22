"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { LeadForm } from "@/components/lead-form";
import { SliderField } from "@/components/slider-field";
import { CURRENCIES, TASKS, calculate, hoursFor, topLines, type CurrencyCode, type TaskId } from "@/lib/admin-cost/model";
import { LIMITS, currencyForLocale, defaultState, fromSearchParams, toSearchParams, type CalcState } from "@/lib/admin-cost/state";
import { money } from "@/lib/format";
import { track } from "@/lib/track";
import { TheMaths, Verdict, WhereItGoes } from "./findings";
import { Receipt } from "./receipt";
import { TaskRow } from "./task-row";

export function AdminCostTool() {
  // The server renders the defaults so the page is complete without JavaScript and
  // indexable. A shared link or the visitor's locale then adjusts it after hydration.
  const [state, setState] = useState<CalcState>(() => defaultState());
  const [hydrated, setHydrated] = useState(false);
  const started = useRef(false);
  const referrer = useRef<string | undefined>(undefined);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    referrer.current = params.get("from") ?? undefined;
    params.delete("from");
    const fallback = defaultState(currencyForLocale(navigator.language));
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading the URL is only possible after hydration
    setState(params.size > 0 ? fromSearchParams(params, fallback) : fallback);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const query = toSearchParams(state).toString();
    window.history.replaceState(null, "", `${window.location.pathname}?${query}`);
  }, [state, hydrated]);

  const result = useMemo(() => calculate(state, state), [state]);

  function update(patch: Partial<CalcState>) {
    if (!started.current) {
      started.current = true;
      track("tool_start", { tool: "admin-cost", from: referrer.current });
    }
    setState((s) => ({ ...s, ...patch }));
  }

  function setCurrency(currency: CurrencyCode) {
    update({ currency, hourlyCost: CURRENCIES[currency].hourly });
  }

  function toggleTask(id: TaskId) {
    const disabled = state.disabled.includes(id) ? state.disabled.filter((d) => d !== id) : [...state.disabled, id];
    update({ disabled });
  }

  function setTaskHours(id: TaskId, hours: number | undefined) {
    const overrides = { ...state.overrides };
    if (hours === undefined) delete overrides[id];
    else overrides[id] = hours;
    update({ overrides });
  }

  const rate = CURRENCIES[state.currency];
  const leadContext = {
    annualCost: Math.round(result.annualCost),
    currency: state.currency,
    headcount: state.headcount,
    hoursPerMonth: Math.round(result.monthlyHours),
    topJobs: topLines(result).map((l) => l.task.id).join(","),
  };

  return (
    <div>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-10">
        <div className="no-print space-y-10">
          <fieldset className="rounded-[var(--radius-card)] border border-line bg-white p-5 sm:p-6">
            <legend className="px-1 text-lg font-bold text-navy">1. Your organisation</legend>
            <div className="mt-2 grid gap-6 sm:grid-cols-2">
              <SliderField
                label="Employees"
                value={state.headcount}
                min={LIMITS.headcount.min}
                max={LIMITS.headcount.max}
                sliderMax={2000}
                step={10}
                onChange={(headcount) => update({ headcount })}
              />
              <SliderField
                label="HR and payroll staff"
                hint="Everyone who does this admin. Count part-timers as 0.5."
                value={state.teamSize}
                min={LIMITS.teamSize.min}
                max={LIMITS.teamSize.max}
                sliderMax={20}
                step={0.5}
                onChange={(teamSize) => update({ teamSize })}
              />
              <div>
                <label htmlFor="currency" className="field-label">
                  Currency
                </label>
                <select
                  id="currency"
                  value={state.currency}
                  onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                  className="field-input"
                >
                  {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
                    <option key={code} value={code}>
                      {code} · {CURRENCIES[code].label}
                    </option>
                  ))}
                </select>
              </div>
              <SliderField
                label="Hourly cost per person"
                hint="Salary plus employer costs. Our default is a starting point; use your own."
                value={state.hourlyCost}
                min={rate.min}
                max={rate.max}
                step={rate.step}
                unit={state.currency}
                onChange={(hourlyCost) => update({ hourlyCost })}
              />
              <div className="sm:col-span-2">
                <SliderField
                  label="Payslips corrected after payday"
                  hint="Rough share of employees whose pay needs fixing each month. Unsure? 1–3% is common for spreadsheet payroll."
                  value={state.errorRate}
                  min={LIMITS.errorRate.min}
                  max={LIMITS.errorRate.max}
                  step={0.5}
                  unit="%"
                  onChange={(errorRate) => update({ errorRate })}
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-lg font-bold text-navy">2. The admin jobs your team does</legend>
            <p className="mt-1 text-sm text-muted">
              Untick anything you don&apos;t do. If our hours look wrong for your team, change them.
            </p>
            <ul className="mt-4 space-y-3">
              {TASKS.map((task) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  enabled={!state.disabled.includes(task.id)}
                  hours={hoursFor(task, state, state)}
                  estimate={hoursFor(task, state, { disabled: [], overrides: {} })}
                  custom={state.overrides[task.id] !== undefined}
                  onToggle={() => toggleTask(task.id)}
                  onHours={(h) => setTaskHours(task.id, h)}
                />
              ))}
            </ul>
          </fieldset>
        </div>

        <div className="lg:sticky lg:top-24">
          <Receipt result={result} inputs={state} />
          <ShareActions />
        </div>
      </div>

      <MobileTotal amount={money(result.annualCost, state.currency, { compact: true })} />

      <div className="mt-14 space-y-10">
        <Verdict result={result} inputs={state} />
        <WhereItGoes result={result} />
        <TheMaths inputs={state} />

        <section aria-labelledby="next-title" className="no-print grid gap-6 lg:grid-cols-2">
          <h2 id="next-title" className="sr-only">
            Next steps
          </h2>
          <div className="rounded-[var(--radius-card)] border border-line bg-white p-6">
            <h3 className="text-xl font-bold">Send this to your finance lead</h3>
            <p className="mt-2 text-sm">
              We&apos;ll email the bill with your assumptions and a link that opens it exactly as you left it.
            </p>
            <div className="mt-5">
              <LeadForm
                source="admin-cost"
                intent="report"
                fields={["company"]}
                context={leadContext}
                submitLabel="Email me the breakdown"
                successTitle="On its way."
                successBody="Check your inbox in a minute or two. The link inside reopens this exact calculation."
              />
            </div>
          </div>
          <div className="rounded-[var(--radius-card)] bg-navy p-6 text-blue-100">
            <h3 className="text-xl font-bold text-white">Go through these numbers with a consultant</h3>
            <p className="mt-2 text-sm">
              30 minutes, your figures already on the screen. We&apos;ll show how teams your size handle{" "}
              {topLines(result)[0]?.task.label.toLowerCase() ?? "payroll"} in PeoplesHR, and tell you honestly if
              it isn&apos;t worth it yet.
            </p>
            <div className="mt-5 [&_.field-label]:text-white [&_.text-muted]:text-blue-100/80">
              <LeadForm
                source="admin-cost"
                intent="consultation"
                fields={["name", "company"]}
                context={leadContext}
                submitLabel="Book a 30-minute walkthrough"
                successTitle="Thanks, we've got your numbers."
                successBody={`A consultant will email you to pick a time. They'll already have your ${money(result.annualCost, state.currency)} estimate, so you won't need to explain it again.`}
                note="We reply within one working day."
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// On small screens the bill sits below the inputs, so a running total follows the visitor
// until the bill itself scrolls into view.
function MobileTotal({ amount }: { amount: string }) {
  const [billVisible, setBillVisible] = useState(false);

  useEffect(() => {
    const bill = document.getElementById("receipt");
    if (!bill) return;
    const observer = new IntersectionObserver(([entry]) => setBillVisible(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(bill);
    return () => observer.disconnect();
  }, []);

  if (billVisible) return null;

  return (
    <div className="no-print fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 px-4 py-3 shadow-[0_-6px_20px_-10px_rgba(13,27,62,0.3)] backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-xl items-center justify-between gap-3">
        <p className="text-sm">
          <span className="block text-xs text-muted">Admin cost per year</span>
          <span className="text-lg font-bold text-navy">{amount}</span>
        </p>
        <a href="#receipt" className="btn btn-primary">
          See the bill
        </a>
      </div>
    </div>
  );
}

function ShareActions() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      track("share_link", { tool: "admin-cost" });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="no-print mt-6 flex flex-wrap gap-3">
      <button type="button" onClick={copy} className="btn btn-secondary">
        {copied ? "Link copied" : "Copy link to this bill"}
      </button>
      <button
        type="button"
        onClick={() => {
          track("cta_click", { tool: "admin-cost", cta: "print" });
          window.print();
        }}
        className="btn btn-secondary"
      >
        Save as PDF
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Link copied to clipboard" : ""}
      </span>
    </div>
  );
}
