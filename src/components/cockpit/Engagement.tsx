import { Users, Heart, Sparkles, Megaphone, Calendar, Award } from "lucide-react";
import { Link } from "@tanstack/react-router";

const meetings = [
  { name: "Rahul Sharma", role: "Sr Data Eng", topic: "Retention risk", tone: "destructive", time: "Today · 3:00 PM" },
  { name: "Sarah Lim", role: "Product Mgr", topic: "Career growth", tone: "info", time: "Tue · 11:00 AM" },
  { name: "Jason Tan", role: "QA Lead", topic: "Workload concern", tone: "warning", time: "Wed · 2:30 PM" },
];

const toneCls: Record<string, string> = {
  destructive: "border-destructive/30 bg-destructive/5",
  info: "border-info/30 bg-info/5",
  warning: "border-warning/30 bg-warning/5",
};

export function Engagement() {
  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <div className="bg-surface rounded-2xl border border-border shadow-card p-5">
        <div className="flex items-center gap-2 mb-1">
          <Heart className="size-4 text-ai" />
          <h3 className="text-sm font-semibold">Engagement Hub</h3>
        </div>
        <p className="text-[11px] text-muted-foreground mb-4">Pulse & wellbeing intelligence</p>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { l: "Pulse", v: "82%", sub: "participation" },
            { l: "Score", v: "78", sub: "engagement" },
            { l: "Burnout", v: "Med", sub: "risk index" },
          ].map((s) => (
            <div key={s.l} className="rounded-xl bg-muted/50 p-2.5 text-center">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
              <div className="text-lg font-semibold mt-0.5">{s.v}</div>
              <div className="text-[10px] text-muted-foreground">{s.sub}</div>
            </div>
          ))}
        </div>
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">AI Suggested Activities</div>
        <div className="space-y-1.5">
          {[
            { i: Megaphone, t: "Team townhall · APAC" },
            { i: Award, t: "Women in AI initiative" },
            { i: Sparkles, t: "Learning week · Q1" },
            { i: Heart, t: "Wellness intervention · QA" },
          ].map((a) => (
            <button key={a.t} className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-muted text-xs">
              <a.i className="size-3.5 text-ai" />
              <span className="flex-1 text-left">{a.t}</span>
              <span className="text-[10px] text-ai">Launch</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-surface rounded-2xl border border-border shadow-card p-5">
        <div className="flex items-center gap-2 mb-1">
          <Calendar className="size-4 text-ai" />
          <h3 className="text-sm font-semibold">1:1 Meeting Intelligence</h3>
        </div>
        <p className="text-[11px] text-muted-foreground mb-4">AI-prepped talking points</p>
        <div className="space-y-2.5">
          {meetings.map((m) => {
            const slug = m.name.toLowerCase().replace(/\s+/g, "-");
            return (
              <Link key={m.name} to="/people/$slug" params={{ slug }} className={`block rounded-xl border p-3 hover:shadow-card transition-all ${toneCls[m.tone]}`}>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="size-8 rounded-full bg-gradient-to-br from-ai to-primary text-ai-foreground flex items-center justify-center text-[10px] font-semibold">
                    {m.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold truncate">{m.name}</div>
                    <div className="text-[10px] text-muted-foreground">{m.role} · {m.time}</div>
                  </div>
                  <span className="text-[10px] font-medium">{m.topic}</span>
                </div>
                <div className="text-[11px] text-muted-foreground leading-snug">
                  <strong className="text-foreground">AI talking points:</strong> last 1:1 raised comp · 3 calendar conflicts this sprint · acknowledge recent ship.
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="bg-surface rounded-2xl border border-border shadow-card p-5">
        <div className="flex items-center gap-2 mb-1">
          <Users className="size-4 text-ai" />
          <h3 className="text-sm font-semibold">Exit Analysis & Retention</h3>
        </div>
        <p className="text-[11px] text-muted-foreground mb-4">Correlation insights</p>
        <div className="space-y-2 mb-3">
          {[
            { reason: "Compensation", pct: 38 },
            { reason: "Career growth", pct: 27 },
            { reason: "Manager fit", pct: 18 },
            { reason: "Work-life", pct: 11 },
            { reason: "Other", pct: 6 },
          ].map((r) => (
            <div key={r.reason}>
              <div className="flex justify-between text-[11px] mb-0.5">
                <span>{r.reason}</span>
                <span className="font-semibold">{r.pct}%</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full gradient-ai" style={{ width: `${r.pct * 2}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-xl bg-ai/5 border border-ai/20 p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Sparkles className="size-3 text-ai" />
            <span className="text-[10px] uppercase tracking-wider font-semibold text-ai">AI Insight</span>
          </div>
          <p className="text-[11px] leading-snug">
            Teams with low manager-connect frequency show <strong>2.3×</strong> higher attrition risk. Recommend leadership coaching + monthly skip-levels.
          </p>
        </div>
      </div>
    </div>
  );
}
