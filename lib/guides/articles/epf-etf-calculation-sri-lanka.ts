import type { Guide } from "../types";

export const guide: Guide = {
  slug: "epf-etf-calculation-sri-lanka",
  title: "How EPF and ETF are calculated in Sri Lanka, with a worked example",
  description:
    "EPF is 8% from the employee and 12% from the employer; ETF is 3% from the employer. What counts as earnings, a worked example, deadlines and late-payment surcharges.",
  stage: "understand",
  shortAnswer:
    "EPF is 20% of an employee's monthly earnings: 8% deducted from the employee and 12% paid by the employer. ETF is a further 3%, paid only by the employer. On earnings of LKR 100,000, the employee's EPF is LKR 8,000, the employer's EPF is LKR 12,000 and ETF is LKR 3,000.",
  updated: "2026-10-22",
  readMinutes: 6,
  toolPreset: "cur=LKR",
  sections: [
    {
      id: "what-they-are",
      heading: "What are EPF and ETF?",
      blocks: [
        {
          type: "p",
          text: "The Employees' Provident Fund (EPF) is a retirement fund managed by the Central Bank of Sri Lanka. The Employees' Trust Fund (ETF) is a separate fund run by the Employees' Trust Fund Board. Most employers must contribute to both every month for each employee, including casual, temporary and contract staff. There are a few exceptions, such as household employees for EPF and businesses employing only family members for ETF.",
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
        { type: "p", text: "The EPF rates are minimums; an employer can agree to pay more. ETF can't be deducted from the employee's salary. It's an employer cost on top of gross pay." },
      ],
    },
    {
      id: "earnings",
      heading: "What counts as earnings?",
      blocks: [
        {
          type: "p",
          text: "Contributions are calculated on the employee's total earnings for the month, not just basic salary.",
        },
        {
          type: "table",
          caption: "What is and isn't counted as earnings for EPF",
          head: ["Counted as earnings", "Not counted"],
          rows: [
            ["Salary, wages or fees", "Overtime pay"],
            ["Cost-of-living, special living and similar allowances", "Bonuses and incentive payments"],
            ["Holiday pay", "Reimbursed travel expenses"],
            ["Food allowances and the value of food provided", ""],
            ["Commissions, piece-rate and contract payments", ""],
          ],
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
          text: "Both are paid monthly, on or before the last working day of the following month. EPF is paid with Form C or an electronic return. ETF is paid with an R1 or R4 remittance form.",
        },
        {
          type: "p",
          text: "From July 2026 contributions, employers with 15 or more employees must pay ETF and submit returns electronically; cash, cheque and money-order payments are no longer accepted.",
        },
        {
          type: "table",
          caption: "Surcharges on late EPF and ETF contributions",
          head: ["Paid late by", "Surcharge"],
          rows: [
            ["Up to 10 days", "5%"],
            ["11 days to 1 month", "15%"],
            ["1 to 3 months", "20%"],
            ["3 to 6 months", "30%"],
            ["6 to 12 months", "40%"],
            ["More than 12 months", "50%"],
          ],
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
            "Including overtime or bonuses in the EPF and ETF base",
            "Leaving out food allowances or commissions, which do count",
            "Deducting ETF from the employee",
            "Missing contributions for an employee's final month",
            "Employee details that don't match the member number, so contributions aren't credited",
          ],
        },
        {
          type: "callout",
          title: "Check before you rely on this",
          text: "Checked against the EPF Department (epf.lk) and ETF Board (etfb.lk) guidance in October 2026. Rules can change, so confirm with those sources or your auditor before relying on these figures for payroll.",
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
      a: "On total earnings, which is close to gross salary but not the same. Salary, cost-of-living and similar allowances, food allowances and commissions are included. Overtime, bonuses, incentive payments and reimbursed travel are excluded.",
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
