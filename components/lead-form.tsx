"use client";

import { useId, useRef, useState } from "react";
import type { Lead } from "@/lib/lead";
import { track } from "@/lib/track";

type ExtraField = "name" | "company" | "phone";

const FIELD_META: Record<ExtraField, { label: string; autoComplete: string; type: string; required: boolean }> = {
  name: { label: "Your name", autoComplete: "name", type: "text", required: true },
  company: { label: "Company", autoComplete: "organization", type: "text", required: true },
  phone: { label: "Phone (optional)", autoComplete: "tel", type: "tel", required: false },
};

type Props = {
  source: Lead["source"];
  intent: Lead["intent"];
  fields?: ExtraField[];
  context?: Lead["context"];
  submitLabel: string;
  successTitle: string;
  successBody: string;
  note?: string;
  compact?: boolean;
};

export function LeadForm({
  source,
  intent,
  fields = [],
  context,
  submitLabel,
  successTitle,
  successBody,
  note = "One email with what you asked for. No newsletter unless you opt in later.",
  compact = false,
}: Props) {
  const id = useId();
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "failed">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const doneRef = useRef<HTMLDivElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const payload = Object.fromEntries(Object.entries(data).filter(([, v]) => v.trim() !== ""));
    // Which guide or tool sent the visitor here, so sales knows what they were reading.
    const from = new URLSearchParams(window.location.search).get("from");

    setStatus("sending");
    setErrors({});
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, source, intent, context: from ? { ...context, from } : context }),
      });
      const json = await res.json();
      if (!json.ok) {
        setErrors(json.errors ?? {});
        setStatus("idle");
        return;
      }
      track("lead_submit", { source, intent });
      setStatus("done");
      requestAnimationFrame(() => doneRef.current?.focus());
    } catch {
      setStatus("failed");
    }
  }

  if (status === "done") {
    return (
      <div
        ref={doneRef}
        tabIndex={-1}
        role="status"
        className="rounded-xl border border-positive/30 bg-positive-50 p-4 outline-none"
      >
        <p className="font-semibold text-navy">{successTitle}</p>
        <p className="mt-1 text-sm">{successBody}</p>
      </div>
    );
  }

  const inputs: { name: string; label: string; type: string; autoComplete: string; required: boolean }[] = [
    ...fields.map((f) => ({ name: f, ...FIELD_META[f] })),
    { name: "email", label: "Work email", type: "email", autoComplete: "email", required: true },
  ];

  // With two extra fields the email gets its own full-width row.
  const emailFullWidth = fields.length === 2;

  return (
    <form onSubmit={onSubmit} className={compact ? "space-y-3" : "space-y-4"}>
      <div className={fields.length > 0 ? "grid gap-3 sm:grid-cols-2" : "grid gap-3"}>
        {inputs.map((input) => {
          const inputId = `${id}-${input.name}`;
          const error = errors[input.name];
          return (
            <div key={input.name} className={input.name === "email" && emailFullWidth ? "sm:col-span-2" : undefined}>
              <label htmlFor={inputId} className="field-label">
                {input.label}
              </label>
              <input
                id={inputId}
                name={input.name}
                type={input.type}
                autoComplete={input.autoComplete}
                required={input.required}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${inputId}-error` : undefined}
                className="field-input"
              />
              {error && (
                <p id={`${inputId}-error`} className="mt-1 text-sm text-red-700">
                  {error}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : submitLabel}
        </button>
        <p className="text-xs text-muted">{note}</p>
      </div>

      {status === "failed" && (
        <p role="alert" className="text-sm text-red-700">
          That didn&apos;t go through. Check your connection and try again.
        </p>
      )}
    </form>
  );
}
