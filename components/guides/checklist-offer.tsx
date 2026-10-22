import { LeadForm } from "@/components/lead-form";

export function ChecklistOffer() {
  return (
    <aside aria-labelledby="checklist-offer" className="grid gap-6 rounded-[var(--radius-card)] border border-line bg-white p-6 sm:grid-cols-[150px_minmax(0,1fr)] sm:p-7">
      {/* A sketch of the printable page, so the reader can see what they're signing up for. */}
      <div aria-hidden="true" className="hidden h-[190px] rotate-[-2deg] rounded-md border border-line bg-paper p-3 shadow-sm sm:block">
        <div className="h-2 w-16 rounded bg-navy" />
        <div className="mt-1 h-1.5 w-24 rounded bg-line-strong" />
        <ul className="mt-3 space-y-[7px]">
          {Array.from({ length: 12 }, (_, i) => (
            <li key={i} className="flex items-center gap-1.5">
              <span className="size-2 rounded-[2px] border border-navy/60" />
              <span className="h-1 rounded bg-line-strong" style={{ width: `${50 + ((i * 37) % 45)}%` }} />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="eyebrow">Free download</p>
        <h2 id="checklist-offer" className="mt-2 text-xl font-bold">
          The month-end payroll checklist, ready to print
        </h2>
        <p className="mt-2 text-[15px]">
          All 12 steps on one page, with a sign-off box for the second approver and a column for this month&apos;s
          notes. Pin it up for the next payroll run.
        </p>
        <div className="mt-5">
          <LeadForm
            source="guides"
            intent="checklist"
            context={{ asset: "month-end-payroll-checklist" }}
            submitLabel="Email me the checklist"
            successTitle="Check your inbox."
            successBody="The checklist is on its way as a PDF. Print it before your next payroll cut-off."
            compact
          />
        </div>
      </div>
    </aside>
  );
}
