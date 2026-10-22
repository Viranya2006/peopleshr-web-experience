import type { Inputs, Result, Verdict } from "@/lib/admin-cost/model";
import { HOURS_PER_PAYROLL_FIX, HOURS_PER_PERSON_MONTH, RECOVERY, TASKS, topLines } from "@/lib/admin-cost/model";
import { decimal, hours, money } from "@/lib/format";

const VERDICT: Record<Verdict, { title: string; tone: string; body: (r: Result) => string }> = {
  minor: {
    title: "Probably not urgent",
    tone: "border-line bg-surface",
    body: () =>
      "These jobs take under a quarter of one person's time. Worth tidying up next time you review your systems, but not a project on its own.",
  },
  "worth-fixing": {
    title: "Worth fixing",
    tone: "border-blue/30 bg-blue-50",
    body: (r) =>
      `That's ${Math.round(r.people * 100)}% of a full-time person's month, spent re-checking and re-typing instead of on the work they were hired for.`,
  },
  costly: {
    title: "You're paying for an admin role you never hired",
    tone: "border-warn/30 bg-warn-50",
    body: (r) =>
      `About ${decimal(r.people)} people's worth of time goes on these jobs every month. That's a headcount decision hiding inside your processes.`,
  },
};

export function Verdict({ result, inputs }: { result: Result; inputs: Inputs }) {
  const v = VERDICT[result.verdict];
  const pct = (n: number) => `${Math.round(n * 100)}%`;

  return (
    <section aria-labelledby="verdict-title" className={`rounded-[var(--radius-card)] border p-6 ${v.tone}`}>
      <p className="eyebrow">Is it worth fixing?</p>
      <h2 id="verdict-title" className="mt-2 text-2xl font-bold">
        {v.title}
      </h2>
      <p className="mt-2 max-w-2xl">{v.body(result)}</p>

      {result.annualCost > 0 && (
        <dl className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-white p-4">
            <dt className="text-sm text-muted">
              Worth getting back, if {pct(RECOVERY.low)}–{pct(RECOVERY.high)} of this work goes away
            </dt>
            <dd className="mt-1 text-2xl font-bold text-navy">
              {money(result.recoverable.low, inputs.currency, { compact: true })}–
              {money(result.recoverable.high, inputs.currency, { compact: true })}
              <span className="text-base font-medium text-muted"> a year</span>
            </dd>
          </div>
          <div className="rounded-xl bg-white p-4">
            <dt className="text-sm text-muted">A system pays for itself if it costs less than</dt>
            <dd className="mt-1 text-2xl font-bold text-navy">
              {money(result.breakEvenPerEmployee, inputs.currency)}
              <span className="text-base font-medium text-muted"> per employee a month</span>
            </dd>
          </div>
        </dl>
      )}
      <p className="mt-3 text-xs text-muted">
        Break-even uses the cautious end of the range. We don&apos;t quote PeoplesHR prices here; packages are scoped to
        your team size.
      </p>
    </section>
  );
}

export function WhereItGoes({ result }: { result: Result }) {
  const top = topLines(result);
  if (top.length === 0) return null;

  return (
    <section aria-labelledby="where-title">
      <h2 id="where-title" className="text-2xl font-bold">
        Your three biggest lines, and what changes them
      </h2>
      <ol className="mt-5 grid gap-4 md:grid-cols-3">
        {top.map((line, i) => (
          <li key={line.task.id} className="flex flex-col rounded-[var(--radius-card)] border border-line bg-white p-5">
            <span className="num text-sm font-semibold text-muted">
              {i + 1} · {hours(line.hours)} a month
            </span>
            <h3 className="mt-2 font-bold">{line.task.label}</h3>
            <p className="mt-2 flex-1 text-sm">{line.task.fix}</p>
            <p className="mt-4 text-xs font-semibold text-blue">PeoplesHR {line.task.module}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function TheMaths({ inputs }: { inputs: Inputs }) {
  return (
    <details className="group rounded-[var(--radius-card)] border border-line bg-white">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold text-navy [&::-webkit-details-marker]:hidden">
        <span>
          Show the maths
          <span className="block text-sm font-normal text-muted">Sceptical about the numbers? Good. Here is every assumption.</span>
        </span>
        <span aria-hidden="true" className="text-xl transition-transform group-open:rotate-45">+</span>
      </summary>
      <div className="border-t border-line p-5 text-sm">
        <ul className="space-y-1.5">
          <li><strong className="text-navy">Cost per year</strong> = hours a month × 12 × your hourly cost ({money(inputs.hourlyCost, inputs.currency)}).</li>
          <li><strong className="text-navy">People full-time</strong> = hours a month ÷ {HOURS_PER_PERSON_MONTH} working hours.</li>
          <li><strong className="text-navy">Time back</strong> assumes a connected system removes {RECOVERY.low * 100}–{RECOVERY.high * 100}% of this work. Some of it, like approving payroll, should never go away.</li>
          <li><strong className="text-navy">Payroll fixes</strong> take about {HOURS_PER_PAYROLL_FIX} h each: find the cause, recalculate, pay the difference, explain it.</li>
        </ul>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[520px] text-left">
            <caption className="sr-only">How each estimate is worked out</caption>
            <thead className="text-xs text-muted">
              <tr>
                <th scope="col" className="py-2 pr-4 font-medium">Job</th>
                <th scope="col" className="py-2 pr-4 font-medium">How we estimate it</th>
                <th scope="col" className="py-2 text-right font-medium">For you</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {TASKS.map((t) => (
                <tr key={t.id}>
                  <th scope="row" className="py-2 pr-4 font-medium text-navy">{t.label}</th>
                  <td className="py-2 pr-4">{t.basis}</td>
                  <td className="num py-2 text-right">{hours(t.estimate(inputs))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-muted">
          Not counted: line managers&apos; and employees&apos; own time, late-filing penalties, and the cost of decisions
          made on out-of-date data. The real figure is probably higher.
        </p>
      </div>
    </details>
  );
}
