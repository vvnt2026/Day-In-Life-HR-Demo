import { useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { HelpCircle, X, Sparkles, ChevronDown, Zap, Compass, Lightbulb } from "lucide-react";

interface Faq { q: string; a: string }
interface Guide {
  title: string;
  intro: string;
  what: string;
  widgets: { t: string; d: string }[];
  next: string[];
  faqs: Faq[];
}

const guides: Record<string, Guide> = {
  "/": {
    title: "AI HR Operating Cockpit",
    intro: "Your daily strategic operating picture for 200 employees in Singapore.",
    what: "This page consolidates workforce KPIs, AI-detected priorities, strategic intelligence layers and your Copilot — so you can spend 80% of your time on workforce strategy.",
    widgets: [
      { t: "Workforce Control Tower", d: "8 KPI cards with sparklines and AI commentary." },
      { t: "Attrition Risk Banner", d: "AI-detected risk with quantified impact and one-click action plan." },
      { t: "What needs your attention", d: "Ranked priorities with root cause + suggested workflow." },
      { t: "Strategic Intelligence", d: "Drill into Succession, Manager Effectiveness, Forecasting and Compliance." },
      { t: "HR Copilot", d: "Conversational AI with grounded answers and pending approvals." },
    ],
    next: [
      "Open the Attrition banner → Add Actions to dispatch a retention play.",
      "Click 'Employees Impacted: 7' to drill into the at-risk roster.",
      "Approve any pending items in the Copilot panel.",
    ],
    faqs: [
      { q: "How does AI generate recommendations?", a: "Each recommendation combines pulse signals, sentiment, calendar load, comp benchmarks and exit data — every action shows confidence + source signals." },
      { q: "Can I trust the confidence score?", a: "Confidence reflects model agreement across signals. Above 85% is high-confidence; 70–84% is directional. Always shown next to the action." },
      { q: "What does 'Add Actions' do?", a: "It queues the recommended workflow into your action plan with owners, due dates and follow-ups — nothing is executed without your approval." },
    ],
  },
  "/workforce": {
    title: "Workforce Intelligence",
    intro: "Span-of-control issues and sentiment hotspots across your organisation.",
    what: "Detects structural workforce issues (over-large teams, missing managers) and emotional patterns from pulse, exit and 1:1 signals.",
    widgets: [
      { t: "Span-of-Control Issues", d: "Each card shows AI root cause + recommended structural action." },
      { t: "Sentiment Heatmap", d: "Darker cells = lower sentiment; hover for the underlying signals." },
    ],
    next: ["Address the highest-severity span issues first.", "Dispatch a pulse follow-up where sentiment dropped > 5pts."],
    faqs: [
      { q: "Where does sentiment data come from?", a: "Anonymised pulse responses, 1:1 transcripts (opt-in), and Slack/Teams reaction signals." },
    ],
  },
  "/hiring": {
    title: "AI Hiring Command Center",
    intro: "Run requisitions, candidate intelligence and onboarding from one screen.",
    what: "End-to-end recruiting OS with funnel analytics, AI fit scoring, internal fulfillment recommendations and offer-acceptance prediction.",
    widgets: [
      { t: "Hiring Control Tower", d: "8 KPIs spotting SLA breaches and critical-role risk." },
      { t: "Pipeline Health", d: "Per-role view with bottleneck detection." },
      { t: "Candidate Intelligence", d: "AI fit score, salary benchmark, attrition risk." },
      { t: "Ask Hiring AI", d: "Tap a suggested question to read AI analysis inline." },
    ],
    next: ["Approve the 6 pending offers.", "Open any candidate to see fitment + diversity insight.", "Convert internal-fulfillment matches first."],
    faqs: [
      { q: "How is fit score calculated?", a: "Skill match, trajectory, market signal, and predicted retention combine into a 0-100 score." },
      { q: "What is internal fulfillment?", a: "AI scans the skills graph and flags employees who match an open role within 90% — usually a faster, cheaper hire." },
    ],
  },
  "/engagement": {
    title: "Engagement & Retention",
    intro: "Pulse, 1:1s and exit drivers in one workspace.",
    what: "Combines pulse trends, employee 360s, suggested 1:1s and exit-correlation analysis to drive retention plays.",
    widgets: [
      { t: "Engagement Hub", d: "Pulse, eNPS and burnout indices." },
      { t: "1:1 Intelligence", d: "Open any employee for an AI-prepped meeting workspace." },
      { t: "Exit Analysis", d: "Top correlated reasons + retention plays." },
    ],
    next: ["Run the suggested 1:1 with Rahul Sharma.", "Schedule a wellbeing nudge for high-burnout teams."],
    faqs: [{ q: "What inputs feed the 1:1 prep?", a: "Recent 1:1 notes, pulse trend, comp variance, calendar load, peer feedback and career signals." }],
  },
  "/learning": {
    title: "Learning & Skill Gaps",
    intro: "Plan upskilling against future workforce needs.",
    what: "Maps your skill supply vs. forecasted demand by role family, then ranks programmes by ROI.",
    widgets: [
      { t: "Skill Heatmap", d: "Identify supply / demand gaps by role family." },
      { t: "Recommended Programmes", d: "AI matches programmes to highest-ROI gaps." },
    ],
    next: ["Launch the GenAI bootcamp for Data Eng.", "Auto-nudge employees with overdue PDPA training."],
    faqs: [{ q: "How is ROI estimated?", a: "Predicted retention lift × replacement cost saved + revenue impact of skill availability." }],
  },
  "/performance": {
    title: "Performance & Compensation",
    intro: "Calibrate ratings and benchmark pay vs. Singapore market.",
    what: "Combines performance distribution, market pay variance and equity signals.",
    widgets: [
      { t: "Distribution Chart", d: "Check rating skew and outliers." },
      { t: "Pay vs Market", d: "Drill into employees below benchmark." },
    ],
    next: ["Run market correction for the 4 below-band employees.", "Calibrate Q4 ratings before sign-off."],
    faqs: [{ q: "Whose benchmark is used?", a: "Mercer + Aon SG technology benchmarks, refreshed quarterly." }],
  },
  "/succession": {
    title: "Succession Planning Intelligence",
    intro: "Critical roles, bench strength and leadership pipeline.",
    what: "Tracks readiness, vacancy risk and AI-recommended development actions per critical role.",
    widgets: [
      { t: "Critical Roles", d: "Vacancy risk and successor count per seat." },
      { t: "9-Box / Readiness", d: "Find ready-now and ready-later successors." },
      { t: "Development Actions", d: "AI-suggested mentorship and rotations." },
    ],
    next: ["Open the Cloud Platform Head gap and assign a mentor.", "Promote the ready-now successor for VP Data."],
    faqs: [{ q: "How is readiness scored?", a: "Performance, leadership signal, scope, time-in-role and 360 feedback combined." }],
  },
  "/compliance": {
    title: "Compliance & Workforce Risk",
    intro: "PDPA, work-pass and mandatory training in one view.",
    what: "Singapore-focused regulatory posture with severity, SLA, and AI-suggested escalations.",
    widgets: [
      { t: "Open Alerts", d: "Severity-ranked list with SLA timer." },
      { t: "Training Due", d: "Bulk-nudge employees in one click." },
      { t: "Posture", d: "Coverage % per regulation." },
    ],
    next: ["Resolve the 3 high-severity items today.", "Trigger work-pass renewals for employees expiring within 60 days."],
    faqs: [{ q: "Does this auto-file with MOM?", a: "It prepares the submission packet but never files without HR approval." }],
  },
};

const fallback: Guide = {
  title: "Page Help",
  intro: "Quick guidance for this screen.",
  what: "Use the AI Copilot to ask any question. Most cards open a richer detail page.",
  widgets: [{ t: "Drill into cards", d: "Most cards open a detail page with charts and recommendations." }],
  next: ["Use the global ⌘K search to jump to any module."],
  faqs: [],
};

function FaqItem({ f }: { f: Faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full text-left px-3 py-2 flex items-start gap-2 hover:bg-muted/50">
        <span className="flex-1 text-[12px] font-medium leading-snug">{f.q}</span>
        <ChevronDown className={`size-3.5 mt-0.5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="px-3 pb-3 text-[11.5px] text-muted-foreground leading-relaxed border-t border-border bg-muted/30">{f.a}</p>}
    </div>
  );
}

export function FloatingHelp() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const key = Object.keys(guides)
    .filter((k) => pathname === k || (k !== "/" && pathname.startsWith(k)))
    .sort((a, b) => b.length - a.length)[0];
  const g = (key && guides[key]) || fallback;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        title="Page help & guidance"
        className="fixed bottom-6 right-6 z-40 size-12 rounded-full gradient-ai text-ai-foreground shadow-elevated flex items-center justify-center hover:scale-105 transition-transform"
      >
        <HelpCircle className="size-5" />
        <span className="absolute -top-1 -right-1 size-3 rounded-full bg-success border-2 border-background animate-pulse" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-end p-4 bg-foreground/30 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div
            className="w-full max-w-md bg-surface rounded-2xl border border-border shadow-elevated overflow-hidden md:mr-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-4 gradient-ai text-ai-foreground flex items-center gap-2">
              <Sparkles className="size-4" />
              <div className="flex-1">
                <div className="text-[10px] uppercase tracking-wider opacity-80">AI Help Assistant</div>
                <div className="text-sm font-semibold">{g.title}</div>
              </div>
              <button onClick={() => setOpen(false)} className="p-1 rounded-md hover:bg-white/15">
                <X className="size-4" />
              </button>
            </div>
            <div className="p-5 space-y-5 max-h-[70vh] overflow-auto">
              <div>
                <div className="flex items-center gap-1.5 mb-1 text-ai">
                  <Compass className="size-3.5" />
                  <span className="text-[10px] uppercase tracking-wider font-semibold">What this page does</span>
                </div>
                <p className="text-[13px] leading-snug">{g.intro}</p>
                <p className="text-[12px] text-muted-foreground leading-snug mt-1.5">{g.what}</p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 mb-2 text-ai">
                  <Zap className="size-3.5" />
                  <span className="text-[10px] uppercase tracking-wider font-semibold">Quick walkthrough</span>
                </div>
                <ol className="space-y-2">
                  {g.widgets.map((s, i) => (
                    <li key={s.t} className="flex gap-2.5">
                      <span className="size-5 shrink-0 rounded-full bg-ai/10 text-ai text-[10px] font-semibold flex items-center justify-center">{i + 1}</span>
                      <div>
                        <div className="text-[12.5px] font-semibold leading-snug">{s.t}</div>
                        <div className="text-[11.5px] text-muted-foreground leading-snug">{s.d}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-xl bg-ai/5 border border-ai/20 p-3.5">
                <div className="flex items-center gap-1.5 mb-2 text-ai">
                  <Lightbulb className="size-3.5" />
                  <span className="text-[10px] uppercase tracking-wider font-semibold">What should I do next?</span>
                </div>
                <ul className="space-y-1.5">
                  {g.next.map((n) => (
                    <li key={n} className="flex items-start gap-2 text-[12px] leading-snug">
                      <span className="size-1.5 rounded-full bg-ai mt-1.5 shrink-0" />
                      <span>{n}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {g.faqs.length > 0 && (
                <div>
                  <div className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-2">Frequently asked</div>
                  <div className="space-y-1.5">
                    {g.faqs.map((f) => <FaqItem key={f.q} f={f} />)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
