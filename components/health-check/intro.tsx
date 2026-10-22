"use client";

import { useState } from "react";
import { INDUSTRIES, QUESTIONS, ROLES, SIZE_BANDS, type Industry, type Role, type SizeBand } from "@/lib/health-check/questions";
import type { Answers, Profile } from "@/lib/health-check/scoring";

type Props = {
  onStart: (p: Profile) => void;
  resumable: { profile: Profile; answers: Answers; step: number } | null;
  onResume: (saved: { profile: Profile; answers: Answers; step: number }) => void;
};

export function Intro({ onStart, resumable, onResume }: Props) {
  const [size, setSize] = useState<SizeBand | "">("");
  const [industry, setIndustry] = useState<Industry | "">("");
  const [role, setRole] = useState<Role | "">("");
  const [tried, setTried] = useState(false);
  const ready = size && industry && role;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setTried(true);
    if (size && industry && role) onStart({ size, industry, role });
  }

  const answered = resumable?.answers.filter((a) => a !== null).length ?? 0;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
      <form onSubmit={submit} className="rounded-[var(--radius-card)] border border-line bg-white p-5 sm:p-7" noValidate>
        <h2 data-step-heading tabIndex={-1} className="text-2xl font-bold outline-none">
          First, three things about you
        </h2>
        <p className="mt-1 text-sm text-muted">So the priorities fit a business like yours.</p>

        <fieldset className="mt-6">
          <legend className="field-label">How many people work for you?</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {SIZE_BANDS.map((s) => (
              <Pill key={s.id} name="size" value={s.id} label={s.label} checked={size === s.id} onChange={() => setSize(s.id)} />
            ))}
          </div>
          {tried && !size && <FieldError>Pick a size band.</FieldError>}
        </fieldset>

        <div className="mt-6">
          <label htmlFor="industry" className="field-label">
            Industry
          </label>
          <select
            id="industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value as Industry)}
            className="field-input sm:max-w-sm"
            aria-invalid={tried && !industry ? true : undefined}
          >
            <option value="" disabled>
              Choose one
            </option>
            {INDUSTRIES.map((i) => (
              <option key={i.id} value={i.id}>
                {i.label}
              </option>
            ))}
          </select>
          {tried && !industry && <FieldError>Choose your industry.</FieldError>}
        </div>

        <fieldset className="mt-6">
          <legend className="field-label">Your role</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {ROLES.map((r) => (
              <Pill key={r.id} name="role" value={r.id} label={r.label} checked={role === r.id} onChange={() => setRole(r.id)} />
            ))}
          </div>
          {tried && !role && <FieldError>Pick the closest role.</FieldError>}
        </fieldset>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button type="submit" className="btn btn-primary px-6 py-3 text-base" aria-disabled={!ready}>
            Start the check
          </button>
          <span className="text-sm text-muted">{QUESTIONS.length} questions · about 4 minutes</span>
        </div>
      </form>

      <aside className="space-y-4">
        {resumable && (
          <div className="rounded-[var(--radius-card)] border border-blue/30 bg-blue-50 p-5">
            <p className="font-semibold text-navy">You were part way through</p>
            <p className="mt-1 text-sm">
              {answered} of {QUESTIONS.length} questions answered on this device.
            </p>
            <button type="button" onClick={() => onResume(resumable)} className="btn btn-primary mt-3">
              Carry on
            </button>
          </div>
        )}
        <div className="rounded-[var(--radius-card)] bg-surface p-5 text-sm">
          <p className="font-semibold text-navy">What you&apos;ll get</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            <li>Where you stand across six HR areas</li>
            <li>Your three priorities, ranked for your industry and size</li>
            <li>One thing to do about each one this month, with or without new software</li>
          </ul>
          <p className="mt-3 text-muted">
            Your result appears on screen. No email needed. Answers stay in this browser.
          </p>
        </div>
      </aside>
    </div>
  );
}

function Pill({ name, value, label, checked, onChange }: { name: string; value: string; label: string; checked: boolean; onChange: () => void }) {
  return (
    <label
      className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-blue ${
        checked ? "border-blue bg-blue text-white" : "border-line-strong bg-white text-navy hover:border-navy"
      }`}
    >
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
      {label}
    </label>
  );
}

function FieldError({ children }: { children: React.ReactNode }) {
  return <p className="mt-1.5 text-sm text-red-700">{children}</p>;
}
