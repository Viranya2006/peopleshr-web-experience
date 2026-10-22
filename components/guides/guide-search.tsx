"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { JourneyStage } from "@/lib/guides/types";
import { track } from "@/lib/track";

export type GuideSummary = {
  slug: string;
  title: string;
  shortAnswer: string;
  stage: JourneyStage;
  readMinutes: number;
  searchText: string;
};

type Props = {
  guides: GuideSummary[];
  stages: Record<JourneyStage, { label: string; heading: string }>;
};

export function GuideSearch({ guides, stages }: Props) {
  const [query, setQuery] = useState("");
  const terms = query.toLowerCase().split(/\s+/).filter((t) => t.length > 1);

  const results = guides
    .map((g) => {
      const title = g.title.toLowerCase();
      const body = `${g.shortAnswer} ${g.searchText}`.toLowerCase();
      // Title matches count more than matches in the answer or FAQs.
      const score = terms.reduce((s, t) => s + (title.includes(t) ? 3 : 0) + (body.includes(t) ? 1 : 0), 0);
      return { g, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.g);

  useEffect(() => {
    if (terms.length === 0) return;
    const t = setTimeout(() => track("guide_search", { query, results: results.length }), 800);
    return () => clearTimeout(t);
  }, [query, results.length, terms.length]);

  const grouped = (Object.keys(stages) as JourneyStage[]).map((stage) => ({
    stage,
    items: guides.filter((g) => g.stage === stage),
  }));

  return (
    <div>
      <form role="search" onSubmit={(e) => e.preventDefault()} className="max-w-xl">
        <label htmlFor="guide-q" className="field-label">
          What do you want to know?
        </label>
        <input
          id="guide-q"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. EPF, overtime, payroll cut-off"
          className="field-input py-3 text-base"
          autoComplete="off"
        />
      </form>
      <p aria-live="polite" className="mt-2 min-h-5 text-sm text-muted">
        {terms.length > 0 && `${results.length} ${results.length === 1 ? "guide matches" : "guides match"} “${query.trim()}”`}
      </p>

      {terms.length > 0 ? (
        results.length > 0 ? (
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {results.map((g) => (
              <GuideItem key={g.slug} guide={g} stageLabel={stages[g.stage].label} />
            ))}
          </ul>
        ) : (
          <div className="mt-4 rounded-xl bg-surface p-5">
            <p className="font-semibold text-navy">No guide answers that yet.</p>
            <p className="mt-1 text-sm">
              Try a broader word, or{" "}
              <Link href="/request-demo?from=guide-search" className="font-semibold text-blue hover:underline">
                ask a PeoplesHR consultant
              </Link>
              . Questions we can&apos;t answer here help us decide what to write next.
            </p>
          </div>
        )
      ) : (
        <div className="mt-6 space-y-12">
          {grouped.map(({ stage, items }, i) => (
            <section key={stage} aria-labelledby={`stage-${stage}`}>
              <h2 id={`stage-${stage}`} className="flex items-baseline gap-3 text-2xl font-bold">
                <span className="num text-sm font-bold text-blue">{i + 1}</span>
                {stages[stage].heading}
              </h2>
              <ul className="mt-4 divide-y divide-line border-y border-line">
                {items.map((g) => (
                  <GuideItem key={g.slug} guide={g} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

function GuideItem({ guide, stageLabel }: { guide: GuideSummary; stageLabel?: string }) {
  return (
    <li>
      <Link href={`/guides/${guide.slug}`} className="group block py-5">
        <span className="block text-lg font-bold text-navy group-hover:text-blue">{guide.title}</span>
        <span className="mt-1 line-clamp-2 block text-[15px]">{guide.shortAnswer}</span>
        <span className="mt-2 block text-xs text-muted">
          {stageLabel && <>{stageLabel} · </>}
          {guide.readMinutes} min read
        </span>
      </Link>
    </li>
  );
}
