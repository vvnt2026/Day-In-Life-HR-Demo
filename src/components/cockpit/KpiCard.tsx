import { ArrowDownRight, ArrowUpRight, Minus, type LucideIcon } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

type Status = "good" | "warn" | "risk";

export interface KpiCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down" | "flat";
  status: Status;
  ai: string;
  series: number[];
}

const statusToken: Record<Status, { dot: string; ring: string; chart: string }> = {
  good: { dot: "bg-success", ring: "ring-success/20", chart: "var(--success)" },
  warn: { dot: "bg-warning", ring: "ring-warning/20", chart: "var(--warning)" },
  risk: { dot: "bg-destructive", ring: "ring-destructive/20", chart: "var(--destructive)" },
};

export function KpiCard({ icon: Icon, label, value, delta, trend, status, ai, series }: KpiCardProps) {
  const TrendIcon = trend === "up" ? ArrowUpRight : trend === "down" ? ArrowDownRight : Minus;
  const trendColor =
    trend === "up" ? "text-success" : trend === "down" ? "text-destructive" : "text-muted-foreground";
  const tok = statusToken[status];
  const data = series.map((v, i) => ({ i, v }));
  const id = `spark-${label.replace(/\s+/g, "")}`;

  return (
    <div className="group relative bg-surface rounded-xl border border-border p-4 shadow-card hover:shadow-elevated hover:-translate-y-0.5 transition-all overflow-hidden">
      <div className="absolute top-3 right-3 flex items-center gap-1.5">
        <span className={`size-1.5 rounded-full ${tok.dot} ring-4 ${tok.ring}`} />
      </div>
      <div className="flex items-start gap-2.5">
        <div className="size-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
          <Icon className="size-4" />
        </div>
        <div className="min-w-0">
          <div className="text-[11px] uppercase tracking-wide text-muted-foreground font-medium">{label}</div>
          <div className="flex items-baseline gap-2 mt-0.5">
            <div className="text-2xl font-semibold tracking-tight">{value}</div>
            <div className={`flex items-center text-[11px] font-medium ${trendColor}`}>
              <TrendIcon className="size-3" />
              {delta}
            </div>
          </div>
        </div>
      </div>
      <div className="h-10 mt-2 -mx-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={tok.chart} stopOpacity={0.4} />
                <stop offset="100%" stopColor={tok.chart} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="v" stroke={tok.chart} strokeWidth={1.5} fill={`url(#${id})`} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 pt-2 border-t border-border/60 flex items-start gap-1.5">
        <div className="size-1 rounded-full bg-ai mt-1.5 shrink-0" />
        <p className="text-[11px] text-muted-foreground leading-snug">{ai}</p>
      </div>
    </div>
  );
}
