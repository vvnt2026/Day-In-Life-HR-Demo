import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/cockpit/Layout";
import { Engagement } from "@/components/cockpit/Engagement";

export const Route = createFileRoute("/engagement")({
  component: EngagementPage,
  head: () => ({
    meta: [
      { title: "Engagement & Retention — AI HR Cockpit" },
      { name: "description", content: "People outcomes, engagement hub and retention intelligence." },
    ],
  }),
});

function EngagementPage() {
  return (
    <Layout>
      <section>
        <div className="text-[10px] uppercase tracking-wider text-ai font-semibold">Engagement & Retention</div>
        <h1 className="text-2xl font-semibold">People Outcomes</h1>
        <p className="text-sm text-muted-foreground mt-1">Engagement hub, 1:1 intelligence and retention analytics.</p>
      </section>
      <Engagement />
    </Layout>
  );
}
