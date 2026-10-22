import type { Guide } from "../types";

export const guide: Guide = {
  slug: "how-to-reduce-payroll-errors",
  title: "How to reduce payroll errors: the causes and the checks that catch them",
  description:
    "Most payroll errors start before payroll runs. The six usual causes, the checks that catch them before payday, and how to measure accuracy month to month.",
  stage: "understand",
  shortAnswer:
    "Most payroll errors start before payroll runs: overtime approved after the cut-off, leave that was never recorded, and details typed into two places. Fix the inputs first. Keep one employee record, set an approval cut-off before each run, and compare every payslip with last month's before you approve.",
  updated: "2026-10-12",
  readMinutes: 6,
  toolPreset: "err=3",
  sections: [
    {
      id: "causes",
      heading: "What causes most payroll errors?",
      blocks: [
        {
          type: "p",
          text: "Calculation mistakes are rarer than people think. Most errors come from the information payroll receives. These six causes come up again and again in spreadsheet-based payroll:",
        },
        {
          type: "ol",
          items: [
            "**Late inputs.** Overtime, shift swaps or allowances approved after payroll has been run.",
            "**Leave that wasn't recorded.** Unpaid leave taken but never logged becomes an overpayment.",
            "**Wrong joiner and leaver dates.** Pro-rata pay is calculated from the wrong day.",
            "**The same change typed twice.** A bank account or allowance updated in the HR file but not in payroll.",
            "**Spreadsheet formula drift.** A copied row, a hard-coded rate, or a formula that no longer covers the whole column.",
            "**Statutory changes missed.** A new tax table or contribution ceiling applied a month late.",
          ],
        },
      ],
    },
    {
      id: "checks",
      heading: "Which checks catch errors before payday?",
      blocks: [
        { type: "p", text: "Run these after the draft payroll and before anyone approves it. Together they take about an hour for a few hundred employees." },
        {
          type: "ol",
          items: [
            "**Variance check.** Compare each employee's net pay with last month and explain anything that moved more than 10%.",
            "**Headcount check.** The number of people paid should equal active employees, plus leavers due a final settlement.",
            "**Totals check.** Gross pay, deductions and employer contributions against last month and against budget.",
            "**Statutory sample.** Recalculate tax and social security by hand for five employees across different pay bands.",
            "**Bank file check.** The count and total in the bank file match the payroll register exactly.",
            "**Second approval.** Someone who didn't prepare the payroll signs it off.",
          ],
        },
        {
          type: "callout",
          title: "The cheapest fix",
          text: "An approval cut-off two working days before the payroll run, with late changes moved to next month, removes the biggest single cause of corrections.",
        },
      ],
    },
    {
      id: "measure",
      heading: "How do you measure payroll accuracy?",
      blocks: [
        {
          type: "p",
          text: "Count every correction made after payday and record its cause. After three months you'll know which input to fix first. Track these three numbers:",
        },
        {
          type: "table",
          caption: "Payroll accuracy measures",
          head: ["Measure", "How to calculate it", "What you want to see"],
          rows: [
            ["Post-payday corrections", "Corrections ÷ payslips issued", "Falling month on month"],
            ["Late inputs", "Changes received after the cut-off", "Close to zero"],
            ["Off-cycle payments", "Payments made outside the normal run", "Rare, each with a known cause"],
          ],
        },
      ],
    },
    {
      id: "automate",
      heading: "When is it worth automating?",
      blocks: [
        {
          type: "p",
          text: "When the same cause appears month after month, a process fix has done what it can. That's usually when attendance, leave and payroll need to share data instead of passing spreadsheets. To see what those corrections cost you, run the [admin cost check](/admin-cost?err=3).",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "What is an acceptable payroll error rate?",
      a: "There's no official standard. A practical target is fewer than 1 in 100 payslips needing a correction after payday, with the rate falling over time. Track your own trend rather than comparing with other companies.",
    },
    {
      q: "Who is responsible for a payroll error?",
      a: "The employer is responsible for paying employees correctly and on time, even when payroll is outsourced. That's why the checks before approval matter more than who runs the calculation.",
    },
    {
      q: "Should an underpayment wait for the next payroll run?",
      a: "Usually not. Once an underpayment is confirmed, most employers pay the difference in an off-cycle payment and explain the cause to the employee. Overpayments are normally recovered by agreement, following local law.",
    },
  ],
  related: ["month-end-payroll-checklist", "spreadsheets-vs-hr-software", "epf-etf-calculation-sri-lanka"],
};
