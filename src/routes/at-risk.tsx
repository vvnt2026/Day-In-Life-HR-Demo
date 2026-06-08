import { createFileRoute, Link } from "@tanstack/react-router";
import { TrendingUp, TrendingDown, AlertTriangle, Sparkles, ArrowRight } from "lucide-react";
import { DrilldownPage, Section, StatGrid } from "@/components/cockpit/DrilldownPage";

export const Route = createFileRoute("/at-risk")({
  component: AtRiskPage,
  head: () => ({ meta: [{ title: "At-Risk Employees — AI HR Cockpit" }] }),
});

interface Row {
  slug: string;
  name: string;
  role: string;
  team: string;
  reason: string;
  risk: number;
  sentiment: number;
  retention: number;
  action: string;
  manager: string;
  last1on1: string;
}

const rows: Row[] = [
  { slug: "rahul-sharma", name: "Rahul Sharma", role: "Senior Data Engineer", team: "AI Engineering", reason: "Compensation below market + workload pressure", risk: 89, sentiment: -6, retention: 22, action: "Retention 1:1 + comp correction", manager: "M. Chen", last1on1: "3 days ago" },
  { slug: "sarah-lim", name: "Sarah Lim", role: "AI Product Analyst", team: "Product", reason: "Career growth stagnation · 8 months no promo signal", risk: 76, sentiment: -3, retention: 38, action: "Career path + AI leadership rotation", manager: "J. Wong", last1on1: "12 days ago" },
  { slug: "jason-tan", name: "Jason Tan", role: "Cloud Engineer", team: "Platform", reason: "Manager disengagement · low 1:1 cadence", risk: 71, sentiment: -4, retention: 41, action: "Manager coaching + skip-level 1:1", manager: "K. Tan", last1on1: "21 days ago" },
  { slug: "priya-naidu", name: "Priya Naidu", role: "AI Architect", team: "AI Engineering", reason: "Workload 56h/wk + market poaching active", risk: 68, sentiment: -2, retention: 45, action: "Workload rebalance + retention bonus", manager: "M. Chen", last1on1: "9 days ago" },
  { slug: "wei-ling-koh", name: "Wei Ling Koh", role: "ML Engineer", team: "AI Engineering", reason: "Comp variance −11% + LinkedIn activity spike", risk: 64, sentiment: -1, retention: 48, action: "Compensation review + skip-level", manager: "M. Chen", last1on1: "6 days ago" },
  { slug: "arjun-mehta", name: "Arjun Mehta", role: "Data Scientist", team: "Risk Analytics", reason: "Internal mobility request blocked Q3", risk: 58, sentiment: 0, retention: 52, action: "Open mobility conversation", manager: "L. Goh", last1on1: "8 days ago" },
  { slug: "michelle-ong", name: "Michelle Ong", role: "Product Designer", team: "Product", reason: "Role-fit drift · reduced collaboration signals", risk: 52, sentiment: -2, retention: 56, action: "Role redesign + design lead 1:1", manager: "J. Wong", last1on1: "11 days ago" },
];

const riskTone = (r: number) => r >= 75 ? "text-destructive" : r >= 60 ? "text-warning" : "text-info";
const sentTone = (s: number) => s < -3 ? "text-destructive" : s < 0 ? "text-warning" : "text-success";

