import { createFileRoute, Link } from "@tanstack/react-router";
import { Crown, Users, AlertTriangle, Sparkles, ArrowRight, GraduationCap } from "lucide-react";
import { Layout } from "@/components/cockpit/Layout";
import { StatGrid, Section } from "@/components/cockpit/DrilldownPage";

export const Route = createFileRoute("/succession")({
  component: SuccessionPage,
  head: () => ({ meta: [{ title: "Succession Planning Intelligence — AI HR Cockpit" }] }),
});

interface Role {
  title: string;
  incumbent: string;
  vacancyRisk: "High" | "Medium" | "Low";
  successors: { name: string; readiness: "Ready now" | "1 yr" | "2 yr"; score: number }[];
  ai: string;
  action: string;
}

const roles: Role[] = [
  {
    title: "Lead AI Architect", incumbent: "P. Krishnan", vacancyRisk: "Medium",
    successors: [{ name: "Rahul Sharma", readiness: "Ready now", score: 88 }, { name: "Priya Naidu", readiness: "1 yr", score: 72 }],
    ai: "1 ready successor identified. Rahul is at retention risk — losing him cascades architecture risk.",
    action: "Lock retention play for Rahul + start formal architect rotation",
  },
  {
    title: "Cloud Platform Head", incumbent: "K. Tan", vacancyRisk: "High",
    successors: [{ name: "Wei Ling Koh", readiness: "2 yr", score: 58 }],
    ai: "No ready-now successor. High vacancy risk — incumbent disengagement signals + 5y tenure plateau.",
    action: "External pipeline + accelerated leadership track for Wei Ling",
  },
  {
    title: "Head of AI Product", incumbent: "J. Wong", vacancyRisk: "Low",
    successors: [{ name: "Sarah Lim", readiness: "1 yr", score: 78 }, { name: "Michelle Ong", readiness: "2 yr", score: 64 }],
    ai: "Healthy bench. Sarah is ready in 12 months with sponsorship.",
    action: "Sponsor Sarah into AI leadership rotation",
  },
  {
    title: "VP Data", incumbent: "M. Chen", vacancyRisk: "Medium",
    successors: [{ name: "Rahul Sharma", readiness: "Ready now", score: 84 }, { name: "Arjun Mehta", readiness: "2 yr", score: 60 }],
    ai: "Rahul is the strongest internal successor — he doesn't realise it. Surface in 1:1.",
    action: "Open VP Data successor pathway with Rahul",
  },
  {
    title: "Director, Risk Analytics", incumbent: "L. Goh", vacancyRisk: "Low",
    successors: [{ name: "Arjun Mehta", readiness: "1 yr", score: 70 }],
    ai: "Stable seat. Continue mentoring cadence with Arjun.",
    action: "Quarterly stretch assignment for Arjun",
  },
];

const riskTone: Record<string, string> = {
  High: "bg-destructive/10 text-destructive border-destructive/20",
  Medium: "bg-warning/10 text-warning border-warning/20",
  Low: "bg-success/10 text-success border-success/20",
};
const readyTone: Record<string, string> = {
  "Ready now": "bg-success/10 text-success",
  "1 yr": "bg-info/10 text-info",
  "2 yr": "bg-muted text-muted-foreground",
};

