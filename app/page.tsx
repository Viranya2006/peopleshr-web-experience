import Link from "next/link";
import { PROOF, TOOLS } from "@/lib/site";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <section className="pb-12 pt-14 sm:pt-20">
        <p className="eyebrow">PeoplesHR tools</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-[56px] sm:leading-[1.05]">
          Work out what to fix in HR before you talk to anyone.
        </h1>
        <p className="mt-5 max-w-2xl text-lg">
          Not every visitor is ready for a demo. These three tools give a useful answer first: a cost, a priority list,
          or a straight answer to a payroll question. Then they offer a sensible next step.
        </p>
      </section>

      <ol className="divide-y divide-line border-y border-line">
        {TOOLS.map((tool) => (
          <li key={tool.href}>
            <Link
              href={tool.href}
              className="group grid gap-x-8 gap-y-2 py-8 sm:grid-cols-[120px_minmax(0,1fr)_auto] sm:items-center"
            >
              <span className="num whitespace-nowrap text-sm font-bold text-blue">Challenge {tool.challenge}</span>
              <span>
                <span className="block text-2xl font-bold text-navy group-hover:text-blue">{tool.name}</span>
                <span className="mt-1 block max-w-2xl">{tool.pitch}</span>
                <span className="mt-2 block text-sm text-muted">Problem: {tool.problem}</span>
              </span>
              <span className="text-sm font-semibold text-blue" aria-hidden="true">
                Open →
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <p className="mt-10 text-sm text-muted">
        Built for the PeoplesHR website: {PROOF.companies} companies, {PROOF.countries} countries,{" "}
        {PROOF.users} users.
      </p>
    </div>
  );
}
