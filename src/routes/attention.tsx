import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { AlertTriangle, Clock, Flame, Zap, ChevronRight, Brain, CheckCircle2 } from "lucide-react";
import { DrilldownPage, Section } from "@/components/cockpit/DrilldownPage";

const items = [
  { id: 0, severity: "high", icon: Flame, title: "Critical AI engineer at retention risk", who: "Rahul Sharma · Sr Data Eng", risk: "89% flight risk",
    cause: "Comp variance −14% vs market · workload 52h/wk · skipped 2 promotion cycles.",
    actions: ["Schedule retention 1:1 within 48h", "Pre-approve 12% comp correction", "Offer GenAI architect track + mentorship"], confidence: 92 },
  { id: 1, severity: "high", icon: AlertTriangle, title: "3 hiring decisions pending > 5 days", who: "Data Eng · Risk · Platform", risk: "S$320K opportunity cost",
    cause: "Hiring manager feedback delayed · panel saturation in AI Eng.",
    actions: ["Auto-nudge managers", "Add 2 panel interviewers", "Escalate to VP Engineering"], confidence: 88 },
  { id: 2, severity: "high", icon: AlertTriangle, title: "4 employees below market benchmark", who: "Variance −8% to −16%", risk: "Predicted +21% attrition",
    cause: "Compensation drift since last review · all in critical Data/AI roles.",
    actions: ["Run market correction (S$78K)", "Communicate adjustments in 14 days"], confidence: 90 },
  { id: 3, severity: "high", icon: Clock, title: "2 onboarding journeys at risk", who: "Day-30 satisfaction < 60", risk: "Likely early exits",
    cause: "Buddy assignment delayed · documentation incomplete.",
    actions: ["Assign buddies today", "Trigger 30-day check-in", "Manager 60/90 prompts"], confidence: 84 },
  { id: 4, severity: "med", icon: Clock, title: "6 overdue learning certifications", who: "Compliance window: 14d", risk: "PDPA exposure",
    cause: "Mandatory training auto-reminders disabled in Q4.",
    actions: ["Bulk nudge", "Block external sharing until complete"], confidence: 80 },
  { id: 5, severity: "med", icon: Zap, title: "2 high workload teams detected", who: "Avg 52h/wk · 3wks running", risk: "Burnout signals",
    cause: "Senior exits + unfilled reqs creating compounding load.",
    actions: ["Workload rebalance", "Temporary contractor coverage", "Skip-level pulse"], confidence: 78 },
];

const sevToken: Record<string, string> = {
  high: "bg-destructive/10 text-destructive border-destructive/20",
  med: "bg-warning/10 text-warning border-warning/20",
};

export const Route = createFileRoute("/attention")({
  validateSearch: z.object({ id: z.coerce.number().optional() }),
  component: AttentionPage,
  head: () => ({ meta: [{ title: "AI Priorities — AI HR Cockpit" }] }),
});

function AttentionPage() {
  const { id } = Route.useSearch();
  const focused = id !== undefined ? items.find((i) => i.id === id) : items[0];

  return (
    <DrilldownPage
      eyebrow="AI Priorities"
      title="What needs your attention today"
      subtitle="12 priorities ranked by business impact, SLA proximity and AI confidence."
      insight="Resolving the top 4 items today reduces predicted Q1 attrition cost by S$420K and clears 78% of SLA breaches."
      confidence={91}
    >
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-1 bg-surface rounded-2xl border border-border shadow-card overflow-hidden self-start">
          <div className="px-4 py-3 border-b border-border text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">
            Priority queue
          </div>
          <div className="divide-y divide-border max-h-[640px] overflow-auto">
            {items.map((n) => {
              const active = focused?.id === n.id;
              return (
                <Link key={n.id} to="/attention" search={{ id: n.id }} className={`block px-4 py-3 hover:bg-muted/50 transition-colors ${active ? "bg-accent/40" : ""}`}>
                  <div className="flex items-start gap-2.5">
                    <div className={`size-8 rounded-lg border flex items-center justify-center shrink-0 ${sevToken[n.severity]}`}>
                      <n.icon className="size-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[12.5px] font-medium leading-snug">{n.title}</div>
                      <div className="text-[10.5px] text-muted-foreground mt-0.5">{n.who}</div>
                    </div>
                    <ChevronRight className="size-3 text-muted-foreground" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-5">
          {focused && (
            <>
              <Section eyebrow={focused.severity === "high" ? "High priority" : "Medium priority"} title={focused.title}>
                <div className="grid sm:grid-cols-3 gap-3 mb-4">
                  <div className="rounded-xl bg-muted/40 p-3">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Subject</div>
                    <div className="text-sm font-semibold mt-1">{focused.who}</div>
                  </div>
                  <div className="rounded-xl bg-destructive/5 border border-destructive/20 p-3">
                    <div className="text-[10px] uppercase tracking-wider text-destructive">Risk</div>
                    <div className="text-sm font-semibold mt-1">{focused.risk}</div>
                  </div>
                  <div className="rounded-xl bg-ai/5 border border-ai/20 p-3">
                    <div className="text-[10px] uppercase tracking-wider text-ai">AI confidence</div>
                    <div className="text-sm font-semibold mt-1">{focused.confidence}%</div>
                  </div>
                </div>
                <div className="rounded-xl bg-surface border border-border p-4">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Brain className="size-3.5 text-ai" />
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-ai">Root cause</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-snug">{focused.cause}</p>
                </div>
              </Section>

              <Section eyebrow="Recommended workflow" title="AI Action Plan">
                <ol className="space-y-2">
                  {focused.actions.map((a, i) => (
                    <li key={a} className="flex items-start gap-3 p-3 rounded-xl border border-border hover:bg-muted/40">
                      <span className="size-6 rounded-full bg-ai/10 text-ai text-[11px] font-semibold flex items-center justify-center shrink-0">{i + 1}</span>
                      <div className="flex-1 text-sm">{a}</div>
                      <button className="text-[11px] px-3 py-1.5 rounded-md bg-primary text-primary-foreground inline-flex items-center gap-1">
                        <CheckCircle2 className="size-3" /> Add Actions
                      </button>
                    </li>
                  ))}
                </ol>
              </Section>

              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  ["Predicted impact", "+8 retention pts"],
                  ["Effort", "~45 min HR time"],
                  ["Cost", "S$12K"],
                ].map(([l, v]) => (
                  <div key={l} className="rounded-xl bg-surface border border-border p-4">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{l}</div>
                    <div className="text-base font-semibold mt-1">{v}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </DrilldownPage>
  );
}
