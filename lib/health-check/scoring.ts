import { AREAS, INDUSTRIES, QUESTIONS, type Area, type AreaId, type Industry, type Role, type SizeBand } from "./questions";

export type Profile = { size: SizeBand; industry: Industry; role: Role };

// One answer per question, 0–3, in QUESTIONS order. null = not answered yet.
export type Answers = (number | null)[];

export const STAGES = [
  { min: 0, name: "Paper and spreadsheets", summary: "Most HR work depends on people copying information by hand." },
  { min: 35, name: "Partly digital", summary: "Some systems are in place, but they don't talk to each other, so people fill the gaps." },
  { min: 60, name: "Connected", summary: "Core processes run in systems. What's left is the hand-offs and the reporting." },
  { min: 85, name: "Insight-led", summary: "Data flows on its own. HR spends its time on decisions, not admin." },
] as const;

export type Stage = (typeof STAGES)[number];

export type AreaScore = { area: Area; score: number; priority: number };

export type Package = "Manage" | "Grow" | "Transform";

export type Outcome = {
  overall: number;
  stage: Stage;
  areas: AreaScore[];
  priorities: AreaScore[];
  pkg: { name: Package; reason: string };
};

// Areas that already score at least this well aren't flagged as priorities.
export const PRIORITY_CEILING = 80;

export function areaScores(answers: Answers): Record<AreaId, number> {
  const scores = {} as Record<AreaId, number>;
  for (const area of AREAS) {
    const values = QUESTIONS.flatMap((q, i) => (q.area === area.id && answers[i] != null ? [answers[i] as number] : []));
    scores[area.id] = values.length ? Math.round((values.reduce((a, b) => a + b, 0) / (values.length * 3)) * 100) : 0;
  }
  return scores;
}

// A gap matters more in some businesses: shift-heavy industries feel attendance problems
// first, and larger companies feel reporting and talent gaps more.
export function impactFor(area: Area, profile: Profile) {
  const industry = INDUSTRIES.find((i) => i.id === profile.industry);
  let weight = area.impact;
  if (area.id === "time" && industry?.shiftHeavy) weight += 0.4;
  if ((area.id === "talent" || area.id === "service") && (profile.size === "l" || profile.size === "xl")) weight += 0.3;
  if (area.id === "talent" && profile.industry === "services") weight += 0.3;
  if (area.id === "records" && profile.size === "s") weight -= 0.2;
  return weight;
}

export function stageFor(overall: number): Stage {
  return [...STAGES].reverse().find((s) => overall >= s.min) ?? STAGES[0];
}

// Package contents aren't public, so this mapping is our reading of the package names:
// Manage = run core HR, time and pay; Grow = add talent and engagement; Transform = analytics and AI.
export function packageFor(scores: Record<AreaId, number>, priorities: AreaScore[], profile: Profile): Outcome["pkg"] {
  const core = (scores.records + scores.time + scores.payroll + scores.leave) / 4;
  const topIds = priorities.map((p) => p.area.id);
  const big = profile.size === "l" || profile.size === "xl";

  if (core < 60) {
    return {
      name: "Manage",
      reason: "Your biggest gains are in the everyday work: records, attendance, leave and payroll. Get those running from one place before adding more.",
    };
  }
  if (big && (core >= 75 || topIds.includes("service"))) {
    return {
      name: "Transform",
      reason: "Your core processes are in reasonable shape. At your size, the value is in live reporting and letting employees answer their own questions.",
    };
  }
  return {
    name: "Grow",
    reason: "The basics mostly work. Your gaps are in performance, hiring and the employee experience, which is what this package adds.",
  };
}

export function evaluate(answers: Answers, profile: Profile): Outcome {
  const scores = areaScores(answers);
  const areas = AREAS.map((area) => ({
    area,
    score: scores[area.id],
    priority: Math.round((100 - scores[area.id]) * impactFor(area, profile)),
  }));
  const overall = Math.round(areas.reduce((sum, a) => sum + a.score, 0) / areas.length);
  const priorities = areas
    .filter((a) => a.score < PRIORITY_CEILING)
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 3);

  return { overall, stage: stageFor(overall), areas, priorities, pkg: packageFor(scores, priorities, profile) };
}

export const firstStepFor = (a: AreaScore) => (a.score < 50 ? a.area.firstStep.low : a.area.firstStep.mid);
