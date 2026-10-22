import type { Metadata } from "next";
import Link from "next/link";
import { Faq } from "@/components/faq";
import { HealthCheck } from "@/components/health-check/health-check";
import { AREAS } from "@/lib/health-check/questions";
import { JsonLd, breadcrumbLd, faqLd, webAppLd } from "@/lib/seo";

const TITLE = "HR operations health check: which HR process to fix first";
const DESCRIPTION =
  "Answer 12 questions about how payroll, attendance, leave, records and reviews really work in your business. Get your three priorities and a first step for each.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/health-check" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/health-check" },
};

const FAQS = [
  {
    q: "Which HR process should a business digitise first?",
    a: "Usually the one that feeds payroll. If attendance or employee records are maintained by hand, every payroll run inherits their errors. This check ranks your gaps by size and by how much they matter in your industry, so the answer fits your business.",
  },
  {
    q: "How is the score worked out?",
    a: "Each answer is scored 0 to 3, from manual to fully connected. Each area's score is the average of its two questions on a 0–100 scale. Priorities weigh the gap by impact: payroll counts most, and attendance counts more for shift-based industries.",
  },
  {
    q: "Do I need new software to act on the results?",
    a: "Not to start. Every priority comes with a first step you can take this month without buying anything. Software makes those steps stick once the process is clear.",
  },
];

export default function HealthCheckPage() {
  return (
    <>
      <div className="border-b border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-8 sm:px-6 sm:pt-12">
          <nav aria-label="Breadcrumb" className="text-sm text-muted">
            <Link href="/" className="hover:text-navy">Tools</Link> <span aria-hidden="true">/</span> HR operations health check
          </nav>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            Know HR needs fixing, but not where to start?
          </h1>
          <p className="mt-4 max-w-2xl text-lg">
            Twelve questions about what actually happens in your business today. No rating scales: just pick the
            description that sounds like you. You get your three priorities and one thing to do about each.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2 text-sm" aria-label="Areas covered">
            {AREAS.map((a) => (
              <li key={a.id} className="rounded-full border border-line-strong bg-white px-3 py-1 text-navy">
                {a.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <HealthCheck />
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Faq title="About the health check" faqs={FAQS} />
        <p className="mt-8 text-sm">
          Already know payroll is the problem?{" "}
          <Link href="/guides/how-to-reduce-payroll-errors" className="font-semibold text-blue hover:underline">
            Read how to reduce payroll errors
          </Link>
          .
        </p>
      </div>

      <JsonLd
        data={[
          webAppLd({ name: "PeoplesHR HR operations health check", path: "/health-check", description: DESCRIPTION }),
          faqLd(FAQS),
          breadcrumbLd([
            { name: "Tools", path: "/" },
            { name: "HR operations health check", path: "/health-check" },
          ]),
        ]}
      />
    </>
  );
}
