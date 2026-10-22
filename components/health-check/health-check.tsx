"use client";

import { useEffect, useRef, useState } from "react";
import { QUESTIONS } from "@/lib/health-check/questions";
import { evaluate, type Answers, type Profile } from "@/lib/health-check/scoring";
import { decodeResult, encodeResult } from "@/lib/health-check/share";
import { track } from "@/lib/track";
import { Intro } from "./intro";
import { QuestionStep } from "./question-step";
import { Results } from "./results";

const STORAGE_KEY = "phr-health-check";

type Saved = { profile: Profile; answers: Answers; step: number };

type View = { kind: "intro" } | { kind: "question"; step: number } | { kind: "result" };

const emptyAnswers = (): Answers => QUESTIONS.map(() => null);

export function HealthCheck() {
  const [view, setView] = useState<View>({ kind: "intro" });
  const [profile, setProfile] = useState<Profile | null>(null);
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [resumable, setResumable] = useState<Saved | null>(null);
  const [shared, setShared] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  // A shared result link opens straight on the result; otherwise offer to resume saved progress.
  useEffect(() => {
    const fromLink = decodeResult(window.location.hash);
    /* eslint-disable react-hooks/set-state-in-effect -- the hash and localStorage only exist in the browser */
    if (fromLink) {
      setProfile(fromLink.profile);
      setAnswers(fromLink.answers);
      setShared(true);
      setView({ kind: "result" });
      return;
    }
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null") as Saved | null;
      if (saved?.profile && saved.answers?.length === QUESTIONS.length) setResumable(saved);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  function go(next: View) {
    setView(next);
    // Each step replaces the content, so move the reader (and screen reader focus) back to the top of the tool.
    requestAnimationFrame(() => {
      topRef.current?.scrollIntoView({ block: "start" });
      topRef.current?.querySelector<HTMLElement>("[data-step-heading]")?.focus({ preventScroll: true });
    });
  }

  function save(next: Partial<Saved>) {
    if (!profile && !next.profile) return;
    const data: Saved = { profile: next.profile ?? profile!, answers: next.answers ?? answers, step: next.step ?? 0 };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function start(p: Profile) {
    setProfile(p);
    setAnswers(emptyAnswers());
    save({ profile: p, answers: emptyAnswers(), step: 0 });
    track("tool_start", { tool: "health-check", size: p.size, industry: p.industry, role: p.role });
    go({ kind: "question", step: 0 });
  }

  function resume(saved: Saved) {
    setProfile(saved.profile);
    setAnswers(saved.answers);
    go({ kind: "question", step: Math.min(saved.step, QUESTIONS.length - 1) });
  }

  function answer(step: number, value: number) {
    const next = [...answers];
    next[step] = value;
    setAnswers(next);
    save({ answers: next, step });
  }

  function advance(step: number) {
    track("step_complete", { tool: "health-check", step: step + 1 });
    if (step < QUESTIONS.length - 1) {
      save({ step: step + 1 });
      go({ kind: "question", step: step + 1 });
      return;
    }
    finish();
  }

  function finish() {
    if (!profile) return;
    const outcome = evaluate(answers, profile);
    window.history.replaceState(null, "", `#${encodeResult(answers, profile)}`);
    localStorage.removeItem(STORAGE_KEY);
    track("result_view", { tool: "health-check", stage: outcome.stage.name, overall: outcome.overall });
    go({ kind: "result" });
  }

  function restart() {
    window.history.replaceState(null, "", window.location.pathname);
    localStorage.removeItem(STORAGE_KEY);
    setAnswers(emptyAnswers());
    setResumable(null);
    setShared(false);
    go({ kind: "intro" });
  }

  return (
    <div ref={topRef} className="scroll-mt-24">
      {view.kind === "intro" && (
        <Intro onStart={start} resumable={resumable} onResume={resume} />
      )}
      {view.kind === "question" && profile && (
        <QuestionStep
          step={view.step}
          answer={answers[view.step]}
          onAnswer={(v) => answer(view.step, v)}
          onBack={() => (view.step === 0 ? go({ kind: "intro" }) : go({ kind: "question", step: view.step - 1 }))}
          onNext={() => advance(view.step)}
        />
      )}
      {view.kind === "result" && profile && (
        <Results outcome={evaluate(answers, profile)} profile={profile} shared={shared} onRestart={restart} />
      )}
    </div>
  );
}
