"use client";

import { AREAS, QUESTIONS } from "@/lib/health-check/questions";

type Props = {
  step: number;
  answer: number | null;
  onAnswer: (value: number) => void;
  onBack: () => void;
  onNext: () => void;
};

export function QuestionStep({ step, answer, onAnswer, onBack, onNext }: Props) {
  const question = QUESTIONS[step];
  const area = AREAS.find((a) => a.id === question.area)!;
  const last = step === QUESTIONS.length - 1;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (answer !== null) onNext();
      }}
      className="mx-auto max-w-3xl"
    >
      <Progress step={step} />

      <fieldset className="mt-8">
        <legend className="w-full">
          <span className="text-sm font-semibold text-blue">{area.name}</span>
          <span data-step-heading tabIndex={-1} className="mt-2 block text-2xl font-bold text-navy outline-none sm:text-3xl">
            {question.text}
          </span>
        </legend>
        <p className="mt-2 text-sm text-muted">Pick the one closest to a normal month, not your best one.</p>

        <div className="mt-6 grid gap-3">
          {question.options.map((option, i) => {
            const checked = answer === i;
            return (
              <label
                key={option}
                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-blue ${
                  checked ? "border-blue bg-blue-50" : "border-line bg-white hover:border-line-strong"
                }`}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={i}
                  checked={checked}
                  onChange={() => onAnswer(i)}
                  className="mt-0.5 size-[18px] shrink-0 accent-blue focus-visible:outline-none"
                />
                <span className={checked ? "font-semibold text-navy" : "text-navy"}>{option}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-8 flex items-center justify-between gap-4">
        <button type="button" onClick={onBack} className="btn btn-secondary">
          Back
        </button>
        <button type="submit" className="btn btn-primary px-6" disabled={answer === null}>
          {last ? "See my results" : "Next question"}
        </button>
      </div>
    </form>
  );
}

function Progress({ step }: { step: number }) {
  return (
    <div>
      <p className="text-sm text-muted">
        Question <span className="num font-semibold text-navy">{step + 1}</span> of {QUESTIONS.length}
      </p>
      <ol className="mt-2 grid grid-cols-6 gap-[2px]" aria-hidden="true">
        {AREAS.map((area) => {
          const indexes = QUESTIONS.flatMap((q, i) => (q.area === area.id ? [i] : []));
          const done = indexes.filter((i) => i < step).length;
          const current = indexes.includes(step);
          return (
            <li key={area.id}>
              <span className="flex gap-[2px]">
                {indexes.map((i, n) => (
                  <span
                    key={i}
                    className={`h-1.5 flex-1 ${n === 0 ? "rounded-l-full" : ""} ${n === indexes.length - 1 ? "rounded-r-full" : ""} ${
                      n < done ? "bg-blue" : i === step ? "bg-blue/50" : "bg-line"
                    }`}
                  />
                ))}
              </span>
              <span className={`mt-1.5 hidden text-[11px] sm:block ${current ? "font-semibold text-navy" : "text-muted"}`}>{area.name}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
