import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Faq } from "@/components/faq";
import { ChecklistOffer } from "@/components/guides/checklist-offer";
import { Blocks } from "@/components/guides/rich-text";
import { StageCta } from "@/components/guides/stage-cta";
import { GUIDES, STAGE_INFO, getGuide, nextGuide, relatedGuides } from "@/lib/guides";
import type { Guide } from "@/lib/guides/types";
import { JsonLd, absoluteUrl, breadcrumbLd, faqLd } from "@/lib/seo";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const guide = getGuide((await params).slug);
  if (!guide) return {};
  const path = `/guides/${guide.slug}`;
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: path },
    openGraph: { type: "article", title: guide.title, description: guide.description, url: path, modifiedTime: guide.updated },
  };
}

export default async function GuidePage({ params }: PageProps<"/guides/[slug]">) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();

  const next = nextGuide(guide.slug);
  const related = relatedGuides(guide).filter((g) => g.slug !== next?.slug);
  const updated = new Date(guide.updated).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <article className="mx-auto max-w-6xl px-4 sm:px-6">
      <header className="max-w-3xl pb-8 pt-8 sm:pt-12">
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
          <ol className="flex flex-wrap gap-1.5">
            <li><Link href="/guides" className="hover:text-navy">Guides</Link></li>
            <li aria-hidden="true">/</li>
            <li>{STAGE_INFO[guide.stage].heading}</li>
          </ol>
        </nav>
        <h1 className="mt-4 text-[34px] font-extrabold leading-tight tracking-tight sm:text-[44px]">{guide.title}</h1>
        <p className="mt-4 text-sm text-muted">
          Reviewed by the PeoplesHR payroll team · Updated <time dateTime={guide.updated}>{updated}</time> · {guide.readMinutes} min read
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-14">
        <div className="max-w-3xl">
          <section aria-labelledby="short-answer" className="rounded-[var(--radius-card)] border border-line bg-surface p-5 sm:p-6">
            <h2 id="short-answer" className="text-sm font-bold uppercase tracking-[0.12em] text-blue">
              Short answer
            </h2>
            <p className="mt-2 text-lg leading-relaxed text-navy">{guide.shortAnswer}</p>
          </section>

          <nav aria-label="On this page" className="mt-8 lg:hidden">
            <Contents guide={guide} />
          </nav>

          <div className="mt-10 space-y-12">
            {guide.sections.map((section) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-h`} className="scroll-mt-24">
                <h2 id={`${section.id}-h`} className="text-2xl font-bold sm:text-[28px]">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4 text-[17px] leading-relaxed">
                  <Blocks blocks={section.blocks} guide={guide} />
                </div>
              </section>
            ))}
          </div>

          {guide.slug === "month-end-payroll-checklist" ? (
            <div className="mt-12">
              <ChecklistOffer />
            </div>
          ) : (
            <div className="mt-12">
              <StageCta guide={guide} />
            </div>
          )}

          <Faq title="Frequently asked questions" faqs={guide.faqs} />

          {next && (
            <Link
              href={`/guides/${next.slug}`}
              className="group mt-12 block rounded-[var(--radius-card)] border border-line p-6 hover:border-blue"
            >
              <span className="text-sm font-semibold text-muted">The question you&apos;ll probably have next</span>
              <span className="mt-1 block text-xl font-bold text-navy group-hover:text-blue">{next.title} →</span>
            </Link>
          )}
        </div>

        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          <nav aria-label="On this page (sidebar)" className="hidden lg:block">
            <Contents guide={guide} />
          </nav>
          {related.length > 0 && (
            <nav aria-label="Related guides">
              <h2 className="text-sm font-bold text-navy">Related guides</h2>
              <ul className="mt-3 space-y-3 text-[15px]">
                {related.map((g) => (
                  <li key={g.slug}>
                    <Link href={`/guides/${g.slug}`} className="text-blue hover:underline">
                      {g.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </aside>
      </div>

      <JsonLd data={guideLd(guide)} />
    </article>
  );
}

function Contents({ guide }: { guide: Guide }) {
  return (
    <>
      <h2 className="text-sm font-bold text-navy">On this page</h2>
      <ol className="mt-3 space-y-2 border-l border-line text-[15px]">
        {guide.sections.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`} className="-ml-px block border-l-2 border-transparent pl-3 text-muted hover:border-blue hover:text-navy">
              {s.heading}
            </a>
          </li>
        ))}
      </ol>
    </>
  );
}

function guideLd(guide: Guide) {
  const url = absoluteUrl(`/guides/${guide.slug}`);
  const data: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.title,
      description: guide.description,
      abstract: guide.shortAnswer,
      dateModified: guide.updated,
      url,
      mainEntityOfPage: url,
      author: { "@type": "Organization", name: "PeoplesHR", url: "https://www.peopleshr.com" },
      publisher: { "@id": "https://www.peopleshr.com/#organization" },
    },
    faqLd(guide.faqs),
    breadcrumbLd([
      { name: "Guides", path: "/guides" },
      { name: guide.title, path: `/guides/${guide.slug}` },
    ]),
  ];
  if (guide.steps) {
    data.push({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: guide.title,
      description: guide.shortAnswer,
      step: guide.steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.name, text: s.text, url: `${url}#step-${i + 1}` })),
    });
  }
  return data;
}
