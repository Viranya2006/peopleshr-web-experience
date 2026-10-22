// Answers describe what actually happens, ordered from manual (0) to fully connected (3).
// People answer this more honestly than "rate your payroll process from 1 to 5".

export type AreaId = "records" | "time" | "payroll" | "leave" | "talent" | "service";

export type Area = {
  id: AreaId;
  name: string;
  module: string;
  // How much a gap here costs a typical business, before industry and size adjustments.
  impact: number;
  why: string;
  firstStep: { low: string; mid: string };
};

export const AREAS: Area[] = [
  {
    id: "records",
    name: "People records",
    module: "PeoplesHR HR",
    impact: 1.0,
    why: "Every other process copies from the employee record. If it's split across files, each copy is a chance for payroll, leave and reports to disagree.",
    firstStep: {
      low: "Pick one spreadsheet as the master record this month and stop updating the others. List which columns payroll actually needs.",
      mid: "Find the details that still live outside your HR system (bank details, contracts, emergency contacts) and move them in.",
    },
  },
  {
    id: "time",
    name: "Time & attendance",
    module: "PeoplesHR Time",
    impact: 1.0,
    why: "Attendance feeds overtime, allowances and deductions. When it's fixed by hand at month end, payroll inherits every mistake.",
    firstStep: {
      low: "Write down your shift and overtime rules in one page. Most month-end arguments come from rules that only exist in someone's head.",
      mid: "Set an approval cut-off two days before payroll and report on late approvals. That alone shortens the month-end clean-up.",
    },
  },
  {
    id: "payroll",
    name: "Payroll",
    module: "PeoplesHR Pay",
    impact: 1.3,
    why: "Payroll is where errors become visible to every employee and to the tax authority. Trust in HR drops fastest here.",
    firstStep: {
      low: "Start a variance check: compare each payslip with last month's and look at anything that moved more than 10%.",
      mid: "Track every post-payday correction for three months with its cause. The pattern tells you which input to automate first.",
    },
  },
  {
    id: "leave",
    name: "Leave",
    module: "PeoplesHR HR & mobile app",
    impact: 0.8,
    why: "Leave touches every employee every month. Wrong balances create disputes, and unrecorded leave becomes a payroll error.",
    firstStep: {
      low: "Publish everyone's current balance once, from one source, and ask employees to flag disagreements now rather than at year end.",
      mid: "Move approvals to managers in the system and stop HR re-keying emailed requests.",
    },
  },
  {
    id: "talent",
    name: "Performance & hiring",
    module: "PeoplesHR Talent",
    impact: 0.9,
    why: "Without a consistent record of goals and reviews, pay rises and promotions are hard to explain and good people leave quietly.",
    firstStep: {
      low: "Agree three goals per person for the next quarter, written down somewhere shared. Consistency matters more than the tool.",
      mid: "Link review outcomes to the pay review calendar so decisions use this year's evidence, not memory.",
    },
  },
  {
    id: "service",
    name: "Self-service & reporting",
    module: "PeoplesHR mobile app, Lexi AI & Insight",
    impact: 0.9,
    why: "Every question an employee can't answer themselves lands on HR, and every report built by hand is out of date when it's read.",
    firstStep: {
      low: "Log the questions HR gets for two weeks. The top five usually cover most of the volume and are the first to hand back to employees.",
      mid: "Choose the three numbers leadership asks for most and build them once as a live report instead of a monthly spreadsheet.",
    },
  },
];

export type Question = {
  id: string;
  area: AreaId;
  text: string;
  options: [string, string, string, string];
};

