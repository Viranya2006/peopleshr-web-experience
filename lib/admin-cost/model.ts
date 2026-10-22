// Every number the calculator uses lives in this file. The "Show the maths" panel renders
// the same values, so the page and the code can't drift apart.

export const HOURS_PER_PERSON_MONTH = 160;

// Share of admin time a connected HR/payroll system typically takes away. Kept as a range
// on purpose: we would rather under-promise than show one inflated number.
export const RECOVERY = { low: 0.4, high: 0.7 } as const;

export const HOURS_PER_PAYROLL_FIX = 1.5;

export type CurrencyCode = "USD" | "SGD" | "LKR" | "PHP" | "KES" | "BDT";

// Loaded hourly cost of an HR or payroll officer (salary plus employer costs).
// These are starting points the visitor is asked to correct, not market data.
export const CURRENCIES: Record<CurrencyCode, { label: string; hourly: number; min: number; max: number; step: number }> = {
  USD: { label: "US dollar", hourly: 22, min: 5, max: 90, step: 1 },
  SGD: { label: "Singapore dollar", hourly: 32, min: 10, max: 120, step: 1 },
  LKR: { label: "Sri Lankan rupee", hourly: 1500, min: 300, max: 8000, step: 50 },
  PHP: { label: "Philippine peso", hourly: 260, min: 80, max: 1500, step: 10 },
  KES: { label: "Kenyan shilling", hourly: 650, min: 200, max: 4000, step: 50 },
  BDT: { label: "Bangladeshi taka", hourly: 450, min: 100, max: 3000, step: 25 },
};

export type Inputs = {
  headcount: number;
  teamSize: number;
  currency: CurrencyCode;
  hourlyCost: number;
  errorRate: number; // % of payslips corrected after payday
};

export type TaskId = "payroll" | "attendance" | "leave" | "queries" | "fixes" | "movers" | "reports" | "rekeying";

export type Task = {
  id: TaskId;
  label: string;
  detail: string;
  basis: string;
  module: string;
  fix: string;
  estimate: (i: Inputs) => number; // hours per month
};

export const TASKS: Task[] = [
  {
    id: "payroll",
    label: "Preparing and checking payroll",
    detail: "Collecting inputs, running the numbers, checking payslips before approval.",
    basis: "8 h per run, plus 4 min per employee to check inputs and payslips.",
    module: "Pay",
    fix: "Pay pulls attendance, leave and HR changes in automatically, so the run starts from clean inputs.",
    estimate: (i) => 8 + (i.headcount * 4) / 60,
  },
  {
    id: "attendance",
    label: "Reconciling attendance and overtime",
    detail: "Matching clock-ins, rosters, shift swaps and overtime claims.",
    basis: "About 2 min per employee per week (4.33 weeks a month), plus 4 h of month-end clean-up.",
    module: "Time",
    fix: "Time applies shift and overtime rules as people clock in, so month end is a review, not a rebuild.",
    estimate: (i) => 4 + (i.headcount * 2 * 4.33) / 60,
  },
  {
    id: "leave",
    label: "Tracking leave and balances",
    detail: "Recording requests, chasing approvals, keeping balances right.",
    basis: "About 1.2 requests per employee a month, 6 min each.",
    module: "HR",
    fix: "Employees apply on the mobile app, managers approve there, and balances update themselves.",
    estimate: (i) => (i.headcount * 1.2 * 6) / 60,
  },
  {
    id: "queries",
    label: "Answering payslip and policy questions",
    detail: "“How many leave days do I have?”, “Why is my pay different this month?”",
    basis: "About 0.4 questions per employee a month, 10 min each.",
    module: "Lexi AI",
    fix: "Employees ask Lexi or check the app themselves; HR only sees the questions that need a person.",
    estimate: (i) => (i.headcount * 0.4 * 10) / 60,
  },
  {
    id: "fixes",
    label: "Fixing payroll errors after payday",
    detail: "Investigating, recalculating, making off-cycle payments, explaining to the employee.",
    basis: `Headcount × your error rate × ${HOURS_PER_PAYROLL_FIX} h per correction.`,
    module: "Pay",
    fix: "Pre-approval checks flag unusual changes before payslips go out.",
    estimate: (i) => i.headcount * (i.errorRate / 100) * HOURS_PER_PAYROLL_FIX,
  },
  {
    id: "movers",
    label: "Joiner and leaver paperwork",
    detail: "Contracts, documents, accounts, final settlements.",
    basis: "20% annual turnover means about 3.3 joiners or leavers per 100 staff a month, 3 h each.",
    module: "HR",
    fix: "Onboarding and exit checklists run from one record, with documents collected digitally.",
    estimate: (i) => i.headcount * ((2 * 0.2) / 12) * 3,
  },
  {
    id: "reports",
    label: "Statutory returns and management reports",
    detail: "Tax and social security filings, headcount and cost reports for leadership.",
    basis: "10 h a month, plus about 0.6 min per employee.",
    module: "Insight",
    fix: "Statutory formats and live dashboards come from the same data payroll already uses.",
    estimate: (i) => 10 + (i.headcount * 0.6) / 60,
  },
  {
    id: "rekeying",
    label: "Re-entering data between systems",
    detail: "Copying the same change into HR, payroll and finance spreadsheets.",
    basis: "4 h a month, plus about 3 min per employee.",
    module: "HR",
    fix: "One employee record feeds payroll, time and reporting, so a change is made once.",
    estimate: (i) => 4 + (i.headcount * 3) / 60,
  },
];

