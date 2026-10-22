import type { Guide } from "../types";

export const guide: Guide = {
  slug: "choosing-hr-payroll-software",
  title: "How to choose HR and payroll software: 15 questions to ask vendors",
  description:
    "Start from payroll and compliance, not the feature list. Fifteen questions to ask every HR software vendor, grouped by payroll, time and leave, data and security, and implementation, plus a scorecard.",
  stage: "compare",
  shortAnswer:
    "Start from your payroll and compliance needs, not the feature list. Check that the software handles your countries' statutory rules, connects attendance, leave and payroll without re-keying, gives employees mobile self-service, and has local implementation and support. Ask every vendor the same questions and score the answers side by side.",
  updated: "2026-10-12",
  readMinutes: 7,
  sections: [
    {
      id: "needs-first",
      heading: "Decide what you need before you see demos",
      blocks: [
        {
          type: "p",
          text: "Demos are built to impress, so write your must-haves down first. Base them on the problems you have today: the [HR operations health check](/health-check) gives you a ranked list in four minutes. Separate must-haves (statutory payroll for your countries, for example) from nice-to-haves (an engagement survey tool).",
        },
      ],
    },
    {
      id: "payroll",
      heading: "Questions about payroll and compliance",
      blocks: [
        {
          type: "ol",
          items: [
            "Which countries' statutory payroll do you support today, with live customers?",
            "Who updates tax tables and contribution rates when the law changes, and how fast?",
            "Can we run off-cycle payments and final settlements without a workaround?",
            "What checks run before payroll is approved?",
          ],
        },
      ],
    },
    {
      id: "time-leave",
      heading: "Questions about time, leave and self-service",
      blocks: [
        {
          type: "ol",
          items: [
            "Do attendance devices and mobile check-ins feed payroll directly, with our shift and overtime rules?",
            "Can managers approve leave and overtime on their phones before the payroll cut-off?",
            "What can employees do themselves: payslips, leave, letters, profile changes?",
            "Can employees ask questions in plain language and get an answer from their own data?",
          ],
        },
      ],
    },
    {
      id: "data",
      heading: "Questions about data, security and reporting",
      blocks: [
        {
          type: "ol",
          items: [
            "Which security certifications do you hold, such as ISO 27001?",
            "Where is our data hosted, and can we export all of it if we leave?",
            "Is every change to employee and pay data logged with who made it?",
            "Which reports come ready-made, and can we build our own without a consultant?",
          ],
        },
      ],
    },
    {
      id: "implementation",
      heading: "Questions about implementation and support",
      blocks: [
        {
          type: "ol",
          items: [
            "Who implements: your team, a partner, or us? How long does it typically take for a company our size?",
            "How many parallel payroll runs are included before go-live?",
            "Where is support based, and what hours does it cover in our time zone?",
          ],
        },
      ],
    },
    {
      id: "scorecard",
      heading: "How to compare vendors fairly",
      blocks: [
        { type: "p", text: "Score each vendor 1–5 on each area, multiply by the weight, and add up. Set the weights before the first demo, not after." },
        {
          type: "table",
          caption: "Example vendor scorecard weights",
          head: ["Area", "Example weight", "What a 5 looks like"],
          rows: [
            ["Payroll and compliance", "30%", "Live customers in all your countries; rule updates included"],
            ["Time, leave and self-service", "25%", "Inputs reach payroll with no re-keying"],
            ["Data and security", "20%", "Certified, full export, complete audit trail"],
            ["Implementation and support", "15%", "Local team, parallel runs, clear timeline"],
            ["Cost over three years", "10%", "Subscription, implementation and internal time all included"],
          ],
        },
        {
          type: "callout",
          title: "How PeoplesHR answers these",
          text: "PeoplesHR runs payroll for 1,700+ organisations in 40+ countries across APAC, the Middle East and Africa, is certified to ISO 9001, ISO 27001 and CSA STAR Level One, and has offices in Singapore, Sri Lanka, the Philippines, Indonesia, Kenya, Bangladesh and Dubai.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "What's the most important feature in HR and payroll software?",
      a: "Accurate statutory payroll for every country you operate in. Everything else depends on it, and it's the hardest thing to change later.",
    },
    {
      q: "How many vendors should we compare?",
      a: "Three is usually enough. Shortlist on must-haves first, then run scripted demos where each vendor shows the same scenarios with your data.",
    },
    {
      q: "Should HR and payroll be in the same system?",
      a: "It removes the most common source of payroll errors: the same change typed into two places. Separate systems can work, but only with a reliable integration.",
    },
  ],
  related: ["spreadsheets-vs-hr-software", "hr-software-implementation-timeline", "how-to-reduce-payroll-errors"],
};
