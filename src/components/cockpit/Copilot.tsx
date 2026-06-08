import { CheckCircle2, Calendar, DollarSign, FileCheck, UserPlus, Heart, Compass } from "lucide-react";
import { AskAI, type AskQA } from "./AskAI";
import { Link } from "@tanstack/react-router";

const qa: AskQA[] = [
  {
    q: "Why is attrition rising in Data Engineering?",
    a: "Attrition in Data Engineering rose 3.2pp QoQ. Primary drivers: compensation variance −14% vs Singapore market median, 3 senior exits creating workload spikes (avg 52h/wk for 3 weeks), and stagnant career paths (no promotions in 8 months). Recommend market correction + retention bonus pool + skip-level 1:1s.",
    meta: ["pulse signals", "market data", "calendar load", "comp benchmarks"],
  },
  {
    q: "Who are my top retention risks?",
    a: "7 high-risk employees identified. Top 3: Rahul Sharma (Sr Data Eng, 89% flight risk · comp gap), Priya N. (AI Architect, 76% · workload), Jason T. (QA Lead, 71% · career stagnation). Combined replacement cost ≈ S$420K. Suggested: targeted retention conversations within 14 days.",
    meta: ["sentiment", "tenure", "comp", "1:1 cadence"],
  },
  {
    q: "Suggest engagement actions for QA",
    a: "QA engagement is −6 pts MoM driven by repetitive workload and limited learning hours (4h/qtr vs 12h target). Recommended: launch automation-engineering cohort (8 wks), rotate 2 engineers into platform team, run monthly innovation Friday. Predicted lift: +9 pts in 60 days.",
    meta: ["learning logs", "workload", "pulse"],
  },
  {
    q: "Summarize compensation anomalies",
    a: "4 employees below market band (variance −8% to −16%) — all in Data/AI Engineering. 2 employees above 90th percentile in non-critical roles. Estimated correction budget: S$78K. Running this play reduces predicted attrition by 31%.",
    meta: ["market median", "internal equity", "performance"],
  },
];

const quickActions = [
  { icon: Calendar, label: "1:1", to: "/one-on-one/rahul-sharma" as const },
  { icon: Heart, label: "Pulse", to: "/engagement" as const },
  { icon: CheckCircle2, label: "Leave", to: "/attention" as const },
  { icon: UserPlus, label: "Hire", to: "/hiring" as const },
  { icon: DollarSign, label: "Comp", to: "/performance" as const },
  { icon: Compass, label: "Succession", to: "/succession" as const },
];

const approvals = [
  { type: "Leave", count: 6, sla: "2h", tone: "warning" },
  { type: "Recruitment", count: 3, sla: "1d", tone: "info" },
  { type: "Transfer", count: 2, sla: "3d", tone: "info" },
  { type: "Exit", count: 1, sla: "Today", tone: "destructive" },
];

const slaTone: Record<string, string> = {
  warning: "text-warning",
  info: "text-info",
  destructive: "text-destructive",
};

export function Copilot() {
  return (
    <div className="space-y-4">
      <AskAI title="Ask HR AI" eyebrow="HR Copilot" items={qa} />

      <div className="bg-surface rounded-2xl border border-border shadow-card p-4">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2.5">Quick Actions</div>
        <div className="grid grid-cols-3 gap-1.5">
          {quickActions.map((a) => (
            <Link key={a.label} to={a.to} className="flex flex-col items-center gap-1 py-2.5 rounded-lg bg-muted/50 hover:bg-accent hover:text-accent-foreground transition-colors">
              <a.icon className="size-4 text-ai" />
              <span className="text-[10px] font-medium">{a.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-surface rounded-2xl border border-border shadow-card overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <div className="text-sm font-semibold flex items-center gap-2">
            <FileCheck className="size-4 text-ai" /> Pending Approvals
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-destructive/10 text-destructive">12</span>
        </div>
        <div className="divide-y divide-border">
          {approvals.map((a) => (
            <div key={a.type} className="px-4 py-2.5 flex items-center justify-between hover:bg-muted/40">
              <div>
                <div className="text-xs font-medium">{a.type}</div>
                <div className={`text-[10px] ${slaTone[a.tone]}`}>SLA · {a.sla}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">{a.count}</span>
                <button className="text-[10px] px-2 py-1 rounded-md bg-primary text-primary-foreground">Approve</button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
