import type { Guide } from "../types";

export const guide: Guide = {
  slug: "epf-etf-calculation-sri-lanka",
  title: "How EPF and ETF are calculated in Sri Lanka, with a worked example",
  description:
    "EPF is 8% from the employee and 12% from the employer; ETF is 3% from the employer. What counts as earnings, a worked example, and the mistakes that cause surcharges.",
  stage: "understand",
  shortAnswer:
    "EPF is 20% of an employee's monthly earnings: 8% deducted from the employee and 12% paid by the employer. ETF is a further 3%, paid only by the employer. On earnings of LKR 100,000, the employee's EPF is LKR 8,000, the employer's EPF is LKR 12,000 and ETF is LKR 3,000.",
  updated: "2026-10-12",
  readMinutes: 5,
  toolPreset: "cur=LKR",
  sections: [
    {
      id: "what-they-are",
      heading: "What are EPF and ETF?",
      blocks: [
        {
          type: "p",
          text: "The Employees' Provident Fund (EPF) is a retirement fund managed by the Central Bank of Sri Lanka. The Employees' Trust Fund (ETF) is a separate fund run by the Employees' Trust Fund Board. Private-sector employers covered by the two Acts must contribute to both every month for each eligible employee.",
        },
      ],
    },
    {
      id: "rates",
      heading: "What are the contribution rates?",
      blocks: [
        {
          type: "table",
          caption: "EPF and ETF contribution rates",
          head: ["Contribution", "Paid by", "Rate of earnings"],
          rows: [
            ["EPF", "Employee (deducted from pay)", "8%"],
            ["EPF", "Employer", "12%"],
            ["ETF", "Employer only", "3%"],
            ["Total", "", "23%"],
          ],
        },
        { type: "p", text: "ETF can't be deducted from the employee's salary. It's an employer cost on top of gross pay." },
      ],
    },
    {
      id: "earnings",
      heading: "What counts as earnings?",
      blocks: [
        {
          type: "p",
          text: "Contributions are calculated on the employee's total earnings for the month, not just basic salary. Earnings generally include basic salary, cost-of-living allowance and other regular allowances. Overtime is generally excluded.",
        },
        {
          type: "p",
          text: "Deciding which pay elements count is where most mistakes happen. List every allowance you pay and confirm how each is treated, with your auditor if you're unsure.",
        },
      ],
    },
    {
      id: "example",
      heading: "Worked example",
      blocks: [
        { type: "p", text: "An employee earns LKR 90,000 basic salary, a LKR 10,000 fixed allowance and LKR 12,000 overtime in the month." },
        {
          type: "table",
          caption: "EPF and ETF on LKR 100,000 of earnings",
          head: ["Item", "Calculation", "LKR"],
          rows: [
            ["Earnings for EPF and ETF", "90,000 + 10,000 (overtime excluded)", "100,000"],
            ["Employee EPF", "100,000 × 8%", "8,000"],
            ["Employer EPF", "100,000 × 12%", "12,000"],
            ["Employer ETF", "100,000 × 3%", "3,000"],
            ["Gross pay", "90,000 + 10,000 + 12,000", "112,000"],
            ["Pay after EPF, before income tax", "112,000 − 8,000", "104,000"],
            ["Total cost to employer", "112,000 + 12,000 + 3,000", "127,000"],
          ],
        },
        {
          type: "p",
          text: "Income tax (APIT) is calculated separately and isn't shown here.",
        },
      ],
    },
    {
      id: "deadlines",
      heading: "When are contributions due?",
      blocks: [
        {
          type: "p",
          text: "Both are paid monthly, by the end of the month after the one the wages relate to, together with the contribution returns. Late payment attracts surcharges, so confirm current deadlines and forms with the Central Bank's EPF Department and the ETF Board.",
        },
      ],
    },
    {
      id: "mistakes",
      heading: "Common mistakes",
      blocks: [
        {
          type: "ul",
          items: [
            "Calculating on basic salary only and leaving out regular allowances",
            "Including overtime in the EPF and ETF base",
            "Deducting ETF from the employee",
            "Missing contributions for an employee's final month",
            "Employee details that don't match the member number, so contributions aren't credited",
          ],
        },
        {
          type: "callout",
          title: "Check before you rely on this",
          text: "This guide reflects how the EPF and ETF rules are commonly applied in 2026. Rates and definitions can change, so check current regulations before using these figures for payroll.",
        },
        {
          type: "p",
          text: "Running payroll for Sri Lanka on spreadsheets? See what the manual work costs with the [admin cost check in LKR](/admin-cost?cur=LKR).",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "Is EPF calculated on gross salary?",
      a: "On total earnings, which is close to gross salary but generally excludes overtime. Basic salary, cost-of-living allowance and regular allowances are generally included.",
    },
    {
      q: "Can ETF be deducted from an employee's salary?",
      a: "No. ETF is 3% of earnings paid entirely by the employer. Only the employee's 8% EPF share is deducted from pay.",
    },
    {
      q: "How much does EPF and ETF add to an employer's cost?",
      a: "15% of earnings: 12% employer EPF plus 3% ETF. On LKR 100,000 of earnings that is LKR 15,000 a month on top of gross pay.",
    },
  ],
  related: ["month-end-payroll-checklist", "how-to-reduce-payroll-errors", "choosing-hr-payroll-software"],
};
