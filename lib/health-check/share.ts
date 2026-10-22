import { INDUSTRIES, QUESTIONS, ROLES, SIZE_BANDS } from "./questions";
import type { Answers, Profile } from "./scoring";

// A result link looks like #r=012301230123.m.retail.hr: twelve answer digits, then the profile.
export function encodeResult(answers: Answers, profile: Profile) {
  return `r=${answers.map((a) => a ?? 0).join("")}.${profile.size}.${profile.industry}.${profile.role}`;
}

export function decodeResult(hash: string): { answers: Answers; profile: Profile } | null {
  const match = /^#?r=([0-3]+)\.(\w+)\.(\w+)\.(\w+)$/.exec(hash);
  if (!match) return null;
  const [, digits, size, industry, role] = match;
  if (digits.length !== QUESTIONS.length) return null;
  if (!SIZE_BANDS.some((s) => s.id === size)) return null;
  if (!INDUSTRIES.some((i) => i.id === industry)) return null;
  if (!ROLES.some((r) => r.id === role)) return null;

  return {
    answers: digits.split("").map(Number),
    profile: { size: size as Profile["size"], industry: industry as Profile["industry"], role: role as Profile["role"] },
  };
}
