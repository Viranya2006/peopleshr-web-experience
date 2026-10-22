import type { Metadata } from "next";
import Link from "next/link";
import { AdminCostTool } from "@/components/admin-cost/admin-cost-tool";
import { Faq } from "@/components/faq";
import { JsonLd, breadcrumbLd, faqLd, webAppLd } from "@/lib/seo";

const TITLE = "What is HR admin costing you? Admin cost check";
const DESCRIPTION =
  "Itemise the hours your team spends on payroll checks, attendance, leave and HR queries, and see the yearly cost, with every assumption shown.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/admin-cost" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/admin-cost" },
};

const FAQS = [
  {
    q: "How do you calculate the cost of HR admin?",
    a: "Each admin job gets an hours-per-month estimate based on your headcount, for example about 2 minutes per employee per week to reconcile attendance. Hours are multiplied by 12 and by the loaded hourly cost of an HR officer. You can replace any estimate with your own figure.",
  },
  {
    q: "How much HR admin time can software actually save?",
    a: "We assume a connected HR and payroll system removes 40–70% of the jobs in this check. Some work, like reviewing and approving payroll, should stay with a person, so we never assume 100%.",
  },
  {
    q: "What isn't included in the estimate?",
    a: "Line managers' and employees' own time, penalties for late statutory filings, and the cost of decisions made on out-of-date data. That makes the result a conservative figure.",
  },
  {
    q: "Is anything I enter stored?",
    a: "No. The calculation runs in your browser. Your figures are only kept in the page link, so you can share it. Nothing is sent unless you ask us to email the breakdown.",
  },
];

export default function AdminCostPage() {
  return (
    <>
      <div className="border-b border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-8 sm:px-6 sm:pt-12">
          <nav aria-label="Breadcrumb" className="text-sm text-muted">
            <Link href="/" className="hover:text-navy">Tools</Link> <span aria-hidden="true">/</span> Admin cost check
          </nav>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            What is HR admin costing you?
          </h1>
          <p className="mt-4 max-w-2xl text-lg">
            Most HR teams know payroll week hurts. Few can say what it costs. Tick the jobs your team does, change our
            hours where they look wrong, and get an itemised bill you can take to finance.
          </p>
          <p className="mt-3 text-sm text-muted">About two minutes. No sign-up to see the result.</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <AdminCostTool />
      </div>

      <div className="no-print mx-auto max-w-3xl px-4 sm:px-6">
        <Faq title="Questions about the numbers" faqs={FAQS} />
        <p className="mt-8 text-sm">
          Not sure admin is the real problem?{" "}
          <Link href="/health-check" className="font-semibold text-blue hover:underline">
            Take the HR operations health check
          </Link>{" "}
          to see which process to fix first.
        </p>
      </div>

      <JsonLd
        data={[
          webAppLd({ name: "PeoplesHR admin cost check", path: "/admin-cost", description: DESCRIPTION }),
          faqLd(FAQS),
          breadcrumbLd([
            { name: "Tools", path: "/" },
            { name: "Admin cost check", path: "/admin-cost" },
          ]),
        ]}
      />
    </>
  );
}
