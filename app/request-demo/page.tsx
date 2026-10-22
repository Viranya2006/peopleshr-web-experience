import type { Metadata } from "next";
import { LeadForm } from "@/components/lead-form";
import { PROOF } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a demo",
  description: "See PeoplesHR with your own pay rules and data. A 30-minute walkthrough with a consultant, no slides.",
  alternates: { canonical: "/request-demo" },
};

export default function RequestDemoPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1fr)_460px]">
      <div>
        <p className="eyebrow">Request a Demo</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">See your payroll in PeoplesHR</h1>
        <p className="mt-4 max-w-xl text-lg">
          Thirty minutes with a consultant who knows payroll in your country. Bring your questions and your messiest pay
          rule.
        </p>
        <h2 className="mt-10 text-lg font-bold">What happens next</h2>
        <ol className="mt-3 max-w-xl list-decimal space-y-2 pl-5">
          <li>A consultant emails you within one working day to find a time.</li>
          <li>They ask two or three questions about your headcount and pay rules, so the demo uses your situation.</li>
          <li>You see attendance, leave and payroll working together, and get an honest view of the timeline.</li>
        </ol>
        <p className="mt-10 text-sm text-muted">
          {PROOF.companies} organisations in {PROOF.countries} countries run HR and payroll on PeoplesHR.
        </p>
      </div>
      <div className="rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-sm sm:p-7">
        <LeadForm
          source="demo-page"
          intent="consultation"
          fields={["name", "company", "phone"]}
          submitLabel="Request a Demo"
          successTitle="Thanks. Your request is in."
          successBody="A consultant will email you within one working day to find a time."
          note="We only use your details to arrange the demo."
        />
      </div>
    </div>
  );
}
