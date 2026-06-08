import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const trend = [
  { m: "Jun", s: 71 }, { m: "Jul", s: 73 }, { m: "Aug", s: 70 },
  { m: "Sep", s: 74 }, { m: "Oct", s: 72 }, { m: "Nov", s: 78 },
];

const teams = [
  { name: "AI Engineering", score: 62, label: "Neutral", tone: "warning" },
  { name: "Data Platforms", score: 48, label: "Negative", tone: "destructive" },
  { name: "Risk Analytics", score: 84, label: "Positive", tone: "success" },
  { name: "QA", score: 56, label: "Neutral", tone: "warning" },
  { name: "Product Ops", score: 79, label: "Positive", tone: "success" },
  { name: "Finance Tech", score: 72, label: "Positive", tone: "success" },
];

const themes = [
  { t: "Compensation", w: 28, neg: true },
  { t: "Workload", w: 24, neg: true },
  { t: "Career growth", w: 18, neg: true },
  { t: "Leadership", w: 14, neg: false },
  { t: "Recognition", w: 9, neg: false },
  { t: "Tools", w: 7, neg: false },
];

const toneCls: Record<string, string> = {
  warning: "bg-warning/15 text-warning border-warning/30",
  destructive: "bg-destructive/15 text-destructive border-destructive/30",
  success: "bg-success/15 text-success border-success/30",
};

export function Sentiment() {
  return (
    <div className="bg-surface rounded-2xl border border-border shadow-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-ai font-semibold">AI Sentiment Analysis</div>
          <h3 className="text-base font-semibold">Workforce Sentiment Heatmap</h3>
        </div>
        <select className="text-xs bg-muted border border-border rounded-lg px-2.5 py-1.5">
          <option>Last 6 months</option>
        </select>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
            {teams.map((t) => (
              <div key={t.name} className={`rounded-xl border p-3 ${toneCls[t.tone]}`}>
                <div className="text-[11px] font-medium opacity-80">{t.name}</div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-xl font-semibold">{t.score}</span>
                  <span className="text-[10px] uppercase tracking-wide">{t.label}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trend}>
                <XAxis dataKey="m" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis hide domain={[40, 100]} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Line type="monotone" dataKey="s" stroke="oklch(0.6 0.22 295)" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">Top themes</div>
          <div className="flex flex-wrap gap-1.5">
            {themes.map((th) => (
              <span
                key={th.t}
                className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  th.neg ? "bg-destructive/10 text-destructive" : "bg-success/10 text-success"
                }`}
                style={{ fontSize: `${10 + th.w / 3}px` }}
              >
                {th.t}
              </span>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-xl bg-muted/50 border border-border">
            <div className="text-[10px] uppercase tracking-wider text-ai font-semibold mb-1">AI Insight</div>
            <p className="text-[12px] leading-snug">
              Negative themes cluster around <strong>compensation</strong> and <strong>workload</strong> in technical teams. Positive leadership feedback in Risk Analytics suggests transferable manager practices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
