import { createFileRoute } from "@tanstack/react-router";
import {
  Briefcase, Users, Calendar, FileCheck, UserPlus, AlertTriangle, Crown, UserCircle,
  Sparkles, ArrowRight, ShieldAlert, Brain, ChevronRight, Clock, Flame,
  TrendingUp, TrendingDown, CheckCircle2, Target, Compass, Megaphone, BarChart3,
  Shield, Zap,
} from "lucide-react";
import {
  Area, AreaChart, ResponsiveContainer, Bar, BarChart, XAxis, YAxis, Tooltip, Cell,
  PieChart, Pie,
} from "recharts";
import { Layout } from "@/components/cockpit/Layout";
import { KpiCard, type KpiCardProps } from "@/components/cockpit/KpiCard";
import { AskAI } from "@/components/cockpit/AskAI";

export const Route = createFileRoute("/hiring")({
  component: HiringPage,
  head: () => ({
    meta: [
      { title: "AI Hiring Command Center — AI HR Cockpit" },
      { name: "description", content: "Unified intelligence for hiring, fulfillment, onboarding and workforce planning." },
    ],
  }),
});

const kpis: KpiCardProps[] = [
  { icon: Briefcase, label: "Open Requisitions", value: "12", delta: "−3", trend: "down", status: "warn", ai: "3 reqs aging > 45 days · Data Eng critical", series: [18, 17, 16, 15, 14, 13, 12] },
  { icon: Users, label: "Active Candidates", value: "148", delta: "+24", trend: "up", status: "good", ai: "Pipeline strength up · GenAI sourcing live", series: [110, 118, 124, 131, 138, 142, 148] },
  { icon: Calendar, label: "Interviews Scheduled", value: "32", delta: "+8", trend: "up", status: "good", ai: "Panel load balanced · 2 reschedules pending", series: [18, 22, 24, 26, 28, 30, 32] },
  { icon: FileCheck, label: "Offers Pending", value: "6", delta: "+1", trend: "up", status: "warn", ai: "2 awaiting comp approval > 72h", series: [3, 4, 4, 5, 5, 5, 6] },
  { icon: UserPlus, label: "Joining This Month", value: "18", delta: "+22%", trend: "up", status: "good", ai: "Onboarding NPS 74 · 2 at-risk journeys", series: [10, 12, 9, 14, 16, 15, 18] },
  { icon: AlertTriangle, label: "Hiring SLA Breaches", value: "3", delta: "+1", trend: "up", status: "risk", ai: "Manager feedback delays in AI Eng panel", series: [1, 1, 2, 2, 2, 2, 3] },
  { icon: Crown, label: "Critical Roles Unfilled", value: "4", delta: "−1", trend: "down", status: "warn", ai: "GenAI Architect delayed · re-prioritize sourcing", series: [6, 6, 5, 5, 5, 4, 4] },
  { icon: UserCircle, label: "Diversity Hiring Ratio", value: "39%", delta: "+3pp", trend: "up", status: "good", ai: "Pipeline diversity strong in Product Ops", series: [33, 34, 35, 36, 37, 38, 39] },
];

