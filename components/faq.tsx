export function Faq({ title, faqs }: { title: string; faqs: { q: string; a: string }[] }) {
  return (
    <section aria-labelledby="faq-title" className="mt-16">
      <h2 id="faq-title" className="text-2xl font-bold">
        {title}
      </h2>
      <div className="mt-4 divide-y divide-line border-y border-line">
        {faqs.map((f) => (
          <details key={f.q} className="group py-4">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-navy [&::-webkit-details-marker]:hidden">
              <h3 className="text-base">{f.q}</h3>
              <span aria-hidden="true" className="mt-0.5 text-lg leading-none transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-2 text-[15px] leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
