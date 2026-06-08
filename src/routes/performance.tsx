import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/cockpit/Layout";
import { PerfComp } from "@/components/cockpit/PerfComp";

export const Route = createFileRoute("/performance")({
  component: PerformancePage,
  head: () => ({
    meta: [
      { title: "Performance & Compensation — AI HR Cockpit" },
      { name: "description", content: "Performance distribution and AI compensation anomaly detection." },
    ],
  }),
});

function PerformancePage() {
  return (
    <Layout>
      <section>
        <div className="text-[10px] uppercase tracking-wider text-ai font-semibold">Performance</div>
        <h1 className="text-2xl font-semibold">Performance & Compensation</h1>
        <p className="text-sm text-muted-foreground mt-1">Distribution, anomaly detection and pay fairness intelligence.</p>
      </section>
      <PerfComp />
    </Layout>
  );
}
