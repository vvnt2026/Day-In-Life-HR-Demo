import { useState } from "react";
import { Sparkles, ArrowRight, ShieldAlert, Users, TrendingUp, Brain, X, CheckCircle2, ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

const actions = [
  { t: "Compensation Review", d: "Run market correction for −14% AI Eng cohort (S$78K)", impact: "+18 retention pts", effort: "2 days", priority: "P0" },
  { t: "Manager Connect Plan", d: "VP Data + skip-level 1:1s with top 7 at-risk", impact: "Sentiment +9 pts", effort: "1 week", priority: "P0" },
  { t: "Internal Mobility Discussion", d: "Open GenAI architect track + lateral options", impact: "Career signal +12", effort: "10 days", priority: "P1" },
  { t: "Retention Bonus Proposal", d: "Targeted RSUs for critical 7 (cliff 12mo)", impact: "Attrition −31%", effort: "Finance gate", priority: "P0" },
  { t: "Workload Redistribution", d: "Rotate 2 engineers off on-call · contractor coverage", impact: "Burnout −22%", effort: "30 days", priority: "P1" },
];

const priTone: Record<string, string> = {
  P0: "bg-destructive/10 text-destructive",
  P1: "bg-warning/10 text-warning",
};

export function AiBanner() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Set<number>>(new Set([0, 1]));

  const toggle = (i: number) => {
    const next = new Set(selected);
    next.has(i) ? next.delete(i) : next.add(i);
    setSelected(next);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl gradient-primary text-primary-foreground p-5 shadow-elevated">
      <div className="absolute -top-20 -right-20 size-64 rounded-full bg-ai/30 blur-3xl" />
      <div className="absolute -bottom-16 -left-10 size-48 rounded-full bg-info/20 blur-3xl" />
      <div className="relative">
        <div className="flex flex-col lg:flex-row lg:items-start gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="size-10 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center shrink-0">
              <Sparkles className="size-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="text-[10px] uppercase tracking-wider font-semibold bg-white/20 px-2 py-0.5 rounded-full">AI Insight</span>
                <span className="inline-flex items-center gap-1 text-[10px] text-white/85">
                  <ShieldAlert className="size-3" /> AI Confidence 89%
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] text-white/85">
                  <Brain className="size-3" /> 7 signals
                </span>
              </div>
              <h2 className="text-base md:text-lg font-semibold leading-tight">Attrition Risk Rising in AI Engineering</h2>
              <p className="text-[12.5px] md:text-[13px] text-white/85 mt-1 leading-snug max-w-3xl">
                AI has detected increasing attrition probability across AI Engineering teams driven by compensation variance, workload imbalance, and reduced internal mobility opportunities.
              </p>
              <p className="text-[10.5px] text-white/65 mt-1.5">Sources: pulse surveys · 1:1 sentiment · market benchmarks · calendar load · exit data</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link to="/insights/attrition" className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium border border-white/20 transition-colors inline-flex items-center gap-1.5">
              Why this matters <ArrowRight className="size-3.5" />
            </Link>
            <button
              onClick={() => setOpen(true)}
              className="px-4 py-2 rounded-lg bg-white text-primary text-xs font-semibold inline-flex items-center gap-1.5 hover:bg-white/90 transition-colors shadow-md"
            >
              <Sparkles className="size-3.5" /> Add Actions
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mt-4">
          <div className="rounded-xl bg-white/10 backdrop-blur border border-white/10 p-3">
            <div className="text-[10px] uppercase tracking-wider opacity-75">Risk Score</div>
            <div className="text-xl font-semibold mt-0.5 flex items-baseline gap-1.5">82%<span className="text-[10px] font-normal text-white/70">High</span></div>
          </div>
          <Link to="/at-risk" className="rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur border border-white/10 p-3 transition-colors group">
            <div className="text-[10px] uppercase tracking-wider opacity-75 flex items-center gap-1"><Users className="size-2.5" /> Employees Impacted</div>
            <div className="text-xl font-semibold mt-0.5 flex items-baseline gap-1.5">7<ChevronRight className="size-3.5 opacity-0 group-hover:opacity-100 transition-opacity" /></div>
          </Link>
          <div className="rounded-xl bg-white/10 backdrop-blur border border-white/10 p-3">
            <div className="text-[10px] uppercase tracking-wider opacity-75 flex items-center gap-1"><TrendingUp className="size-2.5" /> Trend vs Q3</div>
            <div className="text-xl font-semibold mt-0.5">+12%</div>
          </div>
          <div className="rounded-xl bg-white/10 backdrop-blur border border-white/10 p-3">
            <div className="text-[10px] uppercase tracking-wider opacity-75">AI Confidence</div>
            <div className="text-xl font-semibold mt-0.5">89%</div>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div
            className="w-full max-w-2xl bg-surface text-foreground rounded-2xl border border-border shadow-elevated overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-4 gradient-primary text-primary-foreground flex items-center gap-2">
              <Sparkles className="size-4" />
              <div className="flex-1">
                <div className="text-[10px] uppercase tracking-wider opacity-80">Attrition Risk · AI Action Plan</div>
                <div className="text-sm font-semibold">Select actions to add to your retention play</div>
              </div>
              <button onClick={() => setOpen(false)} className="p-1 rounded-md hover:bg-white/15"><X className="size-4" /></button>
            </div>
            <div className="p-5 space-y-2 max-h-[60vh] overflow-auto">
              {actions.map((a, i) => {
                const checked = selected.has(i);
                return (
                  <button
                    key={a.t}
                    onClick={() => toggle(i)}
                    className={`w-full text-left flex items-start gap-3 p-3.5 rounded-xl border transition-all ${
                      checked ? "border-ai bg-ai/5" : "border-border hover:bg-muted/40"
                    }`}
                  >
                    <div className={`size-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${checked ? "bg-ai border-ai text-ai-foreground" : "border-border"}`}>
                      {checked && <CheckCircle2 className="size-3.5" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <div className="text-sm font-semibold">{a.t}</div>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded ${priTone[a.priority]}`}>{a.priority}</span>
                      </div>
                      <div className="text-[12px] text-muted-foreground leading-snug">{a.d}</div>
                      <div className="flex flex-wrap gap-3 mt-2 text-[10.5px] text-muted-foreground">
                        <span>Impact <strong className="text-success">{a.impact}</strong></span>
                        <span>Effort <strong className="text-foreground">{a.effort}</strong></span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="px-5 py-3 border-t border-border bg-muted/30 flex items-center justify-between">
              <div className="text-[11px] text-muted-foreground">{selected.size} of {actions.length} selected · est. cost S$118K · predicted attrition −41%</div>
              <button onClick={() => setOpen(false)} className="px-4 py-2 rounded-lg gradient-ai text-ai-foreground text-xs font-semibold inline-flex items-center gap-1.5">
                Add {selected.size} Actions <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
