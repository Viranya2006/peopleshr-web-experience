import Link from "next/link";
import { Logo } from "./logo";

const NAV = [
  { href: "/admin-cost", label: "Admin cost check" },
  { href: "/health-check", label: "Health check" },
  { href: "/guides", label: "Guides" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-md focus:bg-navy focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Link href="/" className="shrink-0" aria-label="PeoplesHR tools home">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden flex-1 md:block">
          <ul className="flex items-center gap-1 text-sm font-medium text-navy">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="rounded-md px-3 py-2 hover:bg-surface-2">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a href="https://www.peopleshr.com/pricing/" className="rounded-md px-3 py-2 hover:bg-surface-2">
                Packages
              </a>
            </li>
          </ul>
        </nav>

        <Link href="/request-demo" className="btn btn-primary ml-auto hidden sm:inline-flex">
          Request a Demo
        </Link>

        {/* <details> gives a working mobile menu without any client JavaScript. */}
        <details className="group relative ml-auto md:hidden sm:ml-0">
          <summary className="flex h-10 cursor-pointer list-none items-center gap-2 rounded-md px-3 text-sm font-semibold text-navy hover:bg-surface-2 [&::-webkit-details-marker]:hidden">
            Menu
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" className="transition-transform group-open:rotate-180">
              <path d="M2 5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </summary>
          <nav aria-label="Main (mobile)" className="absolute right-0 top-12 w-64 rounded-xl border border-line bg-white p-2 shadow-lg">
            <ul className="text-[15px] font-medium text-navy">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="block rounded-md px-3 py-2.5 hover:bg-surface-2">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="mt-1 border-t border-line pt-1">
                <Link href="/request-demo" className="block rounded-md px-3 py-2.5 text-blue hover:bg-surface-2">
                  Request a Demo
                </Link>
              </li>
            </ul>
          </nav>
        </details>
      </div>
    </header>
  );
}
