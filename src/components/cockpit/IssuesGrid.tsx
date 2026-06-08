import { TrendingUp, TrendingDown, ArrowRight, Brain } from "lucide-react";

const issues = [
  {
    title: "Rising attrition · Data Engineering",
    delta: "+3.2pp QoQ",
    trend: "up" as const,
    cause: "Compensation variance vs market (−14%) + 3 senior exits creating workload spike.",
    confidence: 92,
    actions: ["Market correction review", "Retention bonus pool", "Skip-level 1:1s"],
  },
  {
    title: "Low onboarding satisfaction",
    delta: "Day-30: 58/100",
    trend: "down" as const,
    cause: "Buddy assignment delayed >7 days · unclear role expectations in first 14 days.",
    confidence: 88,
    actions: ["Assign onboarding buddies", "Manager 30/60/90 prompt"],
  },
  {
    title: "Reduced engagement · QA",
    delta: "−6 pts MoM",
    trend: "down" as const,
    cause: "Repetitive workload signals + limited learning hours logged in last quarter.",
    confidence: 84,
    actions: ["Pulse survey", "Automation training cohort"],
  },
  {
    title: "Internal mobility stagnation",
    delta: "Fulfillment 42%",
    trend: "down" as const,
    cause: "Open roles not surfaced to qualified internal candidates · skills graph stale.",
    confidence: 79,
    actions: ["Refresh skills graph", "Internal slate first"],
  },
];

export function IssuesGrid() {
  return (
    <div className="bg-surface rounded-2xl border border-border shadow-card">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-ai font-semibold">Workforce Intelligence</div>
          <h3 className="text-base font-semibold">Span-of-Control Issues & AI Solutions</h3>
        </div>
        <button className="text-xs text-ai hover:underline">View all 9 issues</button>
      </div>
      <div className="grid sm:grid-cols-2 gap-px bg-border">
        {issues.map((it, i) => {
          const TrendIcon = it.trend === "up" ? TrendingUp : TrendingDown;
          const trendCls = it.trend === "up" ? "text-destructive" : "text-warning";
          return (
            <div key={i} className="bg-surface p-4 hover:bg-muted/30 transition-colors">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h4 className="text-sm font-semibold leading-snug">{it.title}</h4>
                <span className={`inline-flex items-center gap-0.5 text-[11px] font-medium ${trendCls}`}>
                  <TrendIcon className="size-3" />
                  {it.delta}
                </span>
              </div>
              <div className="flex items-start gap-1.5 mb-3">
                <Brain className="size-3 text-ai mt-0.5 shrink-0" />
                <p className="text-[12px] text-muted-foreground leading-snug">{it.cause}</p>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full gradient-ai" style={{ width: `${it.confidence}%` }} />
                </div>
                <span className="text-[10px] text-muted-foreground font-medium">{it.confidence}% conf.</span>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {it.actions.map((a) => (
                  <span key={a} className="text-[10px] px-2 py-0.5 rounded-md bg-accent text-accent-foreground">{a}</span>
                ))}
              </div>
              <button className="w-full text-xs font-medium py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 inline-flex items-center justify-center gap-1.5">
                Initiate Action <ArrowRight className="size-3" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
