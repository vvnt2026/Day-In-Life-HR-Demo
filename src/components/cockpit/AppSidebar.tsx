import { LayoutDashboard, Users, UserPlus, TrendingUp, Heart, GraduationCap, Briefcase, Shield, Sparkles, Settings } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";

const items = [
  { icon: LayoutDashboard, label: "Cockpit", to: "/" },
  { icon: Users, label: "Workforce", to: "/workforce" },
  { icon: UserPlus, label: "Hiring", to: "/hiring", badge: "12" },
  { icon: TrendingUp, label: "Performance", to: "/performance" },
  { icon: Heart, label: "Engagement", to: "/engagement" },
  { icon: GraduationCap, label: "Learning", to: "/learning" },
  { icon: Briefcase, label: "Succession", to: "/succession" },
  { icon: Shield, label: "Compliance", to: "/compliance" },
] as const;

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="hidden lg:flex w-60 shrink-0 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="p-5 border-b border-sidebar-border">
        <div className="flex items-center gap-2.5">
          <div className="size-9 rounded-xl gradient-ai flex items-center justify-center shadow-glow-ai">
            <Sparkles className="size-4 text-ai-foreground" />
          </div>
          <div className="leading-tight">
            <div className="font-semibold text-sm">Agentic Workforce Platform</div>
          </div>
        </div>
      </div>
      <div className="px-3 py-3">
        <div className="rounded-lg bg-sidebar-accent/40 px-3 py-2.5 border border-sidebar-border/50">
          <div className="flex items-center gap-2 text-xs">
            <span className="size-1.5 rounded-full bg-success animate-pulse" />
            <span className="font-medium">System Active</span>
          </div>
          <div className="text-[11px] text-sidebar-foreground/60 mt-0.5">7 agents · 14 tasks running</div>
        </div>
      </div>
      <nav className="flex-1 px-2 space-y-0.5">
        {items.map((it) => {
          const active = pathname === it.to;
          return (
            <Link
              key={it.label}
              to={it.to}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                  : "text-sidebar-foreground/75 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              }`}
            >
              <it.icon className="size-4" />
              <span className="flex-1 text-left">{it.label}</span>
              {"badge" in it && it.badge && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-ai/20 text-ai">{it.badge}</span>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-sidebar-border">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground/75 hover:bg-sidebar-accent/50">
          <Settings className="size-4" />
          Settings
        </button>
        <div className="mt-3 flex items-center gap-2.5 px-2">
          <div className="size-8 rounded-full bg-gradient-to-br from-ai to-primary flex items-center justify-center text-xs font-semibold text-ai-foreground">
            PM
          </div>
          <div className="leading-tight">
            <div className="text-xs font-semibold">Priya Menon</div>
            <div className="text-[10px] text-sidebar-foreground/60">Senior HRBP · SG</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
