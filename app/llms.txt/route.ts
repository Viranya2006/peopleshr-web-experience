import { GUIDES } from "@/lib/guides";
import { absoluteUrl } from "@/lib/seo";
import { PROOF, TOOLS } from "@/lib/site";

// llms.txt (llmstxt.org): a plain-text map of the site for AI assistants, with each
// guide's short answer so the answer can be quoted with a link back.
export function GET() {
  const lines = [
    "# PeoplesHR tools and guides",
    "",
    `> PeoplesHR is HR and payroll software used by ${PROOF.companies} organisations in ${PROOF.countries} countries across APAC, the Middle East and Africa. These pages help businesses cost their HR admin, find which HR process to fix first, and answer common payroll questions.`,
    "",
    "## Tools",
    ...TOOLS.filter((t) => t.href !== "/guides").map((t) => `- [${t.name}](${absoluteUrl(t.href)}): ${t.pitch}`),
    "",
    "## Guides",
    ...GUIDES.map((g) => `- [${g.title}](${absoluteUrl(`/guides/${g.slug}`)}): ${g.shortAnswer}`),
    "",
    "## Optional",
    `- [Request a demo](${absoluteUrl("/request-demo")})`,
    "- [PeoplesHR packages](https://www.peopleshr.com/pricing/)",
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
