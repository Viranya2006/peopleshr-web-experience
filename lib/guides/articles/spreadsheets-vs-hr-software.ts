import type { Guide } from "../types";

export const guide: Guide = {
  slug: "spreadsheets-vs-hr-software",
  title: "Spreadsheets vs HR software: when is it time to switch?",
  description:
    "Five signs your HR spreadsheets have stopped working, a side-by-side comparison with HR software, what switching really costs, and how to switch without disrupting payroll.",
  stage: "compare",
  shortAnswer:
    "Spreadsheets work for HR while one person can hold every record in their head. Switch when the same data is typed into more than one file, payroll needs corrections most months, or employees keep asking HR for leave balances and payslips. That often happens between 50 and 150 employees, and earlier if you run shifts.",
  updated: "2026-10-12",
  readMinutes: 6,
  sections: [
    {
      id: "what-works",
      heading: "What spreadsheets do well",
      blocks: [
        {
          type: "p",
          text: "They're free, flexible and everyone knows how to use them. For a small team with simple pay, a well-kept spreadsheet is a perfectly reasonable HR system. The problems start when several people and several files are involved.",
        },
      ],
    },
    {
      id: "signs",
      heading: "Five signs you've outgrown spreadsheets",
      blocks: [
        {
          type: "ol",
          items: [
            "The same change, such as a new bank account, has to be typed into more than one file.",
            "Payroll needs correcting after payday most months.",
            "Only one person really understands the payroll workbook, and their leave is a risk.",
            "Employees ask HR for leave balances, payslips or letters several times a day.",
            "Leadership asks for a headcount or cost report and it takes days to produce.",
          ],
        },
        {
          type: "p",
          text: "Two or more of these usually means the spreadsheet is costing more than it saves. The [HR operations health check](/health-check) shows which area to fix first.",
        },
      ],
    },
    {
      id: "comparison",
      heading: "Spreadsheets and HR software compared",
      blocks: [
        {
          type: "table",
          caption: "Spreadsheets compared with HR and payroll software",
          head: ["", "Spreadsheets", "HR and payroll software"],
          rows: [
            ["Employee data", "Copied between files", "One record used everywhere"],
            ["Leave balances", "Updated by HR by hand", "Update automatically; employees see them live"],
            ["Attendance to payroll", "Exported, cleaned and pasted", "Flows in with shift and overtime rules applied"],
            ["Access control", "Whoever has the file", "Role-based permissions"],
            ["Audit trail", "Rarely kept", "Every change logged with who and when"],
            ["Reports", "Built by hand each time", "Live dashboards"],
            ["Up-front cost", "None", "Subscription plus implementation"],
          ],
        },
      ],
    },
    {
      id: "cost",
      heading: "What switching actually costs",
      blocks: [
        {
          type: "p",
          text: "The subscription is the visible cost. Plan for three others too: cleaning up employee data before it's moved, your team's time during setup and testing, and one or two parallel payroll runs. Set that against what the manual work costs today; the [admin cost check](/admin-cost) itemises it.",
        },
      ],
    },
    {
      id: "how-to-switch",
      heading: "How to switch without disrupting payroll",
      blocks: [
        {
          type: "ol",
          items: [
            "Clean the employee master data first. Missing IDs, dates and bank details are the main cause of delay.",
            "Go live at the start of a pay period, ideally not at year end.",
            "Run at least one payroll in both the old and new systems and compare every payslip.",
            "Switch attendance and leave at the same time as payroll, so inputs and calculations come from one place.",
          ],
        },
        {
          type: "p",
          text: "See [how long an HR software implementation takes](/guides/hr-software-implementation-timeline) for a phase-by-phase plan.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "At what company size should you move from spreadsheets to HR software?",
      a: "There's no fixed number, but the strain usually shows between 50 and 150 employees, and earlier for shift-based businesses where attendance feeds payroll.",
    },
    {
      q: "Is HR software secure enough for payroll data?",
      a: "Usually more secure than shared spreadsheets, because access is role-based and every change is logged. Ask vendors about certifications such as ISO 27001 and where your data is hosted.",
    },
    {
      q: "Can we keep using Excel alongside HR software?",
      a: "For analysis, yes. Most HR systems export to Excel. The goal is to stop using spreadsheets as the source of truth for employee data and payroll.",
    },
  ],
  related: ["choosing-hr-payroll-software", "hr-software-implementation-timeline", "how-to-reduce-payroll-errors"],
};
