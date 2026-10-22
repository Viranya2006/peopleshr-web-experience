import Link from "next/link";
import { PROOF } from "@/lib/site";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-navy text-blue-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo inverted />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-blue-100/80">
            HR, payroll, time and talent in one platform. Trusted by {PROOF.companies} organisations across{" "}
            {PROOF.countries} countries for {PROOF.years} years.
          </p>
          <p className="mt-4 text-xs text-blue-100/80">ISO 9001 · ISO 27001 · CSA STAR Level One</p>
        </div>

        <nav aria-label="Tools">
          <h2 className="text-sm font-semibold text-white">Tools</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/admin-cost" className="hover:text-white">Admin cost check</Link></li>
            <li><Link href="/health-check" className="hover:text-white">HR operations health check</Link></li>
            <li><Link href="/guides" className="hover:text-white">Payroll & HR guides</Link></li>
          </ul>
        </nav>

        <nav aria-label="PeoplesHR">
          <h2 className="text-sm font-semibold text-white">PeoplesHR</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="https://www.peopleshr.com/pricing/" className="hover:text-white">Packages</a></li>
            <li><a href="https://www.peopleshr.com/" className="hover:text-white">peopleshr.com</a></li>
            <li><Link href="/request-demo" className="hover:text-white">Request a Demo</Link></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-blue-100/80 sm:px-6">
          Prototype built for the PeoplesHR Web Experience Engineer assessment. Figures in the tools are estimates
          based on stated assumptions; sample content only.
        </p>
      </div>
    </footer>
  );
}
