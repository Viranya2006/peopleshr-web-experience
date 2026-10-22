import { z } from "zod";

// Free mail domains are accepted but flagged, so sales can tell a business lead from a personal one.
const FREE_MAIL = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "icloud.com"];

export const leadSchema = z.object({
  source: z.enum(["admin-cost", "health-check", "guides", "demo-page"]),
  intent: z.enum(["report", "consultation", "checklist"]),
  email: z.email("Enter a valid email address").max(200),
  name: z.string().trim().max(120).optional(),
  company: z.string().trim().max(160).optional(),
  phone: z.string().trim().max(40).optional(),
  // What the visitor saw (annual cost, priorities…) so the follow-up starts from their numbers.
  context: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
});

export type Lead = z.infer<typeof leadSchema>;

export function isWorkEmail(email: string) {
  const domain = email.split("@")[1]?.toLowerCase() ?? "";
  return !FREE_MAIL.includes(domain);
}
