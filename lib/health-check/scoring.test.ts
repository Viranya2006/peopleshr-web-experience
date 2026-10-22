import { describe, expect, it } from "vitest";
import { QUESTIONS } from "./questions";
import { areaScores, evaluate, firstStepFor, stageFor, type Answers, type Profile } from "./scoring";
import { decodeResult, encodeResult } from "./share";

const profile: Profile = { size: "m", industry: "services", role: "hr" };
const all = (n: number): Answers => QUESTIONS.map(() => n);

// Answers by area in QUESTIONS order: records×2, time×2, payroll×2, leave×2, talent×2, service×2.
const byArea = (records: number, time: number, payroll: number, leave: number, talent: number, service: number): Answers =>
  [records, records, time, time, payroll, payroll, leave, leave, talent, talent, service, service];

describe("areaScores", () => {
  it("scores each area 0–100 from its two questions", () => {
    const s = areaScores(byArea(0, 3, 1, 2, 3, 0));
    expect(s).toEqual({ records: 0, time: 100, payroll: 33, leave: 67, talent: 100, service: 0 });
  });

  it("ignores unanswered questions instead of counting them as zero", () => {
    const answers = all(3);
    answers[0] = null;
    expect(areaScores(answers).records).toBe(100);
  });
});

describe("stageFor", () => {
  it.each([
    [0, "Paper and spreadsheets"],
    [34, "Paper and spreadsheets"],
    [35, "Partly digital"],
    [60, "Connected"],
    [85, "Insight-led"],
    [100, "Insight-led"],
  ])("%s → %s", (score, name) => {
    expect(stageFor(score).name).toBe(name);
  });
});

describe("evaluate", () => {
  it("returns no priorities when everything is already strong", () => {
    const r = evaluate(all(3), profile);
    expect(r.overall).toBe(100);
    expect(r.priorities).toHaveLength(0);
  });

  it("puts payroll first when it's as weak as everything else, because errors hurt most there", () => {
    const r = evaluate(all(0), profile);
    expect(r.priorities[0].area.id).toBe("payroll");
    expect(r.priorities).toHaveLength(3);
  });

  it("raises attendance for shift-heavy industries", () => {
    const answers = byArea(1, 1, 1, 1, 1, 1);
    const office = evaluate(answers, { ...profile, industry: "finance" });
    const factory = evaluate(answers, { ...profile, industry: "manufacturing" });
    const rank = (r: typeof office) => r.priorities.findIndex((p) => p.area.id === "time");
    expect(rank(factory)).toBeGreaterThanOrEqual(0);
    expect(rank(factory)).toBeLessThan(rank(office) === -1 ? Infinity : rank(office));
  });

  it("only flags areas below the ceiling", () => {
    const r = evaluate(byArea(3, 3, 3, 3, 0, 3), profile);
    expect(r.priorities.map((p) => p.area.id)).toEqual(["talent"]);
  });

  it("gives the first step that fits the score", () => {
    const low = evaluate(all(0), profile).priorities[0];
    const mid = evaluate(all(2), profile).priorities[0];
    expect(firstStepFor(low)).toBe(low.area.firstStep.low);
    expect(firstStepFor(mid)).toBe(mid.area.firstStep.mid);
  });
});

describe("package suggestion", () => {
  it("suggests Manage while the core processes are weak", () => {
    expect(evaluate(byArea(0, 1, 1, 0, 3, 3), profile).pkg.name).toBe("Manage");
  });

  it("suggests Grow when the core works but talent lags", () => {
    expect(evaluate(byArea(3, 2, 3, 2, 0, 2), profile).pkg.name).toBe("Grow");
  });

  it("suggests Transform for a large company with solid core processes", () => {
    expect(evaluate(byArea(3, 3, 3, 2, 2, 1), { ...profile, size: "xl" }).pkg.name).toBe("Transform");
  });
});

describe("share link", () => {
  it("round-trips answers and profile", () => {
    const answers = byArea(0, 1, 2, 3, 1, 2);
    const p: Profile = { size: "l", industry: "retail", role: "payroll" };
    expect(decodeResult(`#${encodeResult(answers, p)}`)).toEqual({ answers, profile: p });
  });

  it("rejects links that were cut short or edited", () => {
    expect(decodeResult("#r=0123.m.retail.hr")).toBeNull();
    expect(decodeResult("#r=012301230123.m.space.hr")).toBeNull();
    expect(decodeResult("#r=012301230129.m.retail.hr")).toBeNull();
    expect(decodeResult("")).toBeNull();
  });
});
