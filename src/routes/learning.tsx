import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/cockpit/Layout";
import { SkillGap } from "@/components/cockpit/SkillGap";

export const Route = createFileRoute("/learning")({
  component: LearningPage,
  head: () => ({
    meta: [
      { title: "Training Gaps — AI HR Cockpit" },
      { name: "description", content: "Future readiness heatmap and AI learning recommendations." },
    ],
  }),
});

function LearningPage() {
  return (
    <Layout>
      <section>
        <div className="text-[10px] uppercase tracking-wider text-ai font-semibold">Learning</div>
        <h1 className="text-2xl font-semibold">Training Gaps</h1>
        <p className="text-sm text-muted-foreground mt-1">Skill demand, future readiness and recommended learning interventions.</p>
      </section>
      <SkillGap />
    </Layout>
  );
}
