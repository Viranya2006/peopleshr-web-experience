import { isWorkEmail, leadSchema } from "@/lib/lead";

// Stand-in for the CRM. On the real site this would create the lead in HubSpot/Salesforce
// and trigger the follow-up email; here it validates and logs.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = leadSchema.safeParse(body);

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      errors[key] ??= issue.message;
    }
    return Response.json({ ok: false, errors }, { status: 422 });
  }

  const lead = { ...parsed.data, workEmail: isWorkEmail(parsed.data.email), at: new Date().toISOString() };
  console.info("[lead]", JSON.stringify(lead));

  return Response.json({ ok: true });
}
