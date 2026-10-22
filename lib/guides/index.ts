import { guide as choosing } from "./articles/choosing-hr-payroll-software";
import { guide as epfEtf } from "./articles/epf-etf-calculation-sri-lanka";
import { guide as implementation } from "./articles/hr-software-implementation-timeline";
import { guide as checklist } from "./articles/month-end-payroll-checklist";
import { guide as payrollErrors } from "./articles/how-to-reduce-payroll-errors";
import { guide as spreadsheets } from "./articles/spreadsheets-vs-hr-software";
import type { Guide, JourneyStage } from "./types";

// Order here is the reading order: understand the problem → compare options → decide.
export const GUIDES: Guide[] = [payrollErrors, checklist, epfEtf, spreadsheets, choosing, implementation];

export const STAGE_INFO: Record<JourneyStage, { label: string; heading: string }> = {
  understand: { label: "Understand", heading: "Understand the problem" },
  compare: { label: "Compare", heading: "Compare your options" },
  decide: { label: "Decide", heading: "Plan the change" },
};

export function getGuide(slug: string) {
  return GUIDES.find((g) => g.slug === slug);
}

// The question a reader is most likely to have next: the next guide in journey order.
export function nextGuide(slug: string) {
  const i = GUIDES.findIndex((g) => g.slug === slug);
  return i >= 0 && i < GUIDES.length - 1 ? GUIDES[i + 1] : undefined;
}

export function relatedGuides(guide: Guide) {
  return guide.related.map(getGuide).filter((g): g is Guide => Boolean(g));
}
