import { GraduationCap, ArrowRight } from "lucide-react";

const skills = [
  { skill: "GenAI Engineering", current: 28, future: 85, gap: "high" },
  { skill: "Cloud FinOps", current: 42, future: 75, gap: "med" },
  { skill: "Data Governance", current: 51, future: 78, gap: "med" },
  { skill: "Prompt Architecture", current: 22, future: 80, gap: "high" },
  { skill: "MLOps", current: 58, future: 82, gap: "med" },
  { skill: "Privacy Engineering", current: 45, future: 70, gap: "low" },
];

const gapTone: Record<string, string> = {
  high: "from-destructive/80 to-destructive",
  med: "from-warning/80 to-warning",
  low: "from-success/80 to-success",
};

export function SkillGap() {
  return (
    <div className="bg-surface rounded-2xl border border-border shadow-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-ai font-semibold">Training & Skill Gap</div>
          <h3 className="text-base font-semibold">Future Readiness Heatmap</h3>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Readiness</div>
          <div className="text-lg font-semibold">64<span className="text-xs text-muted-foreground">/100</span></div>
        </div>
      </div>
      <div className="space-y-2">
        {skills.map((s) => (
          <div key={s.skill}>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-medium">{s.skill}</span>
              <span className="text-muted-foreground">
                <span className="font-semibold text-foreground">{s.current}</span> → {s.future}
              </span>
            </div>
            <div className="relative h-2 bg-muted rounded-full overflow-hidden">
              <div className="absolute inset-y-0 bg-muted-foreground/20" style={{ width: `${s.future}%` }} />
              <div className={`absolute inset-y-0 bg-gradient-to-r ${gapTone[s.gap]}`} style={{ width: `${s.current}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 rounded-xl bg-muted/50 border border-border">
        <div className="flex items-center gap-1.5 mb-2">
          <GraduationCap className="size-3.5 text-ai" />
          <span className="text-[11px] uppercase tracking-wider font-semibold">AI Recommendations</span>
        </div>
        <div className="space-y-1.5">
          {[
            "Launch GenAI cohort · 24 candidates identified",
            "Pair Cloud FinOps learners with Risk Analytics mentors",
            "Sponsor 8 employees for Data Governance certification",
          ].map((r, i) => (
            <button key={i} className="w-full flex items-center gap-2 text-[12px] text-left hover:text-ai">
              <ArrowRight className="size-3 text-ai" /> {r}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
