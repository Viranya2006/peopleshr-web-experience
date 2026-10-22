import { CURRENCIES, TASKS, type CurrencyCode, type Inputs, type TaskId, type TaskState } from "./model";

export type CalcState = Inputs & TaskState;

export const LIMITS = {
  headcount: { min: 10, max: 5000 },
  teamSize: { min: 1, max: 60 },
  errorRate: { min: 0, max: 15 },
  taskHours: { min: 0, max: 800 },
} as const;

export function defaultState(currency: CurrencyCode = "USD"): CalcState {
  return {
    headcount: 250,
    teamSize: 3,
    currency,
    hourlyCost: CURRENCIES[currency].hourly,
    errorRate: 2,
    disabled: [],
    overrides: {},
  };
}

const TASK_IDS = new Set<string>(TASKS.map((t) => t.id));

// Short query keys keep shared links readable: ?n=250&team=3&cur=LKR&rate=1500&err=2&off=leave&h.payroll=30
export function toSearchParams(s: CalcState): URLSearchParams {
  const p = new URLSearchParams({
    n: String(s.headcount),
    team: String(s.teamSize),
    cur: s.currency,
    rate: String(s.hourlyCost),
    err: String(s.errorRate),
  });
  if (s.disabled.length) p.set("off", s.disabled.join(","));
  for (const [id, hours] of Object.entries(s.overrides)) p.set(`h.${id}`, String(hours));
  return p;
}

export function fromSearchParams(p: URLSearchParams, fallback: CalcState): CalcState {
  const currency = (p.get("cur") ?? "").toUpperCase();
  const cur: CurrencyCode = currency in CURRENCIES ? (currency as CurrencyCode) : fallback.currency;
  const rateLimits = CURRENCIES[cur];

  const overrides: TaskState["overrides"] = {};
  for (const [key, value] of p) {
    const id = key.startsWith("h.") ? key.slice(2) : "";
    if (TASK_IDS.has(id)) {
      const hours = num(value);
      if (hours !== null) overrides[id as TaskId] = clamp(hours, LIMITS.taskHours.min, LIMITS.taskHours.max);
    }
  }

  return {
    headcount: clampOr(p.get("n"), LIMITS.headcount.min, LIMITS.headcount.max, fallback.headcount),
    teamSize: clampOr(p.get("team"), LIMITS.teamSize.min, LIMITS.teamSize.max, fallback.teamSize),
    currency: cur,
    hourlyCost: clampOr(p.get("rate"), rateLimits.min, rateLimits.max, cur === fallback.currency ? fallback.hourlyCost : rateLimits.hourly),
    errorRate: clampOr(p.get("err"), LIMITS.errorRate.min, LIMITS.errorRate.max, fallback.errorRate),
    disabled: (p.get("off") ?? "").split(",").filter((id): id is TaskId => TASK_IDS.has(id)),
    overrides,
  };
}

// Picks a currency from the browser locale on first visit (en-LK → LKR and so on).
export function currencyForLocale(locale: string): CurrencyCode {
  const region = locale.split("-")[1]?.toUpperCase();
  const byRegion: Record<string, CurrencyCode> = { SG: "SGD", LK: "LKR", PH: "PHP", KE: "KES", BD: "BDT" };
  return (region && byRegion[region]) || "USD";
}

function num(value: string | null) {
  if (value === null || value.trim() === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function clampOr(value: string | null, min: number, max: number, fallback: number) {
  const n = num(value);
  return n === null ? fallback : clamp(n, min, max);
}

export const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));
