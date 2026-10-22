import Link from "next/link";
import type { ReactNode } from "react";
import type { Block, Guide } from "@/lib/guides/types";

// Turns "[text](/path)" and "**bold**" into elements. Anything else stays plain text.
export function Inline({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const [, label, href, bold] = match;
    parts.push(
      href ? (
        <Link key={match.index} href={href} className="font-semibold text-blue underline decoration-blue/30 underline-offset-2 hover:decoration-blue">
          {label}
        </Link>
      ) : (
        <strong key={match.index} className="font-semibold text-navy">
          {bold}
        </strong>
      ),
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

export function Blocks({ blocks, guide }: { blocks: Block[]; guide: Guide }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return (
              <p key={i}>
                <Inline text={block.text} />
              </p>
            );
          case "ul":
          case "ol": {
            const List = block.type;
            return (
              <List key={i} className={`space-y-2 pl-6 ${block.type === "ul" ? "list-disc" : "list-decimal"} marker:text-muted`}>
                {block.items.map((item) => (
                  <li key={item} className="pl-1">
                    <Inline text={item} />
                  </li>
                ))}
              </List>
            );
          }
          case "table":
            return (
              <div key={i} className="overflow-x-auto rounded-xl border border-line">
                <table className="w-full min-w-[480px] text-left text-[15px]">
                  <caption className="sr-only">{block.caption}</caption>
                  <thead className="bg-surface-2 text-sm text-navy">
                    <tr>
                      {block.head.map((h, j) => (
                        <th key={j} scope="col" className="px-4 py-2.5 font-semibold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {block.rows.map((row) => (
                      <tr key={row.join("|")}>
                        {row.map((cell, j) =>
                          j === 0 ? (
                            <th key={j} scope="row" className="px-4 py-2.5 font-medium text-navy">
                              {cell}
                            </th>
                          ) : (
                            <td key={j} className="num px-4 py-2.5">
                              {cell}
                            </td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "callout":
            return (
              <aside key={i} className="rounded-xl border-l-4 border-blue bg-blue-50 px-5 py-4">
                <p className="font-semibold text-navy">{block.title}</p>
                <p className="mt-1 text-[15px]">
                  <Inline text={block.text} />
                </p>
              </aside>
            );
          case "steps":
            return (
              <ol key={i} className="space-y-3">
                {guide.steps?.map((step, n) => (
                  <li key={step.name} id={`step-${n + 1}`} className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-3">
                    <span className="num flex size-9 items-center justify-center rounded-full border border-line-strong text-sm font-bold text-navy" aria-hidden="true">
                      {n + 1}
                    </span>
                    <div className="pt-1">
                      <h3 className="text-base font-bold">
                        <span className="sr-only">Step {n + 1}: </span>
                        {step.name}
                      </h3>
                      <p className="mt-0.5 text-[15px]">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            );
        }
      })}
    </>
  );
}
