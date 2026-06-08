import type { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { TopBar } from "./TopBar";
import { FloatingHelp } from "./FloatingHelp";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 px-4 lg:px-6 py-6 space-y-6 max-w-[1600px] mx-auto w-full">
          {children}
          <footer className="text-center text-[11px] text-muted-foreground py-6">
            <span className="text-gradient-ai font-semibold">Agentic Workforce Platform</span> · Future of AI-driven HR Operations · Built for Singapore enterprise
          </footer>
        </main>
      </div>
      <FloatingHelp />
    </div>
  );
}
