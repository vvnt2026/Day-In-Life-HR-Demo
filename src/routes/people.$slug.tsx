import { createFileRoute, notFound } from "@tanstack/react-router";
import { Heart, Brain, Sparkles, Calendar, TrendingDown, AlertTriangle, Award, MessageSquare } from "lucide-react";
import { DrilldownPage, Section, StatGrid } from "@/components/cockpit/DrilldownPage";

export const Route = createFileRoute("/people/$slug")({
  component: PersonPage,
  head: () => ({ meta: [{ title: "Employee 360 — AI HR Cockpit" }] }),
});

const people: Record<string, any> = {
  "rahul-sharma": {
    name: "Rahul Sharma",
    role: "Senior Data Engineer",
    team: "AI Engineering · Singapore",
    tenure: "4 yrs 2 mo",
    manager: "M. Chen",
    risk: 89,
    sentiment: -4,
    perf: "Exceeds",
    comp: { band: "G7", variance: -14 },
    workload: 52,
    insight: "Rahul shows strong flight-risk signals: comp variance −14% vs Singapore market median, 52h/wk for 3 weeks, and 2 missed promotion cycles. He's also the strongest internal successor for VP Data — losing him cascades succession risk.",
    history: [
      { t: "Last 1:1 raised compensation concern", w: "3 days ago" },
      { t: "Calendar load · 12 meetings/wk", w: "21d trend" },
      { t: "Pulse score dropped −6 pts", w: "Last 2 surveys" },
      { t: "Authored 3 architecture RFCs", w: "Q4" },
    ],
    actions: [
      "Schedule retention 1:1 in 48h with VP Data sponsor",
      "Pre-approve 12% comp correction (S$22K)",
      "Offer GenAI architect rotation (Q1)",
      "Reduce on-call load by 50% for 30 days",
    ],
  },
  "sarah-lim": {
    name: "Sarah Lim", role: "Product Manager", team: "Product · Singapore",
    tenure: "3 yrs", manager: "J. Wong", risk: 22, sentiment: +5, perf: "Strong",
    comp: { band: "G6", variance: +2 }, workload: 44,
    insight: "Sarah is a high-potential leader — strong successor signal for Head of AI Product. Career growth conversation overdue.",
    history: [
      { t: "Mentored 2 PMs in last quarter", w: "Q4" },
      { t: "Career growth raised in last 1:1", w: "1 wk ago" },
    ],
    actions: ["Sponsor into AI leadership rotation", "Open Head of AI Product successor track"],
  },
  "jason-tan": {
    name: "Jason Tan", role: "QA Lead", team: "Quality · Singapore",
    tenure: "5 yrs 6 mo", manager: "K. Tan", risk: 71, sentiment: -3, perf: "Solid",
    comp: { band: "G6", variance: -6 }, workload: 51,
    insight: "Workload concern raised. Burnout signals + limited learning hours are eroding engagement.",
    history: [
      { t: "Workload concern in last 1:1", w: "5 days ago" },
      { t: "Learning hours below target (4h vs 12h)", w: "Q4" },
    ],
    actions: ["Workload rebalance · rotate 1 engineer", "Enrol in automation cohort", "Manager coaching for K. Tan"],
  },
};

function PersonPage() {
  const { slug } = Route.useParams();
  const p = people[slug];
  if (!p) throw notFound();

  return (
    <DrilldownPage
      eyebrow="People · 360°"
      title={p.name}
      subtitle={`${p.role} · ${p.team} · Tenure ${p.tenure} · Manager ${p.manager}`}
      backTo="/engagement"
      backLabel="Back to Engagement"
      insight={p.insight}
      confidence={88}
    >
      <StatGrid stats={[
        { l: "Flight risk", v: `${p.risk}%`, tone: p.risk > 60 ? "text-destructive" : "text-success" },
        { l: "Sentiment Δ", v: `${p.sentiment > 0 ? "+" : ""}${p.sentiment}`, tone: p.sentiment >= 0 ? "text-success" : "text-destructive" },
        { l: "Performance", v: p.perf, tone: "text-success" },
        { l: "Comp variance", v: `${p.comp.variance > 0 ? "+" : ""}${p.comp.variance}%`, tone: p.comp.variance < -5 ? "text-destructive" : p.comp.variance < 0 ? "text-warning" : "text-success" },
      ]} />

      <div className="grid lg:grid-cols-3 gap-5">
        <Section eyebrow="Signals" title="What AI is seeing">
          <div className="space-y-2">
            {p.history.map((h: any) => (
              <div key={h.t} className="flex items-start gap-2 p-3 rounded-xl border border-border">
                <Brain className="size-3.5 text-ai mt-0.5 shrink-0" />
                <div className="flex-1">
                  <div className="text-[12.5px]">{h.t}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">{h.w}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section eyebrow="Workload & wellbeing" title="Operating context">
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-[12px] mb-1"><span>Avg hours / week</span><span className="font-semibold">{p.workload}h</span></div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div className={`h-full ${p.workload > 48 ? "bg-destructive" : "bg-success"}`} style={{ width: `${Math.min(100, p.workload * 1.5)}%` }} />
              </div>
            </div>
            <div className="rounded-xl bg-muted/40 p-3 text-[12px]">
              <div className="flex items-center gap-1.5 mb-1"><Heart className="size-3.5 text-ai" /><span className="font-semibold">Wellbeing</span></div>
              Burnout risk index trending up. Recommend wellbeing check-in.
            </div>
            <div className="rounded-xl bg-muted/40 p-3 text-[12px]">
              <div className="flex items-center gap-1.5 mb-1"><Award className="size-3.5 text-ai" /><span className="font-semibold">Career signals</span></div>
              High-potential. Mentor scores +8. Architecture leadership emerging.
            </div>
          </div>
        </Section>

        <Section eyebrow="AI Action Plan" title="Recommended next steps">
          <ol className="space-y-2">
            {p.actions.map((a: string, i: number) => (
              <li key={a} className="flex items-start gap-2.5 p-3 rounded-xl border border-border hover:bg-muted/40">
                <span className="size-6 rounded-full bg-ai/10 text-ai text-[11px] font-semibold flex items-center justify-center shrink-0">{i + 1}</span>
                <span className="flex-1 text-[12.5px]">{a}</span>
                <button className="text-[10px] px-2 py-1 rounded-md bg-primary text-primary-foreground shrink-0">Add Actions</button>
              </li>
            ))}
          </ol>
        </Section>
      </div>

      <Section eyebrow="Talking points" title="AI-prepped 1:1 agenda">
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { i: MessageSquare, t: "Acknowledge recent platform RFC contributions" },
            { i: TrendingDown, t: "Address compensation transparency directly" },
            { i: Calendar, t: "Discuss workload + on-call rotation rebalance" },
            { i: AlertTriangle, t: "Open conversation on career path & GenAI track" },
          ].map((p) => (
            <div key={p.t} className="flex items-start gap-2.5 p-3 rounded-xl bg-ai/5 border border-ai/20">
              <p.i className="size-4 text-ai mt-0.5 shrink-0" />
              <span className="text-[12.5px] leading-snug">{p.t}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-start gap-2 p-3 rounded-xl bg-muted/40">
          <Sparkles className="size-3.5 text-ai mt-0.5 shrink-0" />
          <p className="text-[12px] leading-snug">
            Predicted retention impact of running this plan: <strong>+34 pts</strong>. Estimated cost: <strong>S$22K</strong>. Recommended owner: <strong>VP Data</strong>.
          </p>
        </div>
      </Section>
    </DrilldownPage>
  );
}
