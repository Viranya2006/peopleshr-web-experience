"use client";

import { useId, useState } from "react";

type Props = {
  label: string;
  hint?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  // The slider can stop short of the real maximum (headcount runs to 5,000 but a
  // 10–2,000 slider is easier to use); the number box accepts the full range.
  sliderMax?: number;
  unit?: string;
  onChange: (value: number) => void;
};

export function SliderField({ label, hint, value, min, max, step, sliderMax, unit, onChange }: Props) {
  const id = useId();
  // The number box keeps its own text so a half-typed value ("1" on the way to "120") isn't clamped mid-typing.
  const [draft, setDraft] = useState(String(value));
  const [synced, setSynced] = useState(value);
  if (synced !== value) {
    setSynced(value);
    setDraft(String(value));
  }

  function commit(raw: string) {
    const n = Number(raw);
    if (raw.trim() === "" || !Number.isFinite(n)) {
      setDraft(String(value));
      return;
    }
    const clamped = Math.min(max, Math.max(min, n));
    onChange(clamped);
    setDraft(String(clamped));
  }

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={`${id}-n`} className="field-label mb-0">
          {label}
        </label>
        <span className="flex items-center gap-1.5">
          <input
            id={`${id}-n`}
            type="number"
            inputMode="decimal"
            min={min}
            max={max}
            step={step}
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value);
              const n = Number(e.target.value);
              if (e.target.value !== "" && n >= min && n <= max) onChange(n);
            }}
            onBlur={(e) => commit(e.target.value)}
            aria-describedby={hint ? `${id}-hint` : undefined}
            className="num w-24 rounded-md border border-line-strong bg-white px-2 py-1 text-right text-[15px] font-semibold text-navy focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/25"
          />
          {unit && <span className="text-sm text-muted">{unit}</span>}
        </span>
      </div>
      <input
        type="range"
        aria-label={`${label} slider`}
        min={min}
        max={sliderMax ?? max}
        step={step}
        value={Math.min(value, sliderMax ?? max)}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-blue"
      />
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-xs text-muted">
          {hint}
        </p>
      )}
    </div>
  );
}
