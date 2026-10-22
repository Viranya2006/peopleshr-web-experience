import type { Guide } from "../types";

export const guide: Guide = {
  slug: "hr-software-implementation-timeline",
  title: "How long does it take to implement HR and payroll software?",
  description:
    "A typical HR and payroll implementation takes 8 to 16 weeks for 100–1,000 employees. The phases, what slows projects down, how to prepare, and why parallel runs matter.",
  stage: "decide",
  shortAnswer:
    "For a company with 100 to 1,000 employees, an HR and payroll implementation typically takes 8 to 16 weeks: about 2 weeks to plan, 3 to 6 to configure and move data, 2 to 4 for testing with at least one parallel payroll run, then go-live and support. Clean employee data and one decision-maker keep it on schedule.",
  updated: "2026-10-12",
  readMinutes: 5,
  sections: [
    {
      id: "phases",
      heading: "The phases of an implementation",
      blocks: [
        {
          type: "table",
          caption: "Typical implementation phases for 100–1,000 employees",
          head: ["Phase", "Typical length", "What happens", "Your team's part"],
          rows: [
            ["Plan", "1–2 weeks", "Scope, timeline, pay rules and approval flows agreed", "HR lead, payroll, finance"],
            ["Configure and migrate", "3–6 weeks", "Company structure, pay elements and rules set up; employee data loaded", "Data clean-up and sign-off"],
            ["Test", "2–4 weeks", "Scenario tests and at least one parallel payroll run", "Compare every payslip"],
            ["Go live", "1 week", "First live payroll; employees get mobile access", "Communication to staff"],
            ["Support", "4 weeks", "Close support through the first full cycles", "Report issues quickly"],
          ],
        },
        { type: "p", text: "Multi-country rollouts usually go country by country, starting with the simplest payroll." },
      ],
    },
    {
      id: "delays",
      heading: "What slows implementations down?",
      blocks: [
        {
          type: "ul",
          items: [
            "**Messy employee data.** Missing IDs, joining dates or bank details discovered during migration.",
            "**Pay rules nobody wrote down.** Allowances and overtime rules that exist only in someone's spreadsheet formulas.",
            "**Decisions by committee.** Without one person who can say yes, every configuration question waits a week.",
            "**Going live at year end.** Year-end returns and a new system in the same month is avoidable risk.",
          ],
        },
      ],
    },
    {
      id: "prepare",
      heading: "How to prepare before you sign",
      blocks: [
        {
          type: "ol",
          items: [
            "Export your current employee list and check it for gaps.",
            "List every pay element, allowance and deduction, and how each is calculated.",
            "Write down approval flows for leave, overtime and payroll.",
            "Name one project owner with authority to decide.",
            "Pick a go-live month away from year end and peak season.",
          ],
        },
      ],
    },
    {
      id: "parallel-run",
      heading: "What is a parallel payroll run?",
      blocks: [
        {
          type: "p",
          text: "You run the same month's payroll in both the old and the new system and compare every payslip. Differences show where a rule was set up wrong, before anyone is paid incorrectly. One clean parallel run is the minimum; two is safer if your pay rules are complex.",
        },
      ],
    },
    {
      id: "first-month",
      heading: "What to expect in the first month after go-live",
      blocks: [
        {
          type: "p",
          text: "Expect more employee questions in the first weeks as people find the app, then fewer than before. HR's month-end workload usually drops from the second cycle, once attendance and leave approvals happen on time.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "How long does payroll software implementation take?",
      a: "Typically 8 to 16 weeks for 100 to 1,000 employees in one country. Smaller companies with simple pay can be faster; multi-country rollouts take longer and usually go country by country.",
    },
    {
      q: "Do we need to run payroll in two systems?",
      a: "For at least one cycle, yes. A parallel run compares every payslip from the old and new systems and is the safest way to catch set-up mistakes.",
    },
    {
      q: "What's the biggest cause of delay?",
      a: "Employee data that needs cleaning during migration. Checking your data before the project starts saves the most time.",
    },
  ],
  related: ["choosing-hr-payroll-software", "spreadsheets-vs-hr-software", "month-end-payroll-checklist"],
};
