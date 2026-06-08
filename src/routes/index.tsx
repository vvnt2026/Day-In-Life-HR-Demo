import { createFileRoute } from "@tanstack/react-router";
import { Users, UserPlus, Briefcase, TrendingDown, Repeat, Heart, AlertTriangle, UserCircle } from "lucide-react";
import { KpiCard, type KpiCardProps } from "@/components/cockpit/KpiCard";
import { AiBanner } from "@/components/cockpit/AiBanner";
import { Nudges } from "@/components/cockpit/Nudges";
import { Copilot } from "@/components/cockpit/Copilot";
import { AdvancedAi } from "@/components/cockpit/AdvancedAi";
import { Layout } from "@/components/cockpit/Layout";

export const Route = createFileRoute("/")({
  component: Cockpit,
  head: () => ({
    meta: [
      { title: "AI HR Operating Cockpit" },
      { name: "description", content: "AI-driven workforce intelligence for enterprise HR." },
    ],
  }),
});

const kpis: KpiCardProps[] = [
  { icon: Users, label: "Total Employees", value: "200", delta: "+4", trend: "up", status: "good", ai: "Headcount on plan · 96% capacity utilization", series: [180, 184, 188, 191, 195, 198, 200] },
  { icon: UserPlus, label: "New Joiners (Mo)", value: "18", delta: "+22%", trend: "up", status: "good", ai: "Onboarding NPS averaging 74 · 2 at-risk journeys", series: [10, 12, 9, 14, 16, 15, 18] },
  { icon: Briefcase, label: "Open Positions", value: "12", delta: "−3", trend: "down", status: "warn", ai: "3 reqs aging > 45 days · accelerate Data Eng", series: [18, 17, 16, 15, 14, 13, 12] },
  { icon: TrendingDown, label: "Attrition (YTD)", value: "9.5%", delta: "+1.4pp", trend: "up", status: "risk", ai: "AI Engineering driving 38% of regrettable exits", series: [7.1, 7.6, 8.0, 8.4, 8.9, 9.2, 9.5] },
  { icon: Repeat, label: "Internal Fulfillment", value: "42%", delta: "−5pp", trend: "down", status: "warn", ai: "Skills graph stale · 14 internal candidates surfaced", series: [50, 49, 47, 46, 44, 43, 42] },
  { icon: Heart, label: "Engagement Score", value: "78", delta: "+3", trend: "up", status: "good", ai: "Lift driven by Risk Analytics & Product Ops", series: [71, 73, 70, 74, 75, 76, 78] },
  { icon: AlertTriangle, label: "High Risk Employees", value: "7", delta: "+2", trend: "up", status: "risk", ai: "Compensation + workload signals · 1 critical role", series: [3, 4, 4, 5, 6, 6, 7] },
  { icon: UserCircle, label: "Diversity Ratio", value: "41%", delta: "+2pp", trend: "up", status: "good", ai: "Women in tech leadership now 34% (+4pp YoY)", series: [37, 38, 38, 39, 40, 40, 41] },
];

function Cockpit() {
  return (
    <Layout>
      <section>
        <div className="flex items-end justify-between mb-3">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-ai font-semibold">Workforce Control Tower</div>
            <h2 className="text-lg font-semibold">Today's Operating Picture</h2>
          </div>
          <div className="text-[11px] text-muted-foreground">Updated 2 min ago · 7 AI agents synced</div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {kpis.map((k) => <KpiCard key={k.label} {...k} />)}
        </div>
      </section>

      <AiBanner />

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        <div className="xl:col-span-4 space-y-5">
          <Nudges />
        </div>
        <div className="xl:col-span-5">
          <AdvancedAi />
        </div>
        <div className="xl:col-span-3">
          <Copilot />
        </div>
      </section>
    </Layout>
  );
}
