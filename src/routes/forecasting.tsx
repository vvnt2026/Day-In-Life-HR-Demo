import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { DrilldownPage, Section, StatGrid } from "@/components/cockpit/DrilldownPage";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart, Bar, Cell } from "recharts";

export const Route = createFileRoute("/forecasting")({
  component: ForecastingPage,
  head: () => ({ meta: [{ title: "Workforce Forecasting — AI HR Cockpit" }] }),
});

const demand = [
  { m: "Now", demand: 12, supply: 18 }, { m: "+1m", demand: 18, supply: 16 },
  { m: "+2m", demand: 22, supply: 17 }, { m: "+3m", demand: 26, supply: 18 },
  { m: "+4m", demand: 31, supply: 19 }, { m: "+6m", demand: 38, supply: 21 },
];

const skillGaps = [
  { s: "GenAI Engineering", g: 14 }, { s: "MLOps", g: 9 }, { s: "Cloud FinOps", g: 6 },
  { s: "Data Privacy", g: 5 }, { s: "AI Ethics", g: 4 },
];

function ForecastingPage() {
  return (
    <DrilldownPage
      eyebrow="Workforce Forecasting"
      title="Strategic Hiring & Skill Outlook"
      subtitle="6-month demand vs supply by skill family · attrition-adjusted."
      insight="Without intervention, GenAI Engineering supply lags demand by 17 roles in 6 months. Recommend internal upskill cohort + targeted external hiring now."
      confidence={84}
    >
      <StatGrid stats={[
        { l: "Hiring demand (6mo)", v: "+24 roles", tone: "text-warning" },
        { l: "Top shortage", v: "GenAI · MLOps", tone: "text-destructive" },
        { l: "Attrition hotspot", v: "Data Eng" },
        { l: "Internal supply", v: "42%", tone: "text-warning" },
      ]} />

      <div className="grid lg:grid-cols-2 gap-5">
        <Section eyebrow="Outlook" title="Demand vs supply · 6 months">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={demand}>
                <defs>
                  <linearGradient id="d" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.6 0.22 295)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="oklch(0.6 0.22 295)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="s" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.66 0.16 155)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="oklch(0.66 0.16 155)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="m" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Area type="monotone" dataKey="demand" stroke="oklch(0.6 0.22 295)" fill="url(#d)" strokeWidth={2} />
                <Area type="monotone" dataKey="supply" stroke="oklch(0.66 0.16 155)" fill="url(#s)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Section>

        <Section eyebrow="Skill shortages" title="Top skill gaps · forecast">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillGaps} layout="vertical">
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="s" tick={{ fontSize: 11 }} width={130} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Bar dataKey="g" radius={[0, 6, 6, 0]}>
                  {skillGaps.map((_, i) => <Cell key={i} fill={`oklch(${0.65 - i * 0.03} 0.18 ${295 - i * 12})`} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Section>
      </div>

      <Section eyebrow="Scenarios" title="AI scenario planning">
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { t: "Hold steady", d: "Continue current hiring velocity. Result: 17-role gap, S$2.1M revenue at risk.", tone: "border-destructive/30 bg-destructive/5" },
            { t: "Internal upskill", d: "Launch GenAI cohort (24 engineers, 12 wks). Closes 60% of gap; cost S$180K.", tone: "border-warning/30 bg-warning/5" },
            { t: "Hybrid (recommended)", d: "Internal upskill + targeted senior hires. Closes 95% of gap by month 5.", tone: "border-success/30 bg-success/5" },
          ].map((s) => (
            <div key={s.t} className={`rounded-xl border p-4 ${s.tone}`}>
              <div className="flex items-center gap-1.5 mb-2">
                <Sparkles className="size-3 text-ai" />
                <div className="text-sm font-semibold">{s.t}</div>
              </div>
              <p className="text-[12px] text-muted-foreground leading-snug">{s.d}</p>
            </div>
          ))}
        </div>
      </Section>
    </DrilldownPage>
  );
}
