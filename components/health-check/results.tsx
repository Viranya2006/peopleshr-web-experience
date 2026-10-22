"use client";

import Link from "next/link";
import { useState } from "react";
import { LeadForm } from "@/components/lead-form";
import { INDUSTRIES, SIZE_BANDS } from "@/lib/health-check/questions";
import { PRIORITY_CEILING, STAGES, firstStepFor, type Outcome, type Profile } from "@/lib/health-check/scoring";
import { track } from "@/lib/track";

type Props = { outcome: Outcome; profile: Profile; shared: boolean; onRestart: () => void };

// Each stage's segment is as wide as its score range, so the marker sits over the right stage.
const stageColumns = STAGES.map((s, i) => `${(STAGES[i + 1]?.min ?? 100) - s.min}fr`).join(" ");

export function Results({ outcome, profile, shared, onRestart }: Props) {
  const industry = INDUSTRIES.find((i) => i.id === profile.industry)!;
  const size = SIZE_BANDS.find((s) => s.id === profile.size)!;
  const priorityIds = new Set(outcome.priorities.map((p) => p.area.id));
  const leadContext = {
    stage: outcome.stage.name,
    overall: outcome.overall,
    priorities: outcome.priorities.map((p) => p.area.id).join(","),
    package: outcome.pkg.name,
    size: profile.size,
    industry: profile.industry,
    role: profile.role,
  };

  return (
    <div className="space-y-12">
      <section aria-labelledby="stage-title" className="rounded-[var(--radius-card)] bg-navy p-6 text-blue-100 sm:p-8">
        {shared && <p className="mb-3 text-sm text-blue-100/80">Someone shared this result with you.</p>}
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-blue-100/80">Where you are today</p>
        <h2 id="stage-title" data-step-heading tabIndex={-1} className="mt-2 text-3xl font-extrabold text-white outline-none sm:text-4xl">
          {outcome.stage.name}
        </h2>
        <p className="mt-2 max-w-2xl text-blue-100">{outcome.stage.summary}</p>

        <div className="mt-8">
          <div className="relative">
            <div className="grid gap-[2px]" style={{ gridTemplateColumns: stageColumns }} aria-hidden="true">
              {STAGES.map((s) => (
                <span key={s.name} className={`h-2 first:rounded-l-full last:rounded-r-full ${s.name === outcome.stage.name ? "bg-white" : "bg-white/20"}`} />
              ))}
            </div>
            <span
              aria-hidden="true"
              className="absolute -top-1.5 size-5 -translate-x-1/2 rounded-full border-[3px] border-navy bg-blue"
              style={{ left: `${outcome.overall}%` }}
            />
          </div>
          <ol className="mt-3 grid gap-2 text-xs" style={{ gridTemplateColumns: stageColumns }}>
            {STAGES.map((s) => (
              <li key={s.name} className={`whitespace-nowrap last:justify-self-end ${s.name === outcome.stage.name ? "font-semibold text-white" : "invisible text-blue-100/70 sm:visible"}`}>
                {s.name}
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm">
            Overall score <strong className="text-white">{outcome.overall} / 100</strong>, for a{" "}
            {industry.phrase ? `${industry.phrase} ` : ""}business with {size.phrase}.
          </p>
        </div>
      </section>

      <section aria-labelledby="areas-title">
        <h2 id="areas-title" className="text-2xl font-bold">
          How each area scores
        </h2>
        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
          <span className="flex items-center gap-2"><span className="h-2.5 w-4 rounded-sm bg-blue" aria-hidden="true" />Priority for you</span>
          <span className="flex items-center gap-2"><span className="h-2.5 w-4 rounded-sm bg-slate-400" aria-hidden="true" />Not a priority right now</span>
        </div>
        <ul className="mt-5 space-y-4">
          {[...outcome.areas]
            .sort((a, b) => a.score - b.score)
            .map((a) => {
              const priority = priorityIds.has(a.area.id);
              return (
                <li key={a.area.id} className="grid grid-cols-[minmax(0,9.5rem)_minmax(0,1fr)] items-center gap-3 sm:grid-cols-[12rem_minmax(0,1fr)]">
                  <span className="text-sm font-medium text-navy">
                    {a.area.name}
                    {priority && <span className="sr-only"> (priority)</span>}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="h-5 flex-1 rounded-r bg-surface-2">
                      <span
                        className={`block h-full rounded-r ${priority ? "bg-blue" : "bg-slate-400"}`}
                        style={{ width: `${Math.max(a.score, 1.5)}%` }}
                      />
                    </span>
                    <span className="num w-8 text-right text-sm font-semibold text-navy">{a.score}</span>
                  </span>
                </li>
              );
            })}
        </ul>
      </section>

      <section aria-labelledby="priorities-title">
        <h2 id="priorities-title" className="text-2xl font-bold">
          {outcome.priorities.length ? "Fix these first" : "Nothing urgent"}
        </h2>
        {outcome.priorities.length ? (
          <p className="mt-1 text-sm text-muted">
            Ranked by the size of the gap and how much it matters {industry.phrase ? `in ${industry.phrase}` : "for a business like yours"}.
          </p>
        ) : (
          <p className="mt-2 max-w-2xl">
            Every area scores {PRIORITY_CEILING} or more. Your next gains are in using the data you already have. Lexi AI and Insight are
            built for that.
          </p>
        )}
        <ol className="mt-6 space-y-4">
          {outcome.priorities.map((p, i) => (
            <li key={p.area.id} className="grid gap-5 rounded-[var(--radius-card)] border border-line bg-white p-5 sm:grid-cols-[3rem_minmax(0,1fr)] sm:p-6">
              <span className="num flex size-10 items-center justify-center rounded-full bg-blue text-lg font-bold text-white" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <h3 className="text-xl font-bold">
                  <span className="sr-only">Priority {i + 1}: </span>
                  {p.area.name} <span className="text-base font-medium text-muted">· scores {p.score}</span>
                </h3>
                <p className="mt-2">{p.area.why}</p>
                <div className="mt-4 rounded-xl bg-surface p-4">
                  <p className="text-sm font-semibold text-navy">A first step this month</p>
                  <p className="mt-1 text-sm">{firstStepFor(p)}</p>
                </div>
                <p className="mt-3 text-sm">
                  <span className="text-muted">Where PeoplesHR helps: </span>
                  <span className="font-semibold text-blue">{p.area.module}</span>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="package-title" className="rounded-[var(--radius-card)] border border-line bg-surface p-6 sm:p-8">
        <p className="eyebrow">Which package fits</p>
        <h2 id="package-title" className="mt-2 text-2xl font-bold">
          Start with PeoplesHR {outcome.pkg.name}
        </h2>
        <p className="mt-2 max-w-2xl">{outcome.pkg.reason}</p>
        <ol className="mt-5 flex flex-wrap gap-2 text-sm" aria-label="Packages">
          {(["Manage", "Grow", "Transform"] as const).map((name) => (
            <li
              key={name}
              aria-current={name === outcome.pkg.name ? "true" : undefined}
              className={`rounded-full border px-4 py-1.5 font-semibold ${name === outcome.pkg.name ? "border-navy bg-navy text-white" : "border-line-strong bg-white text-muted"}`}
            >
              {name}
            </li>
          ))}
        </ol>
        <p className="mt-4 text-xs text-muted">
          Indicative only. A consultant confirms the fit, and each package is scoped to your team size.{" "}
          <a href="https://www.peopleshr.com/pricing/" className="text-blue underline-offset-2 hover:underline" onClick={() => track("cta_click", { tool: "health-check", cta: "packages" })}>
            Compare packages on peopleshr.com
          </a>
        </p>
      </section>

      <section aria-labelledby="report-title" className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div className="rounded-[var(--radius-card)] border border-line bg-white p-6">
          <h2 id="report-title" className="text-xl font-bold">
            Get the full report
          </h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
            <li>A 90-day plan for your three priorities, week by week</li>
            <li>How {industry.phrase ? `${industry.phrase} teams` : "teams"} of your size usually score, area by area</li>
            <li>A one-page summary to share with leadership</li>
          </ul>
          <div className="mt-5">
            <LeadForm
              source="health-check"
              intent="report"
              fields={["name", "company"]}
              context={leadContext}
              submitLabel="Send me the report"
              successTitle="Your report is on its way."
              successBody="It usually arrives within a few minutes. If you don't see it, check your promotions folder."
            />
          </div>
        </div>
        <div className="flex flex-col rounded-[var(--radius-card)] bg-blue-50 p-6">
          <h2 className="text-xl font-bold">Rather talk it through?</h2>
          <p className="mt-2 text-sm">
            A PeoplesHR consultant will go through your result with you, starting with{" "}
            {outcome.priorities[0]?.area.name.toLowerCase() ?? "your reporting"}. No slides, just your answers.
          </p>
          <div className="mt-5">
            <LeadForm
              source="health-check"
              intent="consultation"
              fields={["name"]}
              context={leadContext}
              submitLabel="Book a call"
              successTitle="Thanks. We'll be in touch."
              successBody="A consultant will email you to find a time. Your answers are already with them."
              note="We reply within one working day."
              compact
            />
          </div>
        </div>
      </section>

      <ResultActions onRestart={onRestart} />

      <p className="text-sm">
        Want a number to go with this?{" "}
        <Link href="/admin-cost" className="font-semibold text-blue hover:underline">
          Work out what your HR admin costs
        </Link>
        .
      </p>
    </div>
  );
}

function ResultActions({ onRestart }: { onRestart: () => void }) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        className="btn btn-secondary"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            track("share_link", { tool: "health-check" });
          } catch {
            setCopied(false);
          }
        }}
      >
        {copied ? "Link copied" : "Copy a link to this result"}
      </button>
      <button type="button" className="btn btn-secondary" onClick={onRestart}>
        Start again
      </button>
      <span aria-live="polite" className="sr-only">{copied ? "Link copied to clipboard" : ""}</span>
    </div>
  );
}
