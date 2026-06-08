import { Search, Bell, Mic, Command } from "lucide-react";

export function TopBar() {
  return (
    <header className="sticky top-0 z-30 h-14 bg-surface/80 backdrop-blur-xl border-b border-border flex items-center gap-3 px-4 lg:px-6">
      <div>
        <h1 className="text-base font-semibold leading-tight">AI HR Operating Cockpit</h1>
        <p className="text-[11px] text-muted-foreground leading-tight">Priya Menon · 200 employees · Singapore</p>
      </div>
      <div className="flex-1 max-w-xl mx-auto relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          placeholder="Ask HR AI anything — &quot;Why is attrition rising?&quot;"
          className="w-full pl-9 pr-20 py-2 text-sm bg-muted/60 border border-border rounded-lg outline-none focus:border-ai focus:bg-surface transition-colors"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          <button className="p-1.5 rounded-md hover:bg-muted text-muted-foreground"><Mic className="size-3.5" /></button>
          <kbd className="hidden md:flex items-center gap-0.5 text-[10px] text-muted-foreground border border-border rounded px-1.5 py-0.5">
            <Command className="size-2.5" />K
          </kbd>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full bg-success/10 text-success border border-success/20">
          <span className="size-1.5 rounded-full bg-success animate-pulse" /> AI Live
        </span>
        <button className="relative p-2 rounded-lg hover:bg-muted">
          <Bell className="size-4" />
          <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-destructive" />
        </button>
      </div>
    </header>
  );
}
