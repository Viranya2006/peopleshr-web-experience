import type { Guide } from "../types";

export const guide: Guide = {
  slug: "month-end-payroll-checklist",
  title: "Month-end payroll checklist: 12 steps from cut-off to payslips",
  description:
    "A 12-step month-end payroll checklist covering cut-off, attendance and leave, the payroll run, checks, approval, payments, statutory filing and payslips.",
  stage: "understand",
  shortAnswer:
    "A reliable month-end payroll follows the same order every time. Freeze inputs at a cut-off, process employee changes, close attendance and leave, run a draft, check variances, get a second approval, pay, file statutory returns and issue payslips. Ticking off the same list every month prevents most missed steps.",
  updated: "2026-10-12",
  readMinutes: 5,
  steps: [
    { name: "Announce the cut-off", text: "Remind managers of the date after which changes move to next month. Five working days before payday works for most teams." },
    { name: "Process joiners, leavers and changes", text: "Enter new starters, final settlements, promotions, pay changes and bank detail updates, each with its effective date." },
    { name: "Close attendance and overtime", text: "Lock attendance for the period, resolve missing punches and make sure every overtime claim is approved." },
    { name: "Close leave", text: "Confirm unpaid leave, leave encashment and any leave taken but not yet recorded." },
    { name: "Add one-off payments and deductions", text: "Bonuses, commissions, advances, loan repayments and other deductions for this month only." },
    { name: "Run a draft payroll", text: "Calculate the payroll without approving it, so it can still be corrected." },
    { name: "Check variances", text: "Compare each net pay with last month and explain every movement above 10%." },
    { name: "Check statutory deductions", text: "Recalculate tax and social security for a sample of employees in different pay bands." },
    { name: "Get a second approval", text: "Someone who didn't prepare the payroll reviews the variance report and signs it off." },
    { name: "Pay and check the bank file", text: "Make sure the bank file's count and total match the payroll register before you release it." },
    { name: "Pay and file statutory contributions", text: "Pay tax and social security, and file the returns before their deadlines." },
    { name: "Issue payslips and close the month", text: "Send payslips, file the approval and variance report, and note anything to change next month." },
  ],
  sections: [
    {
      id: "checklist",
      heading: "The month-end payroll checklist",
      blocks: [
        { type: "p", text: "Work through the steps in order. Steps 1–5 happen before the cut-off, 6–9 are the run and its checks, and 10–12 are payments and close." },
        { type: "steps" },
      ],
    },
    {
      id: "cut-off",
      heading: "How long before payday should the cut-off be?",
      blocks: [
        {
          type: "p",
          text: "Leave enough time to run, check and approve without rushing, plus the bank's processing time. For a few hundred employees that's usually five working days. If changes keep arriving after the cut-off, the cut-off is too late, or managers don't feel bound by it.",
        },
      ],
    },
    {
      id: "records",
      heading: "What should you keep on file each month?",
      blocks: [
        {
          type: "ul",
          items: [
            "The approved payroll register and who approved it",
            "The variance report with an explanation for each large movement",
            "Statutory returns and proof of payment",
            "Approvals for overtime, allowances and one-off payments",
          ],
        },
        {
          type: "p",
          text: "How long to keep payroll records depends on the country, and is often several years. Check local requirements. For Sri Lanka's contribution rules, see [how EPF and ETF are calculated](/guides/epf-etf-calculation-sri-lanka).",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "When should the payroll cut-off be?",
      a: "Most teams set it about five working days before payday. That leaves time to run the payroll, check variances, get approval and allow for bank processing.",
    },
    {
      q: "Who should approve payroll?",
      a: "Someone other than the person who prepared it, usually the finance manager or the head of HR. They should review the variance report, not just the total.",
    },
    {
      q: "What's the most commonly missed step?",
      a: "Closing leave. Unpaid leave that was taken but never recorded is one of the most frequent causes of overpayment.",
    },
  ],
  related: ["how-to-reduce-payroll-errors", "epf-etf-calculation-sri-lanka", "spreadsheets-vs-hr-software"],
};
