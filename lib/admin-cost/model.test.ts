import { describe, expect, it } from "vitest";
import { HOURS_PER_PERSON_MONTH, RECOVERY, TASKS, calculate, topLines, verdictFor } from "./model";
import { currencyForLocale, defaultState, fromSearchParams, toSearchParams } from "./state";

const base = defaultState("USD");

describe("calculate", () => {
  it("adds up every enabled task and prices it at the hourly cost", () => {
    const r = calculate(base, base);
    const hours = r.lines.reduce((s, l) => s + l.hours, 0);

    expect(r.lines).toHaveLength(TASKS.length);
    expect(r.monthlyHours).toBeCloseTo(hours);
    expect(r.annualCost).toBeCloseTo(hours * 12 * base.hourlyCost);
    expect(r.people).toBeCloseTo(hours / HOURS_PER_PERSON_MONTH);
  });

  it("gives a plausible result for the default 250-person company", () => {
    const r = calculate(base, base);
    // Roughly one person's month of admin; if this moves a lot, an assumption changed.
    expect(r.monthlyHours).toBeGreaterThan(120);
    expect(r.monthlyHours).toBeLessThan(220);
  });

  it("drops disabled tasks", () => {
    const r = calculate(base, { ...base, disabled: ["leave", "reports"] });
    expect(r.lines.map((l) => l.task.id)).not.toContain("leave");
    expect(r.lines).toHaveLength(TASKS.length - 2);
  });

  it("uses the visitor's own hours when they override a line", () => {
    const r = calculate(base, { ...base, overrides: { payroll: 40 } });
    const payroll = r.lines.find((l) => l.task.id === "payroll")!;
    expect(payroll.hours).toBe(40);
    expect(payroll.custom).toBe(true);
  });

  it("ties payroll error hours to the error rate", () => {
    const none = calculate({ ...base, errorRate: 0 }, base);
    const some = calculate({ ...base, errorRate: 4 }, base);
    const fixes = (r: typeof none) => r.lines.find((l) => l.task.id === "fixes")!.hours;
    expect(fixes(none)).toBe(0);
    expect(fixes(some)).toBeCloseTo(250 * 0.04 * 1.5);
  });

  it("keeps the recovery range and break-even consistent", () => {
    const r = calculate(base, base);
    expect(r.recoverable.low).toBeCloseTo(r.annualCost * RECOVERY.low);
    expect(r.recoverable.high).toBeCloseTo(r.annualCost * RECOVERY.high);
    expect(r.breakEvenPerEmployee).toBeCloseTo(r.recoverable.low / 12 / base.headcount);
  });

  it("returns zeros instead of NaN when everything is switched off", () => {
    const r = calculate(base, { ...base, disabled: TASKS.map((t) => t.id) });
    expect(r.annualCost).toBe(0);
    expect(r.verdict).toBe("minor");
  });
});

describe("verdictFor", () => {
  it.each([
    [0.1, "minor"],
    [0.25, "worth-fixing"],
    [0.99, "worth-fixing"],
    [1, "costly"],
  ])("%s people → %s", (people, verdict) => {
    expect(verdictFor(people)).toBe(verdict);
  });
});

describe("topLines", () => {
  it("returns the biggest lines first", () => {
    const top = topLines(calculate(base, base));
    expect(top).toHaveLength(3);
    expect(top[0].hours).toBeGreaterThanOrEqual(top[1].hours);
  });
});

describe("URL state", () => {
  it("survives a round trip", () => {
    const state = { ...defaultState("LKR"), headcount: 800, disabled: ["leave" as const], overrides: { payroll: 55 } };
    expect(fromSearchParams(toSearchParams(state), defaultState())).toEqual(state);
  });

  it("clamps and ignores junk from a hand-edited link", () => {
    const p = new URLSearchParams("n=999999&team=-4&cur=xyz&err=abc&off=leave,nonsense&h.bogus=3&h.payroll=1e9");
    const s = fromSearchParams(p, base);
    expect(s.headcount).toBe(5000);
    expect(s.teamSize).toBe(1);
    expect(s.currency).toBe("USD");
    expect(s.errorRate).toBe(base.errorRate);
    expect(s.disabled).toEqual(["leave"]);
    expect(s.overrides).toEqual({ payroll: 800 });
  });

  it("uses the new currency's default rate when the link has no rate", () => {
    const s = fromSearchParams(new URLSearchParams("cur=PHP"), base);
    expect(s.hourlyCost).toBe(260);
  });
});

describe("currencyForLocale", () => {
  it("maps supported regions and falls back to USD", () => {
    expect(currencyForLocale("en-LK")).toBe("LKR");
    expect(currencyForLocale("si-LK")).toBe("LKR");
    expect(currencyForLocale("en-GB")).toBe("USD");
    expect(currencyForLocale("en")).toBe("USD");
  });
});
