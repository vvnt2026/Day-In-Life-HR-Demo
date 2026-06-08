import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { AlertCircle, DollarSign } from "lucide-react";

const perfData = [
  { name: "Top performers", value: 18, color: "oklch(0.66 0.16 155)" },
  { name: "Meets expectations", value: 67, color: "oklch(0.55 0.16 268)" },
  { name: "At risk", value: 15, color: "oklch(0.6 0.22 25)" },
];

const flags = [
  { name: "Aisha K.", role: "Sr Data Eng", variance: "−16%", action: "Adjust" },
  { name: "Marcus T.", role: "ML Eng", variance: "−12%", action: "Adjust" },
  { name: "Lin Wei", role: "Data Sci", variance: "−9%", action: "Review" },
  { name: "Daniel O.", role: "DevOps", variance: "−8%", action: "Review" },
];

export function PerfComp() {
  return (
    <div className="bg-surface rounded-2xl border border-border shadow-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-ai font-semibold">Performance & Compensation</div>
          <h3 className="text-base font-semibold">Distribution & AI Anomaly Detection</h3>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Fairness Score</div>
          <div className="text-lg font-semibold text-success">87<span className="text-xs text-muted-foreground">/100</span></div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <div className="relative h-44">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={perfData} dataKey="value" innerRadius={50} outerRadius={75} paddingAngle={2}>
                  {perfData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="text-2xl font-semibold">200</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">employees</div>
            </div>
          </div>
          <div className="space-y-1.5 mt-3">
            {perfData.map((d) => (
              <div key={d.name} className="flex items-center gap-2 text-xs">
                <span className="size-2 rounded-sm" style={{ background: d.color }} />
                <span className="flex-1 text-muted-foreground">{d.name}</span>
                <span className="font-semibold">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <AlertCircle className="size-3.5 text-warning" />
            <span className="text-xs font-semibold">AI flagged compensation anomalies</span>
          </div>
          <div className="space-y-1.5">
            {flags.map((f) => (
              <div key={f.name} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="size-7 rounded-full bg-gradient-to-br from-ai to-primary text-ai-foreground flex items-center justify-center text-[10px] font-semibold">
                  {f.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium truncate">{f.name}</div>
                  <div className="text-[10px] text-muted-foreground">{f.role}</div>
                </div>
                <span className="text-[11px] font-semibold text-destructive">{f.variance}</span>
                <button className="text-[10px] px-2 py-1 rounded-md bg-primary text-primary-foreground">{f.action}</button>
              </div>
            ))}
          </div>
          <div className="mt-3 p-2.5 rounded-lg bg-ai/5 border border-ai/20 flex items-start gap-2">
            <DollarSign className="size-3.5 text-ai mt-0.5" />
            <p className="text-[11px] leading-snug">
              <strong>2 promotion-ready</strong> employees underpaid · <strong>3 inconsistent</strong> patterns detected across band G7.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
