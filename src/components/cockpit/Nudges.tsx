import { AlertTriangle, Clock, Flame, ChevronRight, Zap } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface Nudge {
  severity: "high" | "med";
  icon: typeof AlertTriangle;
  title: string;
  meta: string;
  cta: string;
}

const nudges: Nudge[] = [
  { severity: "high", icon: Flame, title: "Critical AI engineer at retention risk", meta: "Rahul Sharma · 89% flight risk", cta: "Start workflow" },
  { severity: "high", icon: AlertTriangle, title: "3 hiring decisions pending > 5 days", meta: "Data Eng · Risk · Platform", cta: "Decide" },
  { severity: "high", icon: AlertTriangle, title: "4 employees below market benchmark", meta: "Variance −8% to −16%", cta: "Review" },
  { severity: "high", icon: Clock, title: "2 onboarding journeys at risk", meta: "Day-30 satisfaction < 60", cta: "Intervene" },
  { severity: "med", icon: Clock, title: "6 overdue learning certifications", meta: "Compliance window: 14d", cta: "Nudge" },
  { severity: "med", icon: Zap, title: "2 high workload teams detected", meta: "Avg 52h/wk · 3wks running", cta: "Rebalance" },
];

const sevToken = {
  high: "bg-destructive/10 text-destructive border-destructive/20",
  med: "bg-warning/10 text-warning border-warning/20",
};

export function Nudges() {
  return (
    <div className="bg-surface rounded-2xl border border-border shadow-card overflow-hidden">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-ai font-semibold">AI Priorities</div>
          <h3 className="text-sm font-semibold">What needs your attention today</h3>
        </div>
        <Link to="/attention" className="text-[11px] text-ai hover:underline">View all</Link>
      </div>
      <div className="divide-y divide-border max-h-[420px] overflow-auto">
        {nudges.map((n, i) => (
          <Link key={i} to="/attention" search={{ id: i }} className="block w-full text-left px-4 py-3 hover:bg-muted/50 transition-colors group">
            <div className="flex items-start gap-3">
              <div className={`size-8 rounded-lg border flex items-center justify-center shrink-0 ${sevToken[n.severity]}`}>
                <n.icon className="size-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium leading-snug">{n.title}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{n.meta}</div>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-ai font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                {n.cta} <ChevronRight className="size-3" />
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="px-4 py-3 border-t border-border bg-muted/30">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">AI Suggested Actions</div>
        <div className="space-y-2">
          {[
            { issue: "Compensation variance", rec: "Run market correction" },
            { issue: "Low onboarding sat.", rec: "Assign onboarding buddy" },
            { issue: "Burnout signals (QA)", rec: "Workload intervention" },
          ].map((r, i) => (
            <div key={i} className="flex items-center gap-2 text-[11px]">
              <span className="size-1 rounded-full bg-ai" />
              <span className="text-muted-foreground">{r.issue}</span>
              <ChevronRight className="size-3 text-muted-foreground" />
              <span className="font-medium">{r.rec}</span>
              <button className="ml-auto text-ai hover:underline">Add Actions</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
