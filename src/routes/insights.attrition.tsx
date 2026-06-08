import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, TrendingDown, Brain, Sparkles, AlertTriangle } from "lucide-react";
import { DrilldownPage, Section, StatGrid } from "@/components/cockpit/DrilldownPage";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart, Bar, Cell } from "recharts";

export const Route = createFileRoute("/insights/attrition")({
  component: AttritionInsight,
  head: () => ({ meta: [{ title: "Attrition Risk Insight — AI HR Cockpit" }] }),
});

const trend = [
  { m: "Jul", v: 7.1 }, { m: "Aug", v: 7.6 }, { m: "Sep", v: 8.0 },
  { m: "Oct", v: 8.4 }, { m: "Nov", v: 8.9 }, { m: "Dec", v: 9.2 }, { m: "Jan", v: 9.5 },
];

const drivers = [
  { d: "Compensation gap", v: 38 },
  { d: "Workload", v: 24 },
  { d: "Career growth", v: 18 },
  { d: "Manager fit", v: 12 },
  { d: "Other", v: 8 },
];

function AttritionInsight() {
  return (
    <DrilldownPage
      eyebrow="AI Insight"
      title="Attrition risk rising in AI Engineering"
      subtitle="Driven by compensation variance (−14%) and elevated workload signals over the last 21 days."
      insight="Acting on the top 3 recommendations within 14 days reduces predicted regrettable attrition by 41% and saves ~S$520K in replacement cost."
      confidence={92}
    >
      <StatGrid stats={[
        { l: "Attrition (YTD)", v: "9.5%", tone: "text-destructive" },
        { l: "Δ vs Q3", v: "+1.4 pp", tone: "text-warning" },
        { l: "At-risk employees", v: "7", tone: "text-destructive" },
        { l: "Replacement cost", v: "S$1.2M", tone: "text-warning" },
      ]} />

      <div className="grid lg:grid-cols-2 gap-5">
        <Section eyebrow="Trend" title="Attrition rate · 7 months">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend}>
                <defs>
                  <linearGradient id="att" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.6 0.2 25)" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="oklch(0.6 0.2 25)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="m" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis hide domain={[6, 11]} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Area type="monotone" dataKey="v" stroke="oklch(0.6 0.2 25)" fill="url(#att)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-2 text-[12px] mt-2">
            <TrendingUp className="size-3 text-destructive" />
            <span className="text-destructive font-semibold">+2.4 pp</span>
            <span className="text-muted-foreground">over 7 months · steepest rise in last 60 days</span>
          </div>
        </Section>

        <Section eyebrow="Why it's happening" title="AI Root-Cause Analysis">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={drivers} layout="vertical" margin={{ left: 0 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="d" tick={{ fontSize: 11 }} width={120} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Bar dataKey="v" radius={[0, 6, 6, 0]}>
                  {drivers.map((_, i) => <Cell key={i} fill={`oklch(${0.65 - i * 0.04} 0.18 ${295 - i * 12})`} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Section>
      </div>

      <Section eyebrow="Recommendations" title="Prioritized action plan">
        <div className="space-y-2.5">
          {[
            { t: "Run targeted compensation correction (S$78K)", impact: "+18 pts retention · 14 days", icon: Sparkles },
            { t: "Launch retention 1:1s for top 7 at-risk employees", impact: "−31% predicted attrition · 7 days", icon: Brain },
            { t: "Workload rebalance in Data Eng (rotate 2 engineers)", impact: "Burnout index −22% · 30 days", icon: TrendingDown },
            { t: "Open GenAI architect track to retain senior talent", impact: "Career signal +12 pts · 21 days", icon: AlertTriangle },
          ].map((r) => (
            <div key={r.t} className="flex items-center gap-3 p-3 rounded-xl border border-border hover:bg-muted/40">
              <div className="size-8 rounded-lg bg-ai/10 text-ai flex items-center justify-center"><r.icon className="size-4" /></div>
              <div className="flex-1">
                <div className="text-sm font-medium">{r.t}</div>
                <div className="text-[11px] text-muted-foreground">{r.impact}</div>
              </div>
              <button className="text-[11px] px-3 py-1.5 rounded-md bg-primary text-primary-foreground">Add Actions</button>
            </div>
          ))}
        </div>
      </Section>
    </DrilldownPage>
  );
}
