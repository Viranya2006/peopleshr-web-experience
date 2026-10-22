import type { Metadata } from "next";
import Link from "next/link";
import { ChecklistOffer } from "@/components/guides/checklist-offer";
import { GuideSearch } from "@/components/guides/guide-search";
import { GUIDES, STAGE_INFO } from "@/lib/guides";
import { JsonLd, absoluteUrl, breadcrumbLd } from "@/lib/seo";

const TITLE = "Payroll and HR operations guides";
const DESCRIPTION =
  "Straight answers to payroll and HR operations questions: reducing payroll errors, month-end checklists, EPF and ETF, choosing HR software and implementation timelines.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/guides" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/guides" },
};

export default function GuidesPage() {
  const summaries = GUIDES.map((g) => ({
    slug: g.slug,
    title: g.title,
    shortAnswer: g.shortAnswer,
    stage: g.stage,
    readMinutes: g.readMinutes,
    searchText: [...g.sections.map((s) => s.heading), ...g.faqs.flatMap((f) => [f.q, f.a])].join(" "),
  }));

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <header className="max-w-3xl pb-10 pt-10 sm:pt-14">
        <p className="eyebrow">Guides</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">Payroll and HR operations, answered</h1>
        <p className="mt-4 text-lg">
          Every guide starts with the short answer, then the detail. They&apos;re ordered the way the questions usually
          come: first the problem, then the options, then the plan.
        </p>
      </header>

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14">
        <GuideSearch guides={summaries} stages={STAGE_INFO} />

        <aside className="space-y-6 lg:pt-[92px]">
          <div className="rounded-[var(--radius-card)] bg-surface p-5">
            <h2 className="font-bold">Prefer to work it out?</h2>
            <ul className="mt-3 space-y-3 text-[15px]">
              <li>
                <Link href="/admin-cost?from=guides-hub" className="font-semibold text-blue hover:underline">
                  Admin cost check
                </Link>
                <span className="block text-sm text-muted">What manual HR work costs you per year.</span>
              </li>
              <li>
                <Link href="/health-check?from=guides-hub" className="font-semibold text-blue hover:underline">
                  HR operations health check
                </Link>
                <span className="block text-sm text-muted">Which HR area to fix first.</span>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      <div className="mt-16 max-w-3xl">
        <ChecklistOffer />
      </div>

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: TITLE,
            description: DESCRIPTION,
            url: absoluteUrl("/guides"),
            mainEntity: {
              "@type": "ItemList",
              itemListElement: GUIDES.map((g, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: absoluteUrl(`/guides/${g.slug}`),
                name: g.title,
              })),
            },
          },
          breadcrumbLd([{ name: "Guides", path: "/guides" }]),
        ]}
      />
    </div>
  );
}
