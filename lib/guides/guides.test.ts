import { describe, expect, it } from "vitest";
import { GUIDES, getGuide, nextGuide } from "./index";

const words = (s: string) => s.trim().split(/\s+/).length;
const TOOL_ROUTES = ["/admin-cost", "/health-check", "/request-demo", "/guides"];

function inlineText(guide: (typeof GUIDES)[number]) {
  return guide.sections.flatMap((s) =>
    s.blocks.flatMap((b) => {
      if (b.type === "p" || b.type === "callout") return [b.text];
      if (b.type === "ul" || b.type === "ol") return b.items;
      return [];
    }),
  );
}

describe.each(GUIDES.map((g) => [g.slug, g] as const))("%s", (_slug, guide) => {
  it("has a short answer an AI assistant can quote whole", () => {
    expect(words(guide.shortAnswer)).toBeGreaterThanOrEqual(40);
    expect(words(guide.shortAnswer)).toBeLessThanOrEqual(75);
  });

  it("has a meta description that fits in a search result", () => {
    expect(guide.description.length).toBeLessThanOrEqual(220);
    expect(guide.description.length).toBeGreaterThan(70);
  });

  it("only links to guides and pages that exist", () => {
    for (const slug of guide.related) expect(getGuide(slug), slug).toBeDefined();
    const links = inlineText(guide).flatMap((t) => [...t.matchAll(/\]\((\/[^)]*)\)/g)].map((m) => m[1].split("?")[0]));
    for (const href of links) {
      const ok = TOOL_ROUTES.includes(href) || (href.startsWith("/guides/") && getGuide(href.slice(8)));
      expect(ok, href).toBeTruthy();
    }
  });

  it("has unique section anchors and at least two FAQs", () => {
    const ids = guide.sections.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(guide.faqs.length).toBeGreaterThanOrEqual(2);
  });

  it("only uses a steps block when it has steps", () => {
    const usesSteps = guide.sections.some((s) => s.blocks.some((b) => b.type === "steps"));
    expect(usesSteps).toBe(Boolean(guide.steps?.length));
  });
});

describe("journey", () => {
  it("has unique slugs", () => {
    expect(new Set(GUIDES.map((g) => g.slug)).size).toBe(GUIDES.length);
  });

  it("orders guides understand → compare → decide", () => {
    const order = { understand: 0, compare: 1, decide: 2 };
    const stages = GUIDES.map((g) => order[g.stage]);
    expect(stages).toEqual([...stages].sort());
  });

  it("points each guide to the next one, and the last to none", () => {
    expect(nextGuide(GUIDES[0].slug)).toBe(GUIDES[1]);
    expect(nextGuide(GUIDES[GUIDES.length - 1].slug)).toBeUndefined();
  });
});
