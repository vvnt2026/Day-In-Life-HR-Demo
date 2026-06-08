import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/cockpit/Layout";
import { IssuesGrid } from "@/components/cockpit/IssuesGrid";
import { Sentiment } from "@/components/cockpit/Sentiment";

export const Route = createFileRoute("/workforce")({
  component: WorkforcePage,
  head: () => ({
    meta: [
      { title: "Workforce Intelligence — AI HR Cockpit" },
      { name: "description", content: "Span-of-control issues, AI sentiment analysis and workforce heatmap." },
    ],
  }),
});

function WorkforcePage() {
  return (
    <Layout>
      <section>
        <div className="text-[10px] uppercase tracking-wider text-ai font-semibold">Workforce</div>
        <h1 className="text-2xl font-semibold">Workforce Intelligence</h1>
        <p className="text-sm text-muted-foreground mt-1">Span-of-control issues, AI solutions and workforce sentiment.</p>
      </section>
      <IssuesGrid />
      <Sentiment />
    </Layout>
  );
}