function Banner() {
  return (
    <div className="relative overflow-hidden rounded-2xl gradient-primary text-primary-foreground p-5 shadow-elevated">
      <div className="absolute -top-20 -right-20 size-64 rounded-full bg-ai/30 blur-3xl" />
      <div className="absolute -bottom-16 -left-10 size-48 rounded-full bg-info/20 blur-3xl" />
      <div className="relative flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="size-10 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center shrink-0">
            <Sparkles className="size-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase tracking-wider font-semibold bg-white/20 px-2 py-0.5 rounded-full">Hiring AI Insight</span>
              <span className="inline-flex items-center gap-1 text-[10px] text-white/80">
                <ShieldAlert className="size-3" /> Confidence 89%
              </span>
            </div>
            <p className="text-sm md:text-[15px] font-medium leading-snug">
              Demand for <span className="underline decoration-white/40">GenAI Engineering</span> skills is increasing faster than current hiring velocity.
            </p>
            <p className="text-xs text-white/75 mt-1">Sources: req trends · market signals · skill graph · attrition forecast</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium border border-white/20 transition-colors">Dismiss</button>
          <button className="px-4 py-2 rounded-lg bg-white text-primary text-xs font-semibold inline-flex items-center gap-1.5 hover:bg-white/90 transition-colors">
            Review Workforce Recommendations <ArrowRight className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

const headerStats = [
  { l: "Open Positions", v: "12", tone: "text-warning" },
  { l: "Pipeline Health", v: "Moderate", tone: "text-warning" },
  { l: "Avg Time to Hire", v: "24d", tone: "text-info" },
  { l: "Offer Acceptance", v: "81%", tone: "text-success" },
  { l: "Internal Fulfillment", v: "42%", tone: "text-warning" },
  { l: "Risk Alerts", v: "3", tone: "text-destructive" },
];

const nudgesHigh = [
  { icon: Flame, t: "1 critical GenAI Architect position delayed", m: "Open 47d · sourcing slowed", sla: "Today" },
  { icon: AlertTriangle, t: "3 hiring decisions pending > 5 days", m: "Data Eng · Risk · Platform", sla: "2d" },
  { icon: Clock, t: "4 interview feedbacks overdue", m: "Avg delay 3.2 days", sla: "1d" },
  { icon: FileCheck, t: "2 offer approvals pending", m: "Awaiting comp committee", sla: "3d" },
  { icon: UserPlus, t: "2 onboarding journeys at risk", m: "IT provisioning lag", sla: "2d" },
  { icon: TrendingDown, t: "1 candidate likely to decline offer", m: "Comp variance −12%", sla: "Today" },
];
const nudgesMed = [
  { icon: UserCircle, t: "Low diversity pipeline · AI Eng", m: "29% vs 39% target" },
  { icon: Clock, t: "Hiring manager response delays", m: "Avg 4.1d to feedback" },
  { icon: Compass, t: "Internal mobility opportunities", m: "14 internal candidates" },
  { icon: Shield, t: "Background verification delays", m: "5 cases > SLA" },
];

const aiActions = [
  { issue: "Candidate decline risk", analysis: "Comp variance −12% vs market", rec: "Accelerate compensation approval", action: "Run" },
  { issue: "Delayed onboarding", analysis: "IT provisioning > 5 days", rec: "Auto-trigger onboarding checklist", action: "Trigger" },
  { issue: "Hiring bottleneck · AI Eng", analysis: "Single panel · 11 candidates", rec: "Add panel interviewer", action: "Assign" },
  { issue: "GenAI skill shortage", analysis: "Demand +38% · supply flat", rec: "Suggest internal fulfillment", action: "Open" },
];

const roles = [
  { role: "Senior Data Engineer", count: 18, stage: "Interview", risk: "Med", days: 28, conf: 78 },
  { role: "AI Architect", count: 9, stage: "Sourcing", risk: "High", days: 47, conf: 52 },
  { role: "QA Automation Lead", count: 22, stage: "Offer", risk: "Low", days: 19, conf: 88 },
  { role: "GenAI Engineer", count: 31, stage: "Screen", risk: "Med", days: 22, conf: 71 },
  { role: "Cloud FinOps Consultant", count: 14, stage: "Interview", risk: "Low", days: 16, conf: 84 },
];

const funnel = [
  { stage: "Sourced", n: 412 },
  { stage: "Screened", n: 248 },
  { stage: "Interview", n: 96 },
  { stage: "Offer", n: 24 },
  { stage: "Joined", n: 18 },
];

const candidate = {
  name: "Rahul Sharma",
  role: "Senior Data Engineer",
  fit: 92, skill: 89, culture: 84, comp: "Med risk", attrition: "Low", notice: "30 days",
  recs: [
    "Strong technical alignment with platform stack",
    "Moderate compensation negotiation risk (band G7)",
    "High leadership potential · mentor signals",
  ],
};

const internalCands = [
  { name: "Sarah Lim", role: "Product Mgr → GenAI PM", fit: 87, ready: "3 mo" },
  { name: "Daniel O.", role: "DevOps → MLOps Eng", fit: 81, ready: "Now" },
  { name: "Aisha K.", role: "Sr Data Eng → AI Architect", fit: 79, ready: "6 mo" },
];

const onboarding = [
  { name: "Mei Tan", day1: 92, risk: "Low", issues: "All set" },
  { name: "Arjun Rao", day1: 64, risk: "Med", issues: "Laptop pending" },
  { name: "Lina Park", day1: 48, risk: "High", issues: "Buddy unassigned · docs missing" },
];

const hiringQA = [
  {
    q: "Which roles are at highest hiring risk?",
    a: "AI Architect (open 47d, sourcing slowed, 1 viable candidate), GenAI Engineer (high demand, supply +21% behind), and Senior Data Engineer (3 reqs aging > 45d) are the top-3 risks. Combined business impact: S$1.2M revenue delay if not closed in 30 days.",
    meta: ["req aging", "pipeline depth", "market demand"],
  },
  {
    q: "Predict offer decline probability.",
    a: "Of 6 pending offers, 2 are predicted to decline (>60% probability). Driver in both cases: comp variance −12% vs candidate's current package. Recommend pulling forward the comp committee approval and adding sign-on bonus (S$15-20K).",
    meta: ["comp benchmark", "candidate sentiment", "competing offers"],
  },
  {
    q: "Suggest internal candidates for open roles.",
    a: "14 internal matches surfaced. Best fits: Sarah Lim → GenAI PM (87%), Daniel O. → MLOps Eng (81% · ready now), Aisha K. → AI Architect (79%, ready in 6mo with mentoring). Internal moves cut hiring cost ~28% and reduce time-to-productivity by 6 weeks.",
    meta: ["skill graph", "career aspirations", "manager feedback"],
  },
  {
    q: "Summarize hiring bottlenecks.",
    a: "Top bottlenecks: hiring-manager feedback delays (avg 4.1d vs 2d SLA), single-panel interviewer fatigue in AI Eng (11 candidates / 1 panel), and BG verification SLA breaches (5 cases). Suggested fix: add 2 panel members, automate feedback nudges, switch BG vendor for APAC.",
    meta: ["panel load", "SLA timers", "vendor performance"],
  },
];

const prompts = hiringQA;

const quickActs = [
  { i: CheckCircle2, l: "Approve req" },
  { i: Megaphone, l: "Campaign" },
  { i: Calendar, l: "Schedule" },
  { i: UserPlus, l: "Onboard" },
  { i: Compass, l: "Mobility" },
  { i: FileCheck, l: "Approve offer" },
  { i: UserCircle, l: "Diversity" },
  { i: Target, l: "Pipeline" },
];

const approvals = [
  { type: "Requisition", count: 4, sla: "1d", tone: "info" },
  { type: "Offer", count: 6, sla: "Today", tone: "destructive" },
  { type: "Internal Transfer", count: 2, sla: "3d", tone: "info" },
  { type: "Compensation", count: 3, sla: "2d", tone: "warning" },
  { type: "Hiring Exception", count: 1, sla: "Today", tone: "destructive" },
];

const slaTone: Record<string, string> = { info: "text-info", warning: "text-warning", destructive: "text-destructive" };
const riskTone: Record<string, string> = { Low: "bg-success/10 text-success", Med: "bg-warning/10 text-warning", High: "bg-destructive/10 text-destructive" };

const forecast = [
  { m: "Now", demand: 12, supply: 18 },
  { m: "+1m", demand: 18, supply: 16 },
  { m: "+2m", demand: 22, supply: 17 },
  { m: "+3m", demand: 26, supply: 18 },
  { m: "+4m", demand: 31, supply: 19 },
  { m: "+6m", demand: 38, supply: 21 },
];

const diversityMix = [
  { name: "Women", value: 39, color: "oklch(0.6 0.22 295)" },
  { name: "Men", value: 58, color: "oklch(0.55 0.16 268)" },
  { name: "Other / NS", value: 3, color: "oklch(0.7 0.05 260)" },
];

function HiringPage() {
  return (
    <Layout>
      {/* Page header */}
      <section>
        <div className="text-[10px] uppercase tracking-wider text-ai font-semibold">Hiring</div>
        <h1 className="text-2xl font-semibold">AI Hiring Command Center</h1>
        <p className="text-sm text-muted-foreground mt-1">Unified intelligence for hiring, fulfillment, onboarding and workforce planning.</p>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {headerStats.map((s) => (
            <div key={s.l} className="rounded-xl border border-border bg-surface px-3 py-2.5">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
              <div className={`text-base font-semibold mt-0.5 ${s.tone}`}>{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      <Banner />

      {/* KPI Control Tower */}
      <section>
        <div className="flex items-end justify-between mb-3">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-ai font-semibold">Hiring Control Tower</div>
            <h2 className="text-lg font-semibold">Today's Acquisition Picture</h2>
          </div>
          <div className="text-[11px] text-muted-foreground">Updated 1 min ago · 4 hiring agents synced</div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {kpis.map((k) => <KpiCard key={k.label} {...k} />)}
        </div>
      </section>

      {/* 3 column workspace */}
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* LEFT — Nudges */}
        <div className="xl:col-span-3 space-y-4">
          <div className="bg-surface rounded-2xl border border-border shadow-card overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <div className="text-[10px] uppercase tracking-wider text-ai font-semibold">AI Hiring Priorities</div>
              <h3 className="text-sm font-semibold">What needs your attention</h3>
            </div>
            <div className="px-4 py-2 text-[10px] uppercase tracking-wider font-semibold text-destructive">High priority</div>
            <div className="divide-y divide-border">
              {nudgesHigh.map((n, i) => (
                <button key={i} className="w-full text-left px-4 py-2.5 hover:bg-muted/50 group">
                  <div className="flex items-start gap-2.5">
                    <div className="size-7 rounded-lg bg-destructive/10 text-destructive border border-destructive/20 flex items-center justify-center shrink-0">
                      <n.icon className="size-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] font-medium leading-snug">{n.t}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1.5">
                        <span>{n.m}</span>
                        <span className="size-0.5 rounded-full bg-muted-foreground/50" />
                        <span className="text-warning font-medium">SLA {n.sla}</span>
                      </div>
                    </div>
                    <ChevronRight className="size-3 text-muted-foreground opacity-0 group-hover:opacity-100" />
                  </div>
                </button>
              ))}
            </div>
            <div className="px-4 py-2 text-[10px] uppercase tracking-wider font-semibold text-warning border-t border-border">Medium priority</div>
            <div className="divide-y divide-border">
              {nudgesMed.map((n, i) => (
                <button key={i} className="w-full text-left px-4 py-2.5 hover:bg-muted/50 group">
                  <div className="flex items-start gap-2.5">
                    <div className="size-7 rounded-lg bg-warning/10 text-warning border border-warning/20 flex items-center justify-center shrink-0">
                      <n.icon className="size-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] font-medium leading-snug">{n.t}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{n.m}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* AI Suggested Actions table */}
          <div className="bg-surface rounded-2xl border border-border shadow-card overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <div className="text-[10px] uppercase tracking-wider text-ai font-semibold">AI Suggested Actions</div>
              <h3 className="text-sm font-semibold">Issue · Analysis · Recommendation</h3>
            </div>
            <div className="divide-y divide-border">
              {aiActions.map((a, i) => (
                <div key={i} className="px-4 py-3">
                  <div className="text-[12px] font-semibold">{a.issue}</div>
                  <div className="flex items-start gap-1.5 mt-1">
                    <Brain className="size-3 text-ai mt-0.5 shrink-0" />
                    <p className="text-[11px] text-muted-foreground leading-snug">{a.analysis}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2 gap-2">
                    <span className="text-[11px] text-foreground">{a.rec}</span>
                    <button className="text-[10px] px-2 py-1 rounded-md bg-primary text-primary-foreground shrink-0">{a.action}</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CENTER — Hiring intelligence hub */}
        <div className="xl:col-span-6 space-y-5">
          {/* Pipeline */}
          <div className="bg-surface rounded-2xl border border-border shadow-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-ai font-semibold">Hiring Intelligence</div>
                <h3 className="text-base font-semibold">Open Positions & Pipeline Health</h3>
              </div>
              <button className="text-xs text-ai hover:underline">View all roles</button>
            </div>
            <div className="overflow-x-auto -mx-2 px-2">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-[10px] uppercase tracking-wider text-muted-foreground border-b border-border">
                    <th className="text-left py-2 font-medium">Role</th>
                    <th className="text-left font-medium">Stage</th>
                    <th className="text-right font-medium">Cands</th>
                    <th className="text-center font-medium">Risk</th>
                    <th className="text-right font-medium">Days open</th>
                    <th className="text-right font-medium">AI conf.</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {roles.map((r) => (
                    <tr key={r.role} className="hover:bg-muted/30">
                      <td className="py-2.5 font-medium">{r.role}</td>
                      <td className="text-muted-foreground">{r.stage}</td>
                      <td className="text-right">{r.count}</td>
                      <td className="text-center">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${riskTone[r.risk]}`}>{r.risk}</span>
                      </td>
                      <td className="text-right text-muted-foreground">{r.days}d</td>
                      <td className="text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <div className="w-12 h-1 bg-muted rounded-full overflow-hidden">
                            <div className="h-full gradient-ai" style={{ width: `${r.conf}%` }} />
                          </div>
                          <span className="text-[10px] text-muted-foreground">{r.conf}%</span>
                        </div>
                      </td>
                      <td className="text-right">
                        <button className="text-[10px] text-ai hover:underline">Review</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">Funnel conversion</div>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={funnel}>
                      <XAxis dataKey="stage" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                      <YAxis hide />
                      <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                      <Bar dataKey="n" radius={[6, 6, 0, 0]}>
                        {funnel.map((_, i) => (
                          <Cell key={i} fill={`oklch(${0.6 - i * 0.04} 0.18 ${295 - i * 8})`} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="space-y-2">
                <div className="rounded-xl bg-ai/5 border border-ai/20 p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Sparkles className="size-3 text-ai" />
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-ai">AI Insight</span>
                  </div>
                  <p className="text-[11px] leading-snug">AI Architect role may miss target hiring timeline. Consider widening sourcing pool + senior referrals.</p>
                </div>
                <div className="rounded-xl bg-success/5 border border-success/20 p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Sparkles className="size-3 text-success" />
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-success">Opportunity</span>
                  </div>
                  <p className="text-[11px] leading-snug">Strong internal candidate available for QA Automation Lead role.</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {["Review candidates", "Schedule interviews", "Trigger sourcing", "Internal mobility"].map((a) => (
                    <button key={a} className="text-[10px] px-2.5 py-1 rounded-md bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors">{a}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* AI Candidate Intelligence */}
          <div className="bg-surface rounded-2xl border border-border shadow-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-ai font-semibold">AI Candidate Intelligence</div>
                <h3 className="text-base font-semibold">Top match · Senior Data Engineer</h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-ai/10 text-ai font-medium">Confidence 92%</span>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-1 rounded-xl border border-border p-4 bg-gradient-to-br from-accent/40 to-transparent">
                <div className="flex items-center gap-3 mb-3">
                  <div className="size-12 rounded-full bg-gradient-to-br from-ai to-primary text-ai-foreground flex items-center justify-center text-sm font-semibold">RS</div>
                  <div>
                    <div className="text-sm font-semibold">{candidate.name}</div>
                    <div className="text-[11px] text-muted-foreground">{candidate.role}</div>
                  </div>
                </div>
                <div className="space-y-2 text-[11px]">
                  {[
                    ["AI Fit Score", `${candidate.fit}%`],
                    ["Skill match", `${candidate.skill}%`],
                    ["Culture alignment", `${candidate.culture}%`],
                    ["Comp expectation", candidate.comp],
                    ["Attrition risk", candidate.attrition],
                    ["Notice period", candidate.notice],
                  ].map(([l, v]) => (
                    <div key={l} className="flex justify-between">
                      <span className="text-muted-foreground">{l}</span>
                      <span className="font-semibold">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2 space-y-3">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-ai font-semibold mb-1.5">AI Resume Summary</div>
                  <p className="text-[12px] text-muted-foreground leading-snug">
                    8 years building large-scale data platforms (Spark · Kafka · dbt). Led migration from on-prem to cloud lakehouse at scale. Strong system design + mentorship signal in past 1:1 transcripts.
                  </p>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-ai font-semibold mb-1.5">AI Recommendations</div>
                  <ul className="space-y-1">
                    {candidate.recs.map((r) => (
                      <li key={r} className="flex items-start gap-1.5 text-[12px]">
                        <ChevronRight className="size-3 text-ai mt-0.5 shrink-0" /> {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    ["Interview readiness", "84%"],
                    ["Predicted success", "High"],
                    ["Peer benchmark", "Top 12%"],
                  ].map(([l, v]) => (
                    <div key={l} className="rounded-lg bg-muted/50 p-2.5 text-center">
                      <div className="text-[9px] uppercase tracking-wider text-muted-foreground">{l}</div>
                      <div className="text-sm font-semibold mt-0.5">{v}</div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 pt-1">
                  <button className="flex-1 text-xs py-2 rounded-lg bg-primary text-primary-foreground font-medium">Move to interview</button>
                  <button className="flex-1 text-xs py-2 rounded-lg border border-border hover:bg-muted">Save to pipeline</button>
                </div>
              </div>
            </div>
          </div>

          {/* Internal Fulfillment + Onboarding row */}
          <div className="grid lg:grid-cols-2 gap-5">
            <div className="bg-surface rounded-2xl border border-border shadow-card p-5">
              <div className="flex items-center gap-2 mb-1">
                <Compass className="size-4 text-ai" />
                <h3 className="text-sm font-semibold">Internal Fulfillment & Mobility</h3>
              </div>
              <p className="text-[11px] text-muted-foreground mb-3">AI-driven adjacency matches</p>
              <div className="space-y-2">
                {internalCands.map((c) => (
                  <div key={c.name} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-muted/40 hover:bg-muted">
                    <div className="size-8 rounded-full bg-gradient-to-br from-ai to-primary text-ai-foreground flex items-center justify-center text-[10px] font-semibold">
                      {c.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium truncate">{c.name}</div>
                      <div className="text-[10px] text-muted-foreground truncate">{c.role}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] font-semibold text-ai">{c.fit}%</div>
                      <div className="text-[9px] text-muted-foreground">Ready {c.ready}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 rounded-xl bg-ai/5 border border-ai/20 p-3">
                <p className="text-[11px] leading-snug">
                  <strong>2 internal candidates</strong> suitable for GenAI Engineer role · internal movement could reduce hiring cost by <strong>28%</strong>.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {["Initiate discussion", "Skill plan", "Notify manager", "Internal interview"].map((a) => (
                  <button key={a} className="text-[10px] px-2.5 py-1 rounded-md bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground">{a}</button>
                ))}
              </div>
            </div>

            <div className="bg-surface rounded-2xl border border-border shadow-card p-5">
              <div className="flex items-center gap-2 mb-1">
                <UserPlus className="size-4 text-ai" />
                <h3 className="text-sm font-semibold">Onboarding Risk Intelligence</h3>
              </div>
              <p className="text-[11px] text-muted-foreground mb-3">Day-1 readiness · 30-day prediction</p>
              <div className="space-y-2">
                {onboarding.map((o) => (
                  <div key={o.name} className="rounded-lg border border-border p-2.5">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="text-xs font-medium">{o.name}</div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${riskTone[o.risk]}`}>{o.risk}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full gradient-ai" style={{ width: `${o.day1}%` }} />
                      </div>
                      <span className="text-[10px] font-semibold">{o.day1}/100</span>
                    </div>
                    <div className="text-[10px] text-muted-foreground">{o.issues}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-1.5">
                {["Auto-escalate IT", "Send nudges", "Assign buddy", "30-day check"].map((a) => (
                  <button key={a} className="text-[10px] py-1.5 rounded-md bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground">{a}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Copilot + quick actions + approvals */}
        <div className="xl:col-span-3 space-y-4">
          <AskAI title="Ask Hiring AI" eyebrow="Hiring Copilot" items={hiringQA} placeholder="Ask hiring AI…" />

          <div className="bg-surface rounded-2xl border border-border shadow-card p-4">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2.5">Quick Actions</div>
            <div className="grid grid-cols-2 gap-1.5">
              {quickActs.map((a) => (
                <button key={a.l} className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-muted/50 hover:bg-accent hover:text-accent-foreground transition-colors text-left">
                  <a.i className="size-3.5 text-ai shrink-0" />
                  <span className="text-[11px] font-medium truncate">{a.l}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-surface rounded-2xl border border-border shadow-card overflow-hidden">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <div className="text-sm font-semibold flex items-center gap-2">
                <FileCheck className="size-4 text-ai" /> Approvals
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-destructive/10 text-destructive">16</span>
            </div>
            <div className="divide-y divide-border">
              {approvals.map((a) => (
                <div key={a.type} className="px-4 py-2.5 flex items-center justify-between hover:bg-muted/40">
                  <div>
                    <div className="text-xs font-medium">{a.type}</div>
                    <div className={`text-[10px] ${slaTone[a.tone]}`}>SLA · {a.sla}</div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold">{a.count}</span>
                    <button className="text-[10px] px-2 py-1 rounded-md bg-primary text-primary-foreground">OK</button>
                    <button className="text-[10px] px-2 py-1 rounded-md border border-border">No</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom: Forecast + Diversity + Effectiveness */}
      <section>
        <div className="mb-3">
          <div className="text-[10px] uppercase tracking-wider text-ai font-semibold">Workforce Planning & Forecasting</div>
          <h2 className="text-lg font-semibold">Strategic Hiring Outlook</h2>
        </div>
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="bg-surface rounded-2xl border border-border shadow-card p-5">
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 className="size-4 text-ai" />
              <h3 className="text-sm font-semibold">Hiring Forecast</h3>
            </div>
            <p className="text-[11px] text-muted-foreground mb-3">Demand vs supply · 6-month outlook</p>
            <div className="h-36">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={forecast}>
                  <defs>
                    <linearGradient id="dem" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.6 0.22 295)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="oklch(0.6 0.22 295)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="sup" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.66 0.16 155)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="oklch(0.66 0.16 155)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="m" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                  <Area type="monotone" dataKey="demand" stroke="oklch(0.6 0.22 295)" fill="url(#dem)" strokeWidth={2} />
                  <Area type="monotone" dataKey="supply" stroke="oklch(0.66 0.16 155)" fill="url(#sup)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1.5 mt-2">
              {[
                "GenAI demand expected to increase by 38%.",
                "Cloud Engineering shortage risk likely in next 6 months.",
                "Attrition-driven hiring need: +6 roles in AI Eng.",
              ].map((t) => (
                <div key={t} className="flex items-start gap-1.5 text-[11px]">
                  <Sparkles className="size-3 text-ai mt-0.5 shrink-0" /> <span className="leading-snug">{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface rounded-2xl border border-border shadow-card p-5">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="size-4 text-ai" />
              <h3 className="text-sm font-semibold">Diversity & Compliance</h3>
            </div>
            <p className="text-[11px] text-muted-foreground mb-3">PDPA-safe · fair hiring analytics</p>
            <div className="grid grid-cols-2 gap-3 items-center">
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={diversityMix} dataKey="value" innerRadius={32} outerRadius={52} paddingAngle={2}>
                      {diversityMix.map((d, i) => <Cell key={i} fill={d.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-1.5">
                {diversityMix.map((d) => (
                  <div key={d.name} className="flex items-center gap-1.5 text-[11px]">
                    <span className="size-2 rounded-sm" style={{ background: d.color }} />
                    <span className="flex-1 text-muted-foreground">{d.name}</span>
                    <span className="font-semibold">{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-3 space-y-1.5">
              {[
                { i: AlertTriangle, t: "Bias signal in AI Eng panel · majority single demographic" },
                { i: UserCircle, t: "Pipeline diversity gap: AI Architect role" },
                { i: CheckCircle2, t: "PDPA safeguards passing · 0 flags this week" },
              ].map((f, i) => (
                <div key={i} className="flex items-start gap-1.5 text-[11px]">
                  <f.i className="size-3 text-ai mt-0.5 shrink-0" /> <span className="leading-snug">{f.t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface rounded-2xl border border-border shadow-card p-5">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="size-4 text-ai" />
              <h3 className="text-sm font-semibold">Hiring Effectiveness</h3>
            </div>
            <p className="text-[11px] text-muted-foreground mb-3">Operational analytics</p>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {[
                ["Time to hire", "24d"],
                ["Cost per hire", "$8.4k"],
                ["Offer accept", "81%"],
                ["Candidate exp.", "4.4/5"],
                ["Mgr response", "1.8d"],
                ["SLA adherence", "87%"],
              ].map(([l, v]) => (
                <div key={l} className="rounded-lg bg-muted/50 p-2 text-center">
                  <div className="text-[9px] uppercase tracking-wider text-muted-foreground">{l}</div>
                  <div className="text-sm font-semibold mt-0.5">{v}</div>
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-ai/5 border border-ai/20 p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <Sparkles className="size-3 text-ai" />
                <span className="text-[10px] uppercase tracking-wider font-semibold text-ai">AI Insight</span>
              </div>
              <p className="text-[11px] leading-snug">Teams with faster manager feedback close positions <strong>27% faster</strong>.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced AI features strip */}
      <section>
        <div className="mb-3">
          <div className="text-[10px] uppercase tracking-wider text-ai font-semibold">Advanced AI · Hiring</div>
          <h2 className="text-lg font-semibold">Enterprise Hiring Intelligence</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { i: TrendingUp, t: "AI Hiring Forecasting", b: "+38% GenAI demand", rows: [["Skill demand", "GenAI · MLOps"], ["Attrition-driven", "+6 roles"], ["Workforce gap", "12 roles"]] },
            { i: Brain, t: "AI Explainability", b: "Why · how · sources", rows: [["Avg confidence", "84%"], ["Signals used", "27"], ["Source diversity", "High"]] },
            { i: ShieldAlert, t: "Hiring Risk Intelligence", b: "Predictive", rows: [["Offer declines", "2 likely"], ["Joining drop-offs", "1"], ["Disengagement", "3 watch"]] },
            { i: Target, t: "Workforce Strategy", b: "Build vs Buy", rows: [["Build (internal)", "42%"], ["Buy (external)", "58%"], ["Budget reclaim", "−18%"]] },
          ].map((c) => (
            <div key={c.t} className="relative bg-surface rounded-2xl border border-border shadow-card p-4 hover:shadow-elevated transition-all overflow-hidden">
              <div className="absolute -top-12 -right-12 size-32 rounded-full bg-ai/10 blur-2xl" />
              <div className="relative">
                <div className="flex items-start justify-between mb-3">
                  <div className="size-9 rounded-xl bg-accent flex items-center justify-center">
                    <c.i className="size-4 text-ai" />
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-ai/10 text-ai font-medium">{c.b}</span>
                </div>
                <h4 className="text-sm font-semibold mb-2">{c.t}</h4>
                <div className="space-y-1">
                  {c.rows.map(([l, v]) => (
                    <div key={l} className="flex justify-between text-[11px]">
                      <span className="text-muted-foreground">{l}</span>
                      <span className="font-semibold">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