function AtRiskPage() {
  const high = rows.filter(r => r.risk >= 75).length;
  const avgRet = Math.round(rows.reduce((a, r) => a + r.retention, 0) / rows.length);

  return (
    <DrilldownPage
      eyebrow="Retention · At-Risk Roster"
      title="7 employees at attrition risk"
      subtitle="Singapore enterprise workforce · ranked by AI risk score, sentiment trend and replacement cost."
      backTo="/"
      insight="Acting on the top 4 employees within 14 days reduces predicted regrettable attrition by 41% and avoids ~S$520K in replacement cost. Recommended: retention 1:1s + comp correction first."
      confidence={89}
    >
      <StatGrid stats={[
        { l: "At-risk employees", v: "7", tone: "text-destructive" },
        { l: "High flight risk (>75%)", v: String(high), tone: "text-destructive" },
        { l: "Avg retention likelihood", v: `${avgRet}%`, tone: "text-warning" },
        { l: "Replacement cost exposure", v: "S$1.2M", tone: "text-warning" },
      ]} />

      <Section eyebrow="Roster" title="At-risk employees · drill into any to act">
        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-[12.5px]">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="py-2 px-2 font-semibold">Employee</th>
                <th className="py-2 px-2 font-semibold">Team</th>
                <th className="py-2 px-2 font-semibold">Risk reason</th>
                <th className="py-2 px-2 font-semibold text-center">AI Risk</th>
                <th className="py-2 px-2 font-semibold text-center">Sentiment</th>
                <th className="py-2 px-2 font-semibold text-center">Retain</th>
                <th className="py-2 px-2 font-semibold">Suggested action</th>
                <th className="py-2 px-2 font-semibold">Manager</th>
                <th className="py-2 px-2 font-semibold">Last 1:1</th>
                <th className="py-2 px-2"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.slug} className="border-b border-border/60 hover:bg-muted/40">
                  <td className="py-3 px-2">
                    <Link to="/people/$slug" params={{ slug: r.slug }} className="font-semibold hover:text-ai">{r.name}</Link>
                    <div className="text-[10.5px] text-muted-foreground">{r.role}</div>
                  </td>
                  <td className="py-3 px-2 text-muted-foreground">{r.team}</td>
                  <td className="py-3 px-2 max-w-[260px]"><span className="leading-snug">{r.reason}</span></td>
                  <td className={`py-3 px-2 text-center font-semibold ${riskTone(r.risk)}`}>{r.risk}%</td>
                  <td className={`py-3 px-2 text-center font-semibold ${sentTone(r.sentiment)}`}>
                    <span className="inline-flex items-center gap-0.5">
                      {r.sentiment < 0 ? <TrendingDown className="size-3" /> : <TrendingUp className="size-3" />}
                      {r.sentiment > 0 ? `+${r.sentiment}` : r.sentiment}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-center font-semibold">{r.retention}%</td>
                  <td className="py-3 px-2 text-muted-foreground max-w-[200px]"><span className="leading-snug">{r.action}</span></td>
                  <td className="py-3 px-2 text-muted-foreground">{r.manager}</td>
                  <td className="py-3 px-2 text-muted-foreground">{r.last1on1}</td>
                  <td className="py-3 px-2 text-right">
                    <Link to="/one-on-one/$slug" params={{ slug: r.slug }} className="inline-flex items-center gap-1 text-[11px] px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:opacity-90">
                      Add Actions <ArrowRight className="size-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <div className="grid lg:grid-cols-2 gap-5">
        <Section eyebrow="AI Insight" title="Why these 7?">
          <div className="space-y-2">
            {[
              { i: AlertTriangle, t: "5 of 7 are in AI Engineering — the same team flagged in the top banner." },
              { i: TrendingDown, t: "Compensation variance is the dominant driver (4 of 7)." },
              { i: Sparkles, t: "3 are critical-role successors — losing any cascades succession risk." },
            ].map((x) => (
              <div key={x.t} className="flex items-start gap-2 p-3 rounded-xl bg-ai/5 border border-ai/20">
                <x.i className="size-3.5 text-ai mt-0.5 shrink-0" />
                <p className="text-[12.5px] leading-snug">{x.t}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section eyebrow="Bulk plays" title="Apply across the cohort">
          <div className="space-y-2">
            {[
              ["Run market correction (S$118K)", "Closes 4 of 7 comp gaps in 14 days"],
              ["Schedule retention 1:1s for all 7", "Owners auto-assigned · slots blocked this week"],
              ["Open GenAI Architect track", "Career signal for top 3 critical-role employees"],
            ].map(([t, d]) => (
              <div key={t} className="flex items-center gap-3 p-3 rounded-xl border border-border hover:bg-muted/40">
                <div className="flex-1">
                  <div className="text-sm font-medium">{t}</div>
                  <div className="text-[11px] text-muted-foreground">{d}</div>
                </div>
                <button className="text-[11px] px-3 py-1.5 rounded-md bg-primary text-primary-foreground">Add Actions</button>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </DrilldownPage>
  );
}