export const QUESTIONS: Question[] = [
  {
    id: "records-source",
    area: "records",
    text: "Where does up-to-date employee information live?",
    options: [
      "Several spreadsheets and paper files",
      "One main spreadsheet that one or two people maintain",
      "An HR system, but some details still sit in spreadsheets",
      "One HR system that everything else reads from",
    ],
  },
  {
    id: "records-change",
    area: "records",
    text: "An employee changes their bank account. What happens next?",
    options: [
      "They send a form or email, and we update every file that needs it",
      "HR updates the master sheet and tells payroll",
      "HR updates the HR system, and payroll picks it up in the next export",
      "The employee updates it on their phone, HR approves, payroll gets it automatically",
    ],
  },
  {
    id: "time-capture",
    area: "time",
    text: "How is attendance captured?",
    options: [
      "Paper registers or sign-in sheets",
      "Fingerprint or card devices, exported to a spreadsheet",
      "Devices feed a system, but shifts and overtime are adjusted by hand",
      "Devices and mobile check-ins flow into one system that applies shift and overtime rules",
    ],
  },
  {
    id: "time-approval",
    area: "time",
    text: "How are overtime and shift changes approved?",
    options: [
      "Verbally or on paper, sorted out at month end",
      "By email or chat, collected by HR",
      "In a system, but HR still chases late approvals",
      "Managers approve in-app before the payroll cut-off, with reminders",
    ],
  },
  {
    id: "payroll-run",
    area: "payroll",
    text: "How do you run payroll each month?",
    options: [
      "Spreadsheet formulas that we rebuild or check by hand",
      "Desktop payroll software fed from spreadsheets",
      "Payroll software linked to HR data, with some manual adjustments",
      "Payroll draws on attendance, leave and HR data with no re-keying",
    ],
  },
  {
    id: "payroll-errors",
    area: "payroll",
    text: "How often does a payslip need correcting after it's issued?",
    options: [
      "Most months, for several people",
      "Most months, for one or two people",
      "A few times a year",
      "Rarely. Checks catch problems before approval",
    ],
  },
  {
    id: "leave-apply",
    area: "leave",
    text: "How do employees apply for leave?",
    options: [
      "A paper form or a message to their manager",
      "An email to HR, who update a spreadsheet",
      "In a system, though balances are sometimes wrong",
      "In an app that shows live balances and routes approval",
    ],
  },
  {
    id: "leave-balance",
    area: "leave",
    text: "Can an employee check their own leave balance?",
    options: [
      "No, they ask HR",
      "HR sends balances out now and then",
      "Yes, but it isn't always current",
      "Yes, live, on their phone",
    ],
  },
  {
    id: "talent-reviews",
    area: "talent",
    text: "How do performance reviews happen?",
    options: [
      "They don't happen consistently",
      "Once a year, on Word or Excel forms",
      "In a system, but goals and feedback sit elsewhere",
      "Goals, check-ins and reviews in one place, used for pay and promotion decisions",
    ],
  },
  {
    id: "talent-hiring",
    area: "talent",
    text: "How do you manage hiring?",
    options: [
      "CVs arrive by email and live in someone's inbox",
      "A shared spreadsheet of candidates",
      "A job board or recruitment tool that doesn't connect to HR records",
      "A recruitment tool that hands new hires straight into onboarding",
    ],
  },
  {
    id: "service-questions",
    area: "service",
    text: "Who answers “How many leave days do I have?” or “Why is my pay different?”",
    options: [
      "HR, one message at a time",
      "HR, with a shared FAQ document",
      "A portal covers some of it",
      "Employees find the answer themselves in an app or HR assistant",
    ],
  },
  {
    id: "service-reports",
    area: "service",
    text: "Leadership asks for headcount cost by department. How long does it take?",
    options: [
      "Days, pulled together from several files",
      "About a day of spreadsheet work",
      "A few hours from system reports",
      "Minutes, from a live dashboard",
    ],
  },
];

export const SIZE_BANDS = [
  { id: "s", label: "Under 50 employees", phrase: "fewer than 50 employees" },
  { id: "m", label: "50–200", phrase: "50–200 employees" },
  { id: "l", label: "201–1,000", phrase: "201–1,000 employees" },
  { id: "xl", label: "More than 1,000", phrase: "more than 1,000 employees" },
] as const;

export const INDUSTRIES = [
  { id: "manufacturing", label: "Manufacturing & apparel", phrase: "manufacturing", shiftHeavy: true },
  { id: "hospitality", label: "Hospitality & leisure", phrase: "hospitality", shiftHeavy: true },
  { id: "retail", label: "Retail & distribution", phrase: "retail", shiftHeavy: true },
  { id: "healthcare", label: "Healthcare", phrase: "healthcare", shiftHeavy: true },
  { id: "finance", label: "Banking & finance", phrase: "financial services", shiftHeavy: false },
  { id: "services", label: "Professional services & IT", phrase: "professional services", shiftHeavy: false },
  { id: "other", label: "Something else", phrase: "", shiftHeavy: false },
] as const;

export const ROLES = [
  { id: "hr", label: "HR" },
  { id: "payroll", label: "Payroll or finance" },
  { id: "owner", label: "Owner or leadership" },
  { id: "ops", label: "Operations" },
  { id: "it", label: "IT" },
] as const;

export type SizeBand = (typeof SIZE_BANDS)[number]["id"];
export type Industry = (typeof INDUSTRIES)[number]["id"];
export type Role = (typeof ROLES)[number]["id"];