export type TaskState = {
  disabled: TaskId[];
  overrides: Partial<Record<TaskId, number>>;
};

export type Line = {
  task: Task;
  hours: number;
  annualCost: number;
  custom: boolean;
};

export type Verdict = "minor" | "worth-fixing" | "costly";

export type Result = {
  lines: Line[];
  monthlyHours: number;
  annualHours: number;
  annualCost: number;
  people: number;
  teamShare: number;
  recoverable: { low: number; high: number };
  breakEvenPerEmployee: number;
  verdict: Verdict;
};

export function hoursFor(task: Task, inputs: Inputs, state: TaskState) {
  const override = state.overrides[task.id];
  return override ?? round1(task.estimate(inputs));
}

export function calculate(inputs: Inputs, state: TaskState): Result {
  const lines = TASKS.filter((t) => !state.disabled.includes(t.id)).map((task) => {
    const hours = hoursFor(task, inputs, state);
    return { task, hours, annualCost: hours * 12 * inputs.hourlyCost, custom: state.overrides[task.id] !== undefined };
  });

  const monthlyHours = lines.reduce((sum, l) => sum + l.hours, 0);
  const annualCost = lines.reduce((sum, l) => sum + l.annualCost, 0);
  const people = monthlyHours / HOURS_PER_PERSON_MONTH;
  const recoverable = { low: annualCost * RECOVERY.low, high: annualCost * RECOVERY.high };

  return {
    lines,
    monthlyHours,
    annualHours: monthlyHours * 12,
    annualCost,
    people,
    teamShare: inputs.teamSize > 0 ? monthlyHours / (inputs.teamSize * HOURS_PER_PERSON_MONTH) : 0,
    recoverable,
    // The most a system could cost per employee per month and still pay for itself
    // using the low end of the recovery range.
    breakEvenPerEmployee: inputs.headcount > 0 ? recoverable.low / 12 / inputs.headcount : 0,
    verdict: verdictFor(people),
  };
}

export function verdictFor(people: number): Verdict {
  if (people < 0.25) return "minor";
  if (people < 1) return "worth-fixing";
  return "costly";
}

export function topLines(result: Result, count = 3) {
  return [...result.lines].sort((a, b) => b.hours - a.hours).slice(0, count);
}

const round1 = (n: number) => Math.round(n * 10) / 10;
