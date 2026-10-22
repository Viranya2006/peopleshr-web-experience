// Funnel events go to window.dataLayer, which is what GTM or GA4 would read on the real site.
export type TrackEvent =
  | "tool_start"
  | "step_complete"
  | "result_view"
  | "cta_click"
  | "lead_submit"
  | "share_link"
  | "guide_search";

type Props = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: TrackEvent, props: Props = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...props });
  if (process.env.NODE_ENV === "development") {
    console.debug("[track]", event, props);
  }
}
