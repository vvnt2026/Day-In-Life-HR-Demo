import { Crown, Gauge, LineChart as LineIcon, ShieldCheck } from "lucide-react";
import { Link } from "@tanstack/react-router";

const cards = [
  {
    icon: Crown,
    title: "Succession Planning",
    badge: "12 critical roles",
    rows: [
      ["Future leaders identified", "8"],
      ["Successor readiness", "67%"],
      ["Critical role gaps", "3"],
    ],
    cta: "View Details",
    to: "/succession/details" as const,
  },
  {
    icon: Gauge,
    title: "Manager Effectiveness",
    badge: "Index 76",
    rows: [
      ["Team sentiment", "+4 MoM"],
      ["Attrition pattern", "Stable"],
      ["Feedback quality", "82%"],
    ],
    cta: "View Details",
    to: "/manager-effectiveness" as const,
  },
  {
    icon: LineIcon,
    title: "Workforce Forecasting",
    badge: "Q1 outlook",
    rows: [
      ["Hiring demand", "+24 roles"],
      ["Skill shortage", "GenAI · MLOps"],
      ["Attrition hotspot", "Data Eng"],
    ],
    cta: "View Details",
    to: "/forecasting" as const,
  },
  {
    icon: ShieldCheck,
    title: "Compliance & Risk",
    badge: "3 alerts",
    rows: [
      ["PDPA training due", "11"],
      ["Work pass expiring", "4 (60d)"],
      ["Mandatory gaps", "6"],
    ],
    cta: "View Details",
    to: "/compliance/details" as const,
  },
];

export function AdvancedAi() {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-ai font-semibold">Enterprise AI Capabilities</div>
          <h3 className="text-base font-semibold">Strategic Intelligence Layers</h3>
        </div>
        <div className="text-[11px] text-muted-foreground">Every recommendation includes confidence + source signals</div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.title} className="relative bg-surface rounded-2xl border border-border shadow-card p-4 hover:shadow-elevated transition-all overflow-hidden">
            <div className="absolute -top-12 -right-12 size-32 rounded-full bg-ai/10 blur-2xl" />
            <div className="relative">
              <div className="flex items-start justify-between mb-3">
                <div className="size-9 rounded-xl bg-accent flex items-center justify-center">
                  <c.icon className="size-4 text-ai" />
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-ai/10 text-ai font-medium">{c.badge}</span>
              </div>
              <h4 className="text-sm font-semibold mb-2">{c.title}</h4>
              <div className="space-y-1 mb-3">
                {c.rows.map(([l, v]) => (
                  <div key={l} className="flex justify-between text-[11px]">
                    <span className="text-muted-foreground">{l}</span>
                    <span className="font-semibold">{v}</span>
                  </div>
                ))}
              </div>
              <Link
                to={c.to}
                className="block w-full text-[11px] py-1.5 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground font-medium transition-colors text-center"
              >
                {c.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
