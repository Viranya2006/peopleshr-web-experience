"use client";

import { useId } from "react";
import type { Task } from "@/lib/admin-cost/model";
import { LIMITS } from "@/lib/admin-cost/state";

type Props = {
  task: Task;
  enabled: boolean;
  hours: number;
  estimate: number;
  custom: boolean;
  onToggle: () => void;
  onHours: (hours: number | undefined) => void;
};

export function TaskRow({ task, enabled, hours, estimate, custom, onToggle, onHours }: Props) {
  const id = useId();

  return (
    <li className={`rounded-xl border p-4 transition-colors ${enabled ? "border-line bg-white" : "border-dashed border-line bg-surface"}`}>
      <div className="flex gap-3">
        <input
          id={`${id}-on`}
          type="checkbox"
          checked={enabled}
          onChange={onToggle}
          className="mt-1 size-[18px] shrink-0 accent-blue"
          aria-describedby={`${id}-detail`}
        />
        <div className="min-w-0 flex-1">
          <label htmlFor={`${id}-on`} className={`font-semibold ${enabled ? "text-navy" : "text-muted"}`}>
            {task.label}
          </label>
          <p id={`${id}-detail`} className="mt-0.5 text-sm text-muted">
            {task.detail}
          </p>

          {enabled && (
            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
              <div className="flex items-center rounded-lg border border-line-strong">
                <button
                  type="button"
                  onClick={() => onHours(Math.max(LIMITS.taskHours.min, Math.round(hours) - 1))}
                  className="h-9 w-9 rounded-l-lg text-lg text-navy hover:bg-surface-2"
                  aria-label={`One hour less for ${task.label.toLowerCase()}`}
                >
                  −
                </button>
                <label htmlFor={`${id}-h`} className="sr-only">
                  Hours a month on {task.label.toLowerCase()}
                </label>
                <input
                  id={`${id}-h`}
                  type="number"
                  inputMode="decimal"
                  min={LIMITS.taskHours.min}
                  max={LIMITS.taskHours.max}
                  step="any"
                  value={hours}
                  onChange={(e) => {
                    const n = Number(e.target.value);
                    if (e.target.value !== "" && Number.isFinite(n)) {
                      onHours(Math.min(LIMITS.taskHours.max, Math.max(LIMITS.taskHours.min, n)));
                    }
                  }}
                  className="num h-9 w-16 border-x border-line-strong text-center font-semibold text-navy focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue/40"
                />
                <button
                  type="button"
                  onClick={() => onHours(Math.min(LIMITS.taskHours.max, Math.round(hours) + 1))}
                  className="h-9 w-9 rounded-r-lg text-lg text-navy hover:bg-surface-2"
                  aria-label={`One hour more for ${task.label.toLowerCase()}`}
                >
                  +
                </button>
              </div>
              <span className="text-sm text-muted">hours a month</span>
              {custom ? (
                <button type="button" onClick={() => onHours(undefined)} className="btn-ghost text-sm font-medium">
                  Back to our estimate ({estimate} h)
                </button>
              ) : (
                <span className="text-xs text-muted">Our estimate for your headcount</span>
              )}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
