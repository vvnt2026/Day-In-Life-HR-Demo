import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, AlertTriangle, FileCheck, Clock, Sparkles, ArrowUp } from "lucide-react";
import { Layout } from "@/components/cockpit/Layout";
import { StatGrid, Section } from "@/components/cockpit/DrilldownPage";

export const Route = createFileRoute("/compliance")({
  component: CompliancePage,
  head: () => ({ meta: [{ title: "Compliance & Workforce Risk — AI HR Cockpit" }] }),
});

interface Item {
  cat: string;
  t: string;
  d: string;
  severity: "High" | "Medium" | "Low";
  sla: string;
  aiAnalysis: string;
  action: string;
  escalate?: string;
}

const items: Item[] = [
  { cat: "PDPA", t: "PDPA training overdue · 11 employees", d: "Window closes in 14 days · external data handlers in Risk + AI Eng", severity: "High", sla: "14d", aiAnalysis: "Auto-reminders disabled in Q4 caused the gap. Penalty exposure ≈ S$160K if breach occurs.", action: "Bulk nudge + block external data exports", escalate: "DPO" },
  { cat: "Work pass", t: "Work pass expiring · 4 employees", d: "Within 60 days · Singapore EP/SP holders", severity: "High", sla: "60d", aiAnalysis: "MOM portal lead time 21 days. 2 EP renewals require salary uplift to clear new threshold (S$5,600).", action: "Initiate renewal + comp uplift", escalate: "Mobility Lead" },
  { cat: "Mandatory learning", t: "Anti-harassment training gap · 6 employees", d: "Annual mandatory cycle missed", severity: "Medium", sla: "30d", aiAnalysis: "5 of 6 are new joiners — onboarding workflow gap detected.", action: "Schedule + fix onboarding template" },
  { cat: "Compensation", t: "Compensation policy violation · 2 cases", d: "Pay variance > 18% within same band/level", severity: "High", sla: "7d", aiAnalysis: "Equity exposure. Both cases predate last comp cycle. Risk of grievance filing.", action: "Comp committee review", escalate: "CHRO" },
  { cat: "Overtime", t: "Excess overtime risk · 3 teams", d: "Avg 52h/wk for 3 weeks · MOM threshold approaching", severity: "Medium", sla: "30d", aiAnalysis: "AI Eng + Platform compounding due to senior exits. Burnout signals correlated.", action: "Workload rebalance + contractor coverage" },
  { cat: "Hiring", t: "Background verification SLA breach · 5 cases", d: "Avg 11 days vs 7d SLA", severity: "Medium", sla: "7d", aiAnalysis: "Vendor capacity issue. APAC-local provider predicts 5d SLA.", action: "Switch BG vendor" },
  { cat: "Hiring", t: "Hiring compliance · diversity disclosure missing · 2 reqs", d: "Required for roles > S$120K base", severity: "Low", sla: "14d", aiAnalysis: "Hiring manager unaware of policy update Q4.", action: "Auto-attach disclosure + manager training" },
];

const sevTone: Record<string, string> = {
  High: "bg-destructive/10 text-destructive border-destructive/20",
  Medium: "bg-warning/10 text-warning border-warning/20",
  Low: "bg-info/10 text-info border-info/20",
};

function CompliancePage() {
  return (
    <Layout>
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-ai font-semibold">Compliance & Workforce Risk</div>
          <h1 className="text-2xl font-semibold">Singapore Regulatory Posture & Open Risk</h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">PDPA, MOM work passes, mandatory training, comp equity and hiring compliance — auto-monitored across 200 employees.</p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full bg-ai/10 text-ai border border-ai/20">
          <Sparkles className="size-3" /> AI Confidence 94%
        </span>
      </div>

      <StatGrid stats={[
        { l: "Open alerts", v: "7", tone: "text-destructive" },
        { l: "High severity", v: "3", tone: "text-destructive" },
        { l: "PDPA exposure", v: "S$160K", tone: "text-warning" },
        { l: "Compliance score", v: "92 / 100", tone: "text-success" },
      ]} />

      <Section eyebrow="Open items" title="Compliance alerts · severity ranked">
        <div className="space-y-2">
          {items.map((a) => (
            <div key={a.t} className="p-4 rounded-xl border border-border hover:bg-muted/30">
              <div className="flex items-start gap-3 flex-wrap">
                <div className={`size-9 rounded-lg border flex items-center justify-center shrink-0 ${sevTone[a.severity]}`}>
                  {a.severity === "High" ? <AlertTriangle className="size-4" /> : a.severity === "Medium" ? <Clock className="size-4" /> : <FileCheck className="size-4" />}
                </div>
                <div className="flex-1 min-w-[240px]">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-semibold">{a.cat}</span>
                    <div className="text-sm font-semibold">{a.t}</div>
                  </div>
                  <div className="text-[11.5px] text-muted-foreground">{a.d}</div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${sevTone[a.severity]}`}>{a.severity}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground inline-flex items-center gap-1"><Clock className="size-2.5" />SLA {a.sla}</span>
                </div>
              </div>
              <div className="mt-3 grid md:grid-cols-[1fr_auto] gap-3 items-end">
                <div className="rounded-lg bg-ai/5 border border-ai/20 p-3">
                  <div className="flex items-center gap-1.5 mb-1 text-ai">
                    <Sparkles className="size-3" />
                    <span className="text-[10px] uppercase tracking-wider font-semibold">AI risk analysis</span>
                  </div>
                  <p className="text-[12px] leading-snug">{a.aiAnalysis}</p>
                </div>
                <div className="flex flex-col gap-1.5 items-end">
                  {a.escalate && (
                    <span className="text-[10.5px] text-warning inline-flex items-center gap-1"><ArrowUp className="size-3" /> Escalate to {a.escalate}</span>
                  )}
                  <button className="text-[11px] px-3 py-1.5 rounded-md bg-primary text-primary-foreground">Add Actions · {a.action}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <div className="grid lg:grid-cols-2 gap-5">
        <Section eyebrow="Posture" title="Regulatory coverage">
          <div className="space-y-2">
            {[
              ["PDPA (Singapore)", 86],
              ["MOM employment", 97],
              ["IRAS payroll", 99],
              ["ISO 27001 controls", 88],
              ["Internal code of conduct", 92],
            ].map(([l, v]) => (
              <div key={String(l)}>
                <div className="flex justify-between text-[12px] mb-0.5"><span>{l}</span><span className="font-semibold">{v}%</span></div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full gradient-ai" style={{ width: `${v}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section eyebrow="Plays" title="AI-recommended risk reduction">
          <div className="space-y-2">
            {[
              "Auto-block external data exports until PDPA training complete.",
              "Trigger MOM work-pass renewal workflow with 21-day lead.",
              "Switch BG vendor to APAC-local provider — predicted SLA 5d.",
              "Add monthly auto-attestation of code of conduct.",
              "Enable manager-level compliance dashboard (read-only).",
            ].map((t) => (
              <div key={t} className="flex items-start gap-2 p-3 rounded-xl bg-ai/5 border border-ai/20">
                <ShieldCheck className="size-3.5 text-ai mt-0.5 shrink-0" />
                <p className="text-[12.5px] leading-snug flex-1">{t}</p>
                <button className="text-[11px] px-2.5 py-1 rounded-md bg-primary text-primary-foreground shrink-0">Add Actions</button>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </Layout>
  );
}
