import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Sparkles, ShieldAlert } from "lucide-react";
import { Layout } from "./Layout";

interface Props {
  eyebrow: string;
  title: string;
  subtitle?: string;
  backTo?: string;
  backLabel?: string;
  confidence?: number;
  insight?: string;
  children: ReactNode;
}

export function DrilldownPage({ eyebrow, title, subtitle, backTo = "/", backLabel = "Back to Cockpit", confidence, insight, children }: Props) {
  return (
    <Layout>
      <div>
        <Link to={backTo} className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-ai">
          <ArrowLeft className="size-3" /> {backLabel}
        </Link>
        <div className="mt-2 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-ai font-semibold">{eyebrow}</div>
            <h1 className="text-2xl font-semibold">{title}</h1>
            {subtitle && <p className="text-sm text-muted-foreground mt-1 max-w-2xl">{subtitle}</p>}
          </div>
          {confidence !== undefined && (
            <span className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full bg-ai/10 text-ai border border-ai/20">
              <ShieldAlert className="size-3" /> AI Confidence {confidence}%
            </span>
          )}
        </div>
      </div>

      {insight && (
        <div className="relative overflow-hidden rounded-2xl gradient-primary text-primary-foreground p-5 shadow-elevated">
          <div className="absolute -top-20 -right-20 size-64 rounded-full bg-ai/30 blur-3xl" />
          <div className="relative flex items-start gap-3">
            <div className="size-10 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center shrink-0">
              <Sparkles className="size-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider font-semibold opacity-80 mb-1">AI Summary</div>
              <p className="text-sm md:text-[15px] font-medium leading-snug">{insight}</p>
            </div>
          </div>
        </div>
      )}

      {children}
    </Layout>
  );
}

export function StatGrid({ stats }: { stats: { l: string; v: string; tone?: string }[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((s) => (
        <div key={s.l} className="rounded-xl bg-surface border border-border p-4 shadow-card">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
          <div className={`text-xl font-semibold mt-1 ${s.tone || ""}`}>{s.v}</div>
        </div>
      ))}
    </div>
  );
}

export function Section({ title, eyebrow, children, action }: { title: string; eyebrow?: string; children: ReactNode; action?: ReactNode }) {
  return (
    <div className="bg-surface rounded-2xl border border-border shadow-card p-5">
      <div className="flex items-start justify-between mb-4 gap-2">
        <div>
          {eyebrow && <div className="text-[10px] uppercase tracking-wider text-ai font-semibold">{eyebrow}</div>}
          <h3 className="text-base font-semibold">{title}</h3>
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}
