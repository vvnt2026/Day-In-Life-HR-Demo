import { createFileRoute } from "@tanstack/react-router";
import { Crown, ArrowRight, Sparkles } from "lucide-react";
import { DrilldownPage, Section, StatGrid } from "@/components/cockpit/DrilldownPage";

export const Route = createFileRoute("/succession/details")({
  component: SuccessionDetails,
  head: () => ({ meta: [{ title: "Succession Bench Strength — AI HR Cockpit" }] }),
});

const critical = [
  { role: "CTO", incumbent: "M. Chen", risk: "Med", successors: [["Aisha K.", "Ready 12mo", 78], ["Daniel O.", "Ready 18mo", 71]] },
  { role: "Head of AI", incumbent: "R. Patel", risk: "High", successors: [["Sarah Lim", "Ready 6mo", 84]] },
  { role: "VP Data", incumbent: "J. Wong", risk: "Low", successors: [["Rahul Sharma", "Ready now", 88], ["Priya N.", "Ready 6mo", 79]] },
  { role: "Head of QA", incumbent: "K. Tan", risk: "Med", successors: [["Jason T.", "Ready 9mo", 73]] },
  { role: "Director Platform", incumbent: "Vacant", risk: "Critical", successors: [["External search", "—", 0]] },
];

const riskTone: Record<string, string> = {
  Low: "bg-success/10 text-success",
  Med: "bg-warning/10 text-warning",
  High: "bg-destructive/10 text-destructive",
  Critical: "bg-destructive text-destructive-foreground",
};

function SuccessionDetails() {
  return (
    <DrilldownPage
      eyebrow="Succession Planning"
      title="Bench Strength & Critical Role Coverage"
      subtitle="12 critical roles tracked · 8 future leaders in the pipeline · 3 unfilled gaps."
      insight="Investing in 4 ready-soon successors (Sarah, Aisha, Daniel, Jason) closes 67% of leadership risk within 12 months."
      confidence={86}
    >
      <StatGrid stats={[
        { l: "Critical roles", v: "12" },
        { l: "Successor readiness", v: "67%", tone: "text-warning" },
        { l: "Ready-now successors", v: "3", tone: "text-success" },
        { l: "Unfilled gaps", v: "3", tone: "text-destructive" },
      ]} />

      <Section eyebrow="9-box style" title="Critical roles & successors">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="text-left py-2 font-medium">Role</th>
                <th className="text-left font-medium">Incumbent</th>
                <th className="text-left font-medium">Risk</th>
                <th className="text-left font-medium">Successors (AI fit · readiness)</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {critical.map((r) => (
                <tr key={r.role} className="hover:bg-muted/30">
                  <td className="py-3 font-medium">{r.role}</td>
                  <td className="text-muted-foreground">{r.incumbent}</td>
                  <td><span className={`text-[10px] px-2 py-0.5 rounded-full ${riskTone[r.risk]}`}>{r.risk}</span></td>
                  <td className="space-y-1">
                    {r.successors.map(([n, ready, fit]) => (
                      <div key={String(n)} className="flex items-center gap-2 text-xs">
                        <span className="size-6 rounded-full bg-gradient-to-br from-ai to-primary text-ai-foreground flex items-center justify-center text-[10px] font-semibold">
                          {String(n).split(" ").map((p) => p[0]).join("").slice(0, 2)}
                        </span>
                        <span className="font-medium">{n}</span>
                        <span className="text-muted-foreground">· {ready}</span>
                        {Number(fit) > 0 && <span className="ml-auto text-ai font-semibold">{fit}%</span>}
                      </div>
                    ))}
                  </td>
                  <td className="text-right">
                    <button className="text-[11px] px-3 py-1.5 rounded-md bg-primary text-primary-foreground inline-flex items-center gap-1">
                      Build plan <ArrowRight className="size-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <div className="grid lg:grid-cols-2 gap-5">
        <Section eyebrow="High-potential talent" title="Future leaders identified by AI">
          <div className="space-y-2">
            {[
              ["Sarah Lim", "Product Mgr", 87, "Strategic + people leader"],
              ["Aisha K.", "Sr Data Eng", 84, "Architecture + mentorship"],
              ["Daniel O.", "DevOps Lead", 81, "Reliability culture builder"],
              ["Rahul Sharma", "Sr Data Eng", 79, "Tech depth · executive presence"],
            ].map(([n, role, s, why]) => (
              <div key={String(n)} className="flex items-center gap-3 p-3 rounded-xl border border-border">
                <Crown className="size-4 text-ai" />
                <div className="flex-1">
                  <div className="text-sm font-semibold">{n} <span className="text-muted-foreground font-normal">· {role}</span></div>
                  <div className="text-[11px] text-muted-foreground">{why}</div>
                </div>
                <div className="text-sm font-semibold text-ai">{s}%</div>
              </div>
            ))}
          </div>
        </Section>

        <Section eyebrow="AI Recommendations" title="Bench-strength plays">
          <div className="space-y-2">
            {[
              "Promote Rahul Sharma to staff engineer track — closes VP Data succession gap by 6 months.",
              "Sponsor Sarah Lim into AI leadership rotation (3 months).",
              "Open external search for Director Platform now — current bench depth is zero.",
              "Run quarterly succession review with AI-generated 9-box.",
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
