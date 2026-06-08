import { useState } from "react";
import { Sparkles, Mic, Send, ChevronDown } from "lucide-react";

export interface AskQA {
  q: string;
  a: string;
  meta?: string[];
}

interface Props {
  title: string;
  eyebrow: string;
  items: AskQA[];
  placeholder?: string;
}

export function AskAI({ title, eyebrow, items, placeholder = "Ask anything…" }: Props) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="bg-surface rounded-2xl border border-border shadow-card overflow-hidden">
      <div className="px-4 py-3 gradient-ai text-ai-foreground flex items-center gap-2">
        <Sparkles className="size-4" />
        <div className="flex-1">
          <div className="text-[11px] opacity-80 uppercase tracking-wider">{eyebrow}</div>
          <div className="text-sm font-semibold">{title}</div>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20">GPT-class</span>
      </div>
      <div className="p-3 space-y-1.5 max-h-[420px] overflow-auto">
        {items.map((it, i) => {
          const isOpen = open === i;
          return (
            <div key={it.q} className="rounded-lg bg-muted/50 overflow-hidden">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full text-left text-[12px] px-3 py-2 flex items-start gap-2 hover:bg-accent/50"
              >
                <span className="flex-1 leading-snug font-medium">{it.q}</span>
                <ChevronDown className={`size-3.5 mt-0.5 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && (
                <div className="px-3 pb-3 pt-1 border-t border-border/60 bg-surface/60">
                  <div className="flex items-start gap-2">
                    <div className="size-5 rounded-md gradient-ai flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="size-3 text-ai-foreground" />
                    </div>
                    <p className="text-[11.5px] leading-relaxed text-foreground">{it.a}</p>
                  </div>
                  {it.meta && (
                    <div className="flex flex-wrap gap-1 mt-2 pl-7">
                      {it.meta.map((m) => (
                        <span key={m} className="text-[10px] px-1.5 py-0.5 rounded-md bg-ai/10 text-ai">{m}</span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="p-3 border-t border-border">
        <div className="relative">
          <input
            placeholder={placeholder}
            className="w-full text-xs pl-3 pr-16 py-2.5 rounded-lg bg-muted/60 border border-border outline-none focus:border-ai"
          />
          <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex gap-1">
            <button className="p-1.5 rounded-md hover:bg-muted text-muted-foreground"><Mic className="size-3.5" /></button>
            <button className="p-1.5 rounded-md gradient-ai text-ai-foreground"><Send className="size-3.5" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
