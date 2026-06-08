import { createFileRoute } from "@tanstack/react-router";
import { Gauge, TrendingUp, TrendingDown, Sparkles } from "lucide-react";
import { DrilldownPage, Section, StatGrid } from "@/components/cockpit/DrilldownPage";

export const Route = createFileRoute("/manager-effectiveness")({
  component: ManagerEffectivenessPage,
  head: () => ({ meta: [{ title: "Manager Effectiveness — AI HR Cockpit" }] }),
});

const managers = [
  { name: "M. Chen",    team: "AI Eng",      idx: 84, sentiment: "+6", attrition: "Low",  feedback: 88 },
  { name: "R. Patel",   team: "Data Plat",   idx: 79, sentiment: "+3", attrition: "Med",  feedback: 82 },
  { name: "K. Tan",     team: "QA",          idx: 64, sentiment: "−4", attrition: "High", feedback: 71 },
  { name: "J. Wong",    team: "Product",     idx: 81, sentiment: "+5", attrition: "Low",  feedback: 86 },
  { name: "S. Iyer",    team: "Risk",        idx: 72, sentiment: "+1", attrition: "Med",  feedback: 78 },
];

const tone = (n: number) => n >= 80 ? "text-success" : n >= 70 ? "text-warning" : "text-destructive";

function ManagerEffectivenessPage() {
  return (
    <DrilldownPage
      eyebrow="Manager Effectiveness"
      title="Leadership Health Index"
      subtitle="Composite score from team sentiment, attrition pattern, feedback quality and 1:1 cadence."
      insight="K. Tan (QA) is the highest-leverage intervention — coaching + workload rebalance lifts team retention by 17% in 60 days."
      confidence={81}
    >
      <StatGrid stats={[
        { l: "Org index", v: "76", tone: "text-warning" },
        { l: "Top quartile", v: "3 of 14" },
        { l: "Bottom quartile", v: "2 of 14", tone: "text-destructive" },
        { l: "Δ vs last quarter", v: "+4 pts", tone: "text-success" },
      ]} />

      <Section eyebrow="People leaders" title="Manager scorecards">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="text-left py-2 font-medium">Manager</th>
                <th className="text-left font-medium">Team</th>
                <th className="text-right font-medium">Index</th>
                <th className="text-right font-medium">Sentiment Δ</th>
                <th className="text-center font-medium">Attrition</th>
                <th className="text-right font-medium">Feedback quality</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {managers.map((m) => (
                <tr key={m.name} className="hover:bg-muted/30">
                  <td className="py-3 font-medium">{m.name}</td>
                  <td className="text-muted-foreground">{m.team}</td>
                  <td className={`text-right font-semibold ${tone(m.idx)}`}>{m.idx}</td>
                  <td className="text-right">
                    <span className={`inline-flex items-center gap-0.5 ${m.sentiment.startsWith("+") ? "text-success" : "text-destructive"}`}>
                      {m.sentiment.startsWith("+") ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                      {m.sentiment}
                    </span>
                  </td>
                  <td className="text-center">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      m.attrition === "Low" ? "bg-success/10 text-success" :
                      m.attrition === "Med" ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"
                    }`}>{m.attrition}</span>
                  </td>
                  <td className="text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
                        <div className="h-full gradient-ai" style={{ width: `${m.feedback}%` }} />
                      </div>
                      <span className="text-[10px] text-muted-foreground">{m.feedback}</span>
                    </div>
                  </td>
                  <td className="text-right">
                    <button className="text-[11px] px-3 py-1.5 rounded-md bg-primary text-primary-foreground">Coach</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <div className="grid lg:grid-cols-2 gap-5">
        <Section eyebrow="What's working" title="Top behaviours of high-index managers">
          <ul className="space-y-2 text-sm">
            {[
              "Weekly 1:1 cadence with growth-focused agenda",
              "Public recognition rituals (monthly)",
              "Skip-level feedback loop within 14 days",
              "Workload visibility dashboards used in stand-ups",
            ].map((t) => (
              <li key={t} className="flex gap-2"><Gauge className="size-4 text-ai mt-0.5 shrink-0" /> {t}</li>
            ))}
          </ul>
        </Section>
        <Section eyebrow="AI Recommendations" title="Coaching plays">
          <div className="space-y-2">
            {[
              "Enrol K. Tan in 6-week leadership cohort — proven +12 index lift.",
              "Pair S. Iyer with M. Chen for shadowing (8 weeks).",
              "Roll out manager AI assistant to all bottom-quartile leaders.",
            ].map((t) => (
              <div key={t} className="flex items-start gap-2 p-3 rounded-xl bg-ai/5 border border-ai/20">
                <Sparkles className="size-3.5 text-ai mt-0.5 shrink-0" />
                <p className="text-[12.5px] leading-snug">{t}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </DrilldownPage>
  );
}