function SuccessionPage() {
  return (
    <Layout>
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-ai font-semibold">Succession Planning Intelligence</div>
          <h1 className="text-2xl font-semibold">Critical Roles, Bench Strength & Leadership Pipeline</h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">AI continuously evaluates 12 critical Singapore roles, predicting vacancy risk and recommending development actions per seat.</p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full bg-ai/10 text-ai border border-ai/20">
          <Sparkles className="size-3" /> AI Confidence 87%
        </span>
      </div>

      <StatGrid stats={[
        { l: "Critical roles", v: "12" },
        { l: "Future leaders identified", v: "8", tone: "text-success" },
        { l: "Successor readiness", v: "67%", tone: "text-warning" },
        { l: "Critical role gaps", v: "3", tone: "text-destructive" },
      ]} />

      <Section eyebrow="Pipeline" title="Critical roles · vacancy risk · bench">
        <div className="space-y-3">
          {roles.map((r) => (
            <div key={r.title} className="rounded-xl border border-border p-4 hover:bg-muted/30">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex items-start gap-3">
                  <div className="size-9 rounded-xl bg-accent flex items-center justify-center"><Crown className="size-4 text-ai" /></div>
                  <div>
                    <div className="text-sm font-semibold">{r.title}</div>
                    <div className="text-[11px] text-muted-foreground">Incumbent: {r.incumbent}</div>
                  </div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${riskTone[r.vacancyRisk]}`}>Vacancy risk · {r.vacancyRisk}</span>
              </div>
              <div className="mt-3 grid md:grid-cols-2 gap-3">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">Successors · readiness timeline</div>
                  <div className="space-y-1.5">
                    {r.successors.map((s) => (
                      <div key={s.name} className="flex items-center gap-2">
                        <div className="size-6 rounded-full bg-muted text-[10px] font-semibold flex items-center justify-center">{s.name.split(" ").map(n => n[0]).join("")}</div>
                        <div className="flex-1 text-[12px]">{s.name}</div>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded ${readyTone[s.readiness]}`}>{s.readiness}</span>
                        <span className="text-[11px] font-semibold w-9 text-right">{s.score}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg bg-ai/5 border border-ai/20 p-3">
                  <div className="flex items-center gap-1.5 mb-1 text-ai">
                    <Sparkles className="size-3" />
                    <span className="text-[10px] uppercase tracking-wider font-semibold">AI insight</span>
                  </div>
                  <p className="text-[12px] leading-snug">{r.ai}</p>
                  <div className="mt-2 flex items-center justify-between gap-2 pt-2 border-t border-ai/15">
                    <span className="text-[11px] text-muted-foreground">Recommended: <strong className="text-foreground">{r.action}</strong></span>
                    <button className="text-[11px] px-2.5 py-1 rounded-md bg-primary text-primary-foreground inline-flex items-center gap-1">Add Actions <ArrowRight className="size-3" /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <div className="grid lg:grid-cols-3 gap-5">
        <Section eyebrow="Bench strength" title="Leadership pipeline depth">
          <div className="space-y-2">
            {[
              ["Director+", 3, 5],
              ["Senior Manager", 8, 10],
              ["Manager", 14, 16],
              ["Tech Lead", 11, 14],
            ].map(([l, v, t]) => (
              <div key={String(l)}>
                <div className="flex justify-between text-[12px] mb-0.5"><span>{l}</span><span className="font-semibold">{v}/{t}</span></div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full gradient-ai" style={{ width: `${(Number(v) / Number(t)) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section eyebrow="Development" title="Mentorship recommendations">
          <div className="space-y-2">
            {[
              ["Rahul Sharma", "P. Krishnan", "Architecture mentorship"],
              ["Sarah Lim", "J. Wong", "Product leadership rotation"],
              ["Wei Ling Koh", "External", "Cloud platform exec coaching"],
            ].map(([m, b, t]) => (
              <div key={String(m)} className="flex items-start gap-2 p-3 rounded-xl bg-muted/40">
                <GraduationCap className="size-3.5 text-ai mt-0.5 shrink-0" />
                <div className="text-[12px]"><strong>{m}</strong> ↔ {b}<div className="text-muted-foreground text-[11px]">{t}</div></div>
              </div>
            ))}
          </div>
        </Section>

        <Section eyebrow="Risk" title="Roles with no ready-now successor">
          <div className="space-y-2">
            {["Cloud Platform Head", "Director, Security", "Head of MLOps"].map((t) => (
              <div key={t} className="flex items-center gap-2 p-3 rounded-xl border border-destructive/20 bg-destructive/5">
                <AlertTriangle className="size-3.5 text-destructive shrink-0" />
                <div className="flex-1 text-[12px] font-medium">{t}</div>
                <Link to="/at-risk" className="text-[10.5px] text-destructive hover:underline">Resolve</Link>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </Layout>
  );
}
