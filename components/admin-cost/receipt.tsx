import type { Inputs, Result } from "@/lib/admin-cost/model";
import { HOURS_PER_PERSON_MONTH } from "@/lib/admin-cost/model";
import { decimal, hours, money, percent } from "@/lib/format";

export function Receipt({ result, inputs }: { result: Result; inputs: Inputs }) {
  const maxHours = Math.max(...result.lines.map((l) => l.hours), 1);
  const teamHours = inputs.teamSize * HOURS_PER_PERSON_MONTH;
  const overTeam = result.teamShare > 1;

  return (
    <section
      id="receipt"
      aria-labelledby="receipt-title"
      className="receipt relative scroll-mt-24 rounded-t-[var(--radius-card)] border border-line bg-paper px-5 pb-8 pt-6 shadow-[0_10px_30px_-12px_rgba(13,27,62,0.25)] sm:px-6"
    >
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-muted">
        <h2 id="receipt-title" className="text-xs text-muted">Your admin bill</h2>
        <span className="num">{inputs.headcount.toLocaleString("en-US")} employees</span>
      </div>

      <div aria-live="polite" aria-atomic="true" className="mt-4">
        <p className="text-sm text-muted">Estimated cost per year</p>
        <p className="text-[44px] font-extrabold leading-none tracking-tight text-navy sm:text-5xl">
          {money(result.annualCost, inputs.currency, { compact: true })}
        </p>
        <p className="mt-2 text-sm">
          <span className="num font-semibold text-navy">{hours(result.monthlyHours)}</span> a month, or{" "}
          <span className="num font-semibold text-navy">{decimal(result.people)}</span>{" "}
          {result.people >= 0.95 && result.people < 1.05 ? "person" : "people"} working full-time on admin
        </p>
      </div>

      <table className="mt-5 w-full border-t border-dashed border-line-strong text-sm">
        <caption className="sr-only">Hours and yearly cost for each admin job</caption>
        <thead>
          <tr className="text-left text-xs text-muted">
            <th scope="col" className="py-2 font-medium">Job</th>
            <th scope="col" className="py-2 text-right font-medium">hrs/mo</th>
            <th scope="col" className="py-2 text-right font-medium">per year</th>
          </tr>
        </thead>
        <tbody>
          {result.lines.length === 0 && (
            <tr>
              <td colSpan={3} className="py-4 text-muted">Tick at least one job to see the bill.</td>
            </tr>
          )}
          {result.lines.map((line) => (
            <tr key={line.task.id} className="align-top">
              <td className="py-1.5 pr-2">
                <span className="text-navy">{line.task.label}</span>
                {line.custom && <span className="ml-1 text-xs text-muted">(your figure)</span>}
                <span aria-hidden="true" className="mt-1 block h-1.5 rounded-r bg-blue-100">
                  <span className="block h-full rounded-r bg-blue" style={{ width: `${(line.hours / maxHours) * 100}%` }} />
                </span>
              </td>
              <td className="num py-1.5 text-right">{decimal(line.hours, 0)}</td>
              <td className="num py-1.5 pl-2 text-right text-navy">{money(line.annualCost, inputs.currency)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-dashed border-line-strong font-bold text-navy">
            <th scope="row" className="pt-2 text-left">Total</th>
            <td className="num pt-2 text-right">{decimal(result.monthlyHours, 0)}</td>
            <td className="num pt-2 pl-2 text-right">{money(result.annualCost, inputs.currency)}</td>
          </tr>
        </tfoot>
      </table>

      <div className="mt-6">
        <div className="flex items-baseline justify-between text-sm">
          <span className="font-semibold text-navy">Share of your HR team&apos;s month</span>
          <span className="num font-bold text-navy">{percent(result.teamShare)}</span>
        </div>
        <div
          role="meter"
          aria-label="Share of your HR team's month spent on these jobs"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(Math.min(result.teamShare, 1) * 100)}
          className="mt-2 h-2.5 overflow-hidden rounded-full bg-blue-100"
        >
          <div
            className={`h-full rounded-full ${result.teamShare > 0.5 ? "bg-warn" : "bg-blue"}`}
            style={{ width: `${Math.min(result.teamShare, 1) * 100}%` }}
          />
        </div>
        <p className="mt-1.5 text-xs text-muted">
          {inputs.teamSize} {inputs.teamSize === 1 ? "person" : "people"} × {HOURS_PER_PERSON_MONTH} h = {teamHours.toLocaleString("en-US")} h a month
        </p>
        {overTeam && (
          <p className="mt-2 rounded-lg bg-warn-50 p-2.5 text-xs text-warn">
            That&apos;s more hours than your team has. Either more people help with HR admin than {inputs.teamSize}, or
            some lines are high. Adjust any that look wrong.
          </p>
        )}
      </div>
    </section>
  );
}
