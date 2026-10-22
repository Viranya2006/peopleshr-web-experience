// Inline text may contain [link text](/path) and **bold**. Kept deliberately small so
// content stays plain data that a CMS could supply later.
export type Block =
  | { type: "p"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "table"; caption: string; head: string[]; rows: string[][] }
  | { type: "callout"; title: string; text: string }
  | { type: "steps" };

export type Section = { id: string; heading: string; blocks: Block[] };

// Where the reader is in their buying journey decides which next step we offer.
export type JourneyStage = "understand" | "compare" | "decide";

export type Guide = {
  slug: string;
  title: string;
  description: string;
  stage: JourneyStage;
  shortAnswer: string;
  updated: string;
  readMinutes: number;
  sections: Section[];
  faqs: { q: string; a: string }[];
  related: string[];
  steps?: { name: string; text: string }[];
  // Query string handed to the admin cost check when the reader follows the tool link.
  toolPreset?: string;
};
