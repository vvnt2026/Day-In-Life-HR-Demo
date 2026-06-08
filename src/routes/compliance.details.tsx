import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, AlertTriangle, FileCheck, Clock, Sparkles } from "lucide-react";
import { DrilldownPage, Section, StatGrid } from "@/components/cockpit/DrilldownPage";

export const Route = createFileRoute("/compliance/details")({
  component: ComplianceDetails,
  head: () => ({ meta: [{ title: "Compliance & Risk — AI HR Cockpit" }] }),
});

const alerts = [
  { sev: "High", icon: AlertTriangle, t: "PDPA training overdue · 11 employees", d: "Window closes in 14 days · external data handlers", action: "Bulk nudge" },
  { sev: "High", icon: Clock, t: "Work pass expiring · 4 employees", d: "Within 60 days · Singapore EP/SP", action: "Initiate renewal" },
  { sev: "Med",  icon: FileCheck, t: "Anti-harassment training gap · 6 employees", d: "Annual mandatory cycle", action: "Schedule" },
  { sev: "Med",  icon: ShieldCheck, t: "Background verification SLA breach · 5 cases", d: "Avg 11 days vs 7d SLA", action: "Switch vendor" },
  { sev: "Low",  icon: FileCheck, t: "Code of conduct acknowledgements · 3 pending", d: "New joiners · day 7 reminder due", action: "Auto-remind" },
];

const sevTone: Record<string, string> = {
  High: "bg-destructive/10 text-destructive border-destructive/20",
  Med:  "bg-warning/10 text-warning border-warning/20",
  Low:  "bg-info/10 text-info border-info/20",
};

function ComplianceDetails() {
  return (
    <DrilldownPage
      eyebrow="Compliance & Risk"
      title="Regulatory Posture & Open Risk"
      subtitle="PDPA, work passes, mandatory training and verifications — auto-monitored across 200 employees."
      insight="Resolving the 3 high-severity items in 7 days closes 84% of regulatory exposure and prevents an estimated S$160K in PDPA penalty risk."
      confidence={94}
    >
      <StatGrid stats={[
        { l: "Open alerts", v: "3", tone: "text-destructive" },
        { l: "PDPA training due", v: "11", tone: "text-warning" },
        { l: "Work pass expiring (60d)", v: "4", tone: "text-warning" },
        { l: "Compliance score", v: "92 / 100", tone: "text-success" },
      ]} />

      <Section eyebrow="Alerts" title="Open compliance items">
        <div className="space-y-2">
          {alerts.map((a) => (
            <div key={a.t} className="flex items-center gap-3 p-3 rounded-xl border border-border hover:bg-muted/40">
              <div className={`size-9 rounded-lg border flex items-center justify-center shrink-0 ${sevTone[a.sev]}`}>
                <a.icon className="size-4" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold">{a.t}</div>
                <div className="text-[11px] text-muted-foreground">{a.d}</div>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${sevTone[a.sev]}`}>{a.sev}</span>
              <button className="text-[11px] px-3 py-1.5 rounded-md bg-primary text-primary-foreground">{a.action}</button>
            </div>
          ))}
        </div>
      </Section>

      <div className="grid lg:grid-cols-2 gap-5">
        <Section eyebrow="Posture" title="Regulatory coverage">
          <div className="space-y-2">
            {[
              ["PDPA (Singapore)", 94],
              ["MOM employment", 97],
              ["IRAS payroll", 99],
              ["ISO 27001 controls", 88],
              ["Internal code of conduct", 92],
            ].map(([l, v]) => (
              <div key={String(l)}>
                <div className="flex justify-between text-[12px] mb-0.5">
                  <span>{l}</span>
                  <span className="font-semibold">{v}%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full gradient-ai" style={{ width: `${v}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section eyebrow="AI Recommendations" title="Risk reduction plays">
          <div className="space-y-2">
            {[
              "Auto-block external data exports until PDPA training complete.",
              "Trigger work-pass renewal workflow with MOM portal integration.",
              "Replace BG vendor with APAC-local provider — predicted SLA 5d.",
              "Add monthly auto-attestation of code of conduct.",
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
