import Link from "next/link";
import type { Guide } from "@/lib/guides/types";

// The next step matches where the reader is: someone learning about payroll errors isn't
// ready for a demo, but might want to know what the errors cost them.
export function StageCta({ guide }: { guide: Guide }) {
  if (guide.stage === "understand") {
    const href = `/admin-cost?${new URLSearchParams(`${guide.toolPreset ?? ""}&from=${guide.slug}`)}`;
    return (
      <Cta
        eyebrow="Put a number on it"
        title="What is this costing your team?"
        body="The admin cost check itemises the hours spent on payroll checks, attendance, leave and corrections, and what they cost per year. About two minutes, no sign-up."
        href={href}
        label="Run the admin cost check"
      />
    );
  }
  if (guide.stage === "compare") {
    return (
      <Cta
        eyebrow="Before you compare vendors"
        title="Find out which HR area to fix first"
        body="Twelve questions about how your HR actually runs. You get three priorities ranked for your industry and size, and the package that fits."
        href={`/health-check?from=${guide.slug}`}
        label="Take the health check"
      />
    );
  }
  return (
    <Cta
      eyebrow="Ready to plan it"
      title="See your own payroll in PeoplesHR"
      body="A consultant walks through your pay rules and data and gives you a realistic implementation timeline for your company, not a generic one."
      href={`/request-demo?from=${guide.slug}`}
      label="Request a Demo"
      dark
    />
  );
}

function Cta({ eyebrow, title, body, href, label, dark = false }: { eyebrow: string; title: string; body: string; href: string; label: string; dark?: boolean }) {
  return (
    <aside className={`rounded-[var(--radius-card)] p-6 sm:p-7 ${dark ? "bg-navy text-blue-100" : "border border-blue/25 bg-blue-50"}`}>
      <p className={`text-xs font-bold uppercase tracking-[0.12em] ${dark ? "text-blue-100/80" : "text-blue"}`}>{eyebrow}</p>
      <p className={`mt-2 text-xl font-bold ${dark ? "text-white" : "text-navy"}`}>{title}</p>
      <p className="mt-2 text-[15px]">{body}</p>
      <Link href={href} className={`btn mt-5 ${dark ? "bg-white text-navy hover:bg-blue-50" : "btn-primary"}`}>
        {label}
      </Link>
    </aside>
  );
}
