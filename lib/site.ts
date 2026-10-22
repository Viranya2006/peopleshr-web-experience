export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const SITE_NAME = "PeoplesHR";

// Figures quoted on peopleshr.com (October 2026).
export const PROOF = {
  companies: "1,700+",
  countries: "40+",
  users: "1.5M+",
  years: "29",
} as const;

export const TOOLS = [
  {
    challenge: "01",
    href: "/admin-cost",
    name: "Admin cost check",
    problem: "Visitors can't put a number on inefficient HR admin.",
    pitch:
      "Tick the admin jobs your team does and see, line by line, what they cost in hours, money and people.",
  },
  {
    challenge: "03",
    href: "/health-check",
    name: "HR operations health check",
    problem: "Visitors don't know which HR process to fix first.",
    pitch:
      "12 questions about how work actually gets done. You get your three priorities and a first step for each.",
  },
  {
    challenge: "05",
    href: "/guides",
    name: "Payroll & HR operations guides",
    problem: "Readers of a guide can't see where to go next or how PeoplesHR helps.",
    pitch:
      "Answer-first guides that move a reader from their question to a tool, a deeper guide or a conversation.",
  },
] as const;
