import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, Sparkles, MessageSquare, AlertTriangle, TrendingDown, ChevronRight, CheckCircle2, Plus, Brain, Clock, ShieldAlert } from "lucide-react";
import { Layout } from "@/components/cockpit/Layout";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

export const Route = createFileRoute("/one-on-one/$slug")({
  component: OneOnOnePage,
  head: () => ({ meta: [{ title: "1:1 Workspace — AI HR Cockpit" }] }),
});

interface Person {
  name: string;
  role: string;
  team: string;
  manager: string;
  tenure: string;
  tag: string;
  riskLine: string;
  prev: { date: string; summary: string; outcomes: string[] };
  topics: { t: string; ai: string; sensitive?: boolean }[];
  questions: string[];
  actions: { t: string; owner: string; due: string; status: "Open" | "In progress" }[];
  sentiment: { m: string; v: number }[];
}

const data: Record<string, Person> = {
  "rahul-sharma": {
    name: "Rahul Sharma",
    role: "Senior Data Engineer",
    team: "AI Engineering · Singapore",
    manager: "M. Chen",
    tenure: "4 yrs 2 mo",
    tag: "Retention Risk · 89%",
    riskLine: "Compensation variance −14%, workload 52h/wk, 2 missed promotion cycles. Critical successor for VP Data.",
    prev: {
      date: "12 Apr 2026",
      summary: "Rahul raised compensation transparency concerns and asked about the GenAI architect track. Workload was acknowledged but no plan committed. He hinted at external conversations.",
      outcomes: [
        "Manager to share Q1 promotion calibration outcome — ✓ Done",
        "HR to benchmark comp band G7 — ⚠ Pending",
        "Reduce on-call rotation by 50% — ✗ Not started",
      ],
    },
    topics: [
      { t: "Workload & on-call rotation", ai: "Calendar load 52h/wk for 3 weeks. Recommend specific rebalance plan with names and dates — vague reassurance increases flight risk by 22%." },
      { t: "Compensation concerns", ai: "Be transparent. Pre-approved 12% correction (S$22K) ready. Lead with the number; don't ask him to wait for next cycle.", sensitive: true },
      { t: "Career path & GenAI track", ai: "Open the GenAI architect rotation explicitly. He's authored 3 RFCs — leverage that as the qualification narrative." },
      { t: "Internal mobility opportunities", ai: "Surface the VP Data successor pathway. He doesn't realise he's #1 internally." },
    ],
    questions: [
      "What would make the next 6 months feel like real progress to you?",
      "Where are you spending energy that doesn't feel like it matters?",
      "If we could solve one thing this quarter, what would it be?",
      "How are you feeling about the team's direction post-reorg?",
    ],
    actions: [
      { t: "Confirm 12% comp correction in writing", owner: "M. Chen", due: "Within 48h", status: "Open" },
      { t: "Block on-call rotation for 30 days", owner: "Platform Lead", due: "This week", status: "Open" },
      { t: "Formal GenAI architect rotation offer", owner: "VP Data", due: "Q1 W3", status: "In progress" },
    ],
    sentiment: [
      { m: "Sep", v: 72 }, { m: "Oct", v: 68 }, { m: "Nov", v: 64 }, { m: "Dec", v: 58 }, { m: "Jan", v: 52 }, { m: "Feb", v: 48 }, { m: "Mar", v: 44 },
    ],
  },
  "sarah-lim": {
    name: "Sarah Lim", role: "AI Product Analyst", team: "Product · Singapore", manager: "J. Wong", tenure: "3 yrs",
    tag: "Career growth · 76%", riskLine: "Career stagnation signal. Strong successor for Head of AI Product.",
    prev: { date: "5 Apr 2026", summary: "Career growth raised. Asked about leadership tracks.", outcomes: ["Mentor pairing — ✓ Done", "Open AI Product track — ⚠ Pending"] },
    topics: [
      { t: "Career growth", ai: "Open the Head of AI Product successor pathway." },
      { t: "Leadership rotation", ai: "Sponsor into AI leadership cohort starting Q2." },
    ],
    questions: ["What does the next role look like for you?", "Where do you want more scope?"],
    actions: [{ t: "Sponsor into AI leadership rotation", owner: "J. Wong", due: "Q2 W1", status: "Open" }],
    sentiment: [{ m: "Sep", v: 70 }, { m: "Oct", v: 68 }, { m: "Nov", v: 65 }, { m: "Dec", v: 64 }, { m: "Jan", v: 62 }, { m: "Feb", v: 60 }, { m: "Mar", v: 58 }],
  },
  "jason-tan": {
    name: "Jason Tan", role: "Cloud Engineer", team: "Platform · Singapore", manager: "K. Tan", tenure: "5 yrs 6 mo",
    tag: "Manager disengagement · 71%", riskLine: "Low 1:1 cadence with manager. Burnout signals + limited learning hours.",
    prev: { date: "29 Mar 2026", summary: "Workload concern + lack of feedback raised.", outcomes: ["Workload review — ⚠ Pending"] },
    topics: [
      { t: "1:1 cadence with manager", ai: "Recommend skip-level + manager coaching for K. Tan.", sensitive: true },
      { t: "Workload rebalance", ai: "Rotate 1 engineer off project. Avg 51h/wk for 4 weeks." },
    ],
    questions: ["When did you last feel really seen by your manager?", "What's draining you right now?"],
    actions: [{ t: "Schedule skip-level 1:1", owner: "VP Platform", due: "This week", status: "Open" }],
    sentiment: [{ m: "Sep", v: 66 }, { m: "Oct", v: 64 }, { m: "Nov", v: 60 }, { m: "Dec", v: 58 }, { m: "Jan", v: 55 }, { m: "Feb", v: 52 }, { m: "Mar", v: 50 }],
  },
};

function statusTone(s: string) {
  return s === "Open" ? "bg-warning/10 text-warning" : "bg-info/10 text-info";
}

function OneOnOnePage() {
  const { slug } = Route.useParams();
  const p = data[slug];
  if (!p) throw notFound();

  const [selected, setSelected] = useState<Set<number>>(new Set([0, 1, 2]));
  const toggle = (i: number) => {
    const next = new Set(selected);
    next.has(i) ? next.delete(i) : next.add(i);
    setSelected(next);
  };

  return (
    <Layout>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <Link to="/at-risk" className="text-[11px] text-muted-foreground hover:text-ai inline-flex items-center gap-1">
            ← Back to At-Risk Roster
          </Link>
          <div className="text-[10px] uppercase tracking-wider text-ai font-semibold mt-2">AI-Powered 1:1 Workspace</div>
          <h1 className="text-2xl font-semibold">1:1 with {p.name}</h1>
          <p className="text-sm text-muted-foreground">{p.role} · {p.team} · Tenure {p.tenure} · Manager {p.manager}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full bg-destructive/10 text-destructive border border-destructive/20">
            <ShieldAlert className="size-3" /> {p.tag}
          </span>
          <button className="px-4 py-2 rounded-lg gradient-ai text-ai-foreground text-xs font-semibold inline-flex items-center gap-1.5">
            <Calendar className="size-3.5" /> Schedule 1:1
          </button>
        </div>
      </div>

      <div className="rounded-2xl gradient-primary text-primary-foreground p-5 shadow-elevated relative overflow-hidden">
        <div className="absolute -top-20 -right-20 size-64 rounded-full bg-ai/30 blur-3xl" />
        <div className="relative flex items-start gap-3">
          <div className="size-10 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center shrink-0">
            <Sparkles className="size-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider opacity-80 mb-0.5">AI Pre-Brief</div>
            <p className="text-[14px] font-medium leading-snug">{p.riskLine}</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-surface rounded-2xl border border-border shadow-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-ai font-semibold">Previous discussion</div>
                <h3 className="text-base font-semibold">{p.prev.date}</h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted">AI summary</span>
            </div>
            <p className="text-[13px] text-muted-foreground leading-snug mb-3">{p.prev.summary}</p>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">Outcomes from last time</div>
            <ul className="space-y-1.5">
              {p.prev.outcomes.map((o) => (
                <li key={o} className="text-[12.5px] flex items-start gap-2"><ChevronRight className="size-3 mt-1 text-ai shrink-0" />{o}</li>
              ))}
            </ul>
          </div>

          <div className="bg-surface rounded-2xl border border-border shadow-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-ai font-semibold">AI-Suggested Discussion Areas</div>
                <h3 className="text-base font-semibold">Talking points · select to add to agenda</h3>
              </div>
              <span className="text-[11px] text-muted-foreground">{selected.size} selected</span>
            </div>
            <div className="space-y-2">
              {p.topics.map((t, i) => {
                const checked = selected.has(i);
                return (
                  <button
                    key={t.t}
                    onClick={() => toggle(i)}
                    className={`w-full text-left flex items-start gap-3 p-3.5 rounded-xl border transition-all ${
                      checked ? "border-ai bg-ai/5" : "border-border hover:bg-muted/40"
                    }`}
                  >
                    <div className={`size-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${checked ? "bg-ai border-ai text-ai-foreground" : "border-border"}`}>
                      {checked && <CheckCircle2 className="size-3.5" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <div className="text-sm font-semibold">{t.t}</div>
                        {t.sensitive && <span className="text-[9px] px-1.5 py-0.5 rounded bg-warning/10 text-warning inline-flex items-center gap-0.5"><AlertTriangle className="size-2.5" />Sensitive</span>}
                      </div>
                      <div className="text-[12px] text-muted-foreground leading-snug flex items-start gap-1.5">
                        <Brain className="size-3 mt-0.5 text-ai shrink-0" />{t.ai}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-surface rounded-2xl border border-border shadow-card p-5">
            <div className="text-[10px] uppercase tracking-wider text-ai font-semibold">AI-Recommended Questions</div>
            <h3 className="text-base font-semibold mb-3">Open the conversation</h3>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {p.questions.map((q) => (
                <div key={q} className="flex items-start gap-2 p-3 rounded-xl bg-ai/5 border border-ai/20">
                  <MessageSquare className="size-3.5 text-ai mt-0.5 shrink-0" />
                  <p className="text-[12.5px] leading-snug">{q}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface rounded-2xl border border-border shadow-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-ai font-semibold">Action Tracker</div>
                <h3 className="text-base font-semibold">Agreed actions · owners · due dates</h3>
              </div>
              <button className="text-[11px] px-2.5 py-1 rounded-md border border-border hover:bg-muted inline-flex items-center gap-1">
                <Plus className="size-3" /> Add action
              </button>
            </div>
            <div className="space-y-2">
              {p.actions.map((a) => (
                <div key={a.t} className="flex items-center gap-3 p-3 rounded-xl border border-border">
                  <div className="size-7 rounded-md bg-ai/10 text-ai flex items-center justify-center shrink-0"><CheckCircle2 className="size-3.5" /></div>
                  <div className="flex-1">
                    <div className="text-[13px] font-medium">{a.t}</div>
                    <div className="text-[10.5px] text-muted-foreground">Owner {a.owner} · Due {a.due}</div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${statusTone(a.status)}`}>{a.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-surface rounded-2xl border border-border shadow-card p-5">
            <div className="text-[10px] uppercase tracking-wider text-ai font-semibold">Sentiment trend · 7 mo</div>
            <h3 className="text-base font-semibold mb-2">Pulse trajectory</h3>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={p.sentiment}>
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                  <Line type="monotone" dataKey="v" stroke="oklch(0.6 0.2 25)" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
              <TrendingDown className="size-3 text-destructive" /> −28 pts over 7 months
            </div>
          </div>

          <div className="bg-surface rounded-2xl border border-border shadow-card p-5">
            <div className="text-[10px] uppercase tracking-wider text-ai font-semibold">Sensitive discussion guidance</div>
            <h3 className="text-base font-semibold mb-2">How to navigate</h3>
            <ul className="space-y-2 text-[12px]">
              {[
                "Lead with empathy. Acknowledge the comp gap before defending policy.",
                "Don't promise; commit. Bring the pre-approved number.",
                "If they hint at an offer, ask directly — don't guess.",
                "Close the loop: written summary within 24h.",
              ].map((g) => (
                <li key={g} className="flex items-start gap-2"><AlertTriangle className="size-3 text-warning mt-1 shrink-0" />{g}</li>
              ))}
            </ul>
          </div>

          <div className="bg-surface rounded-2xl border border-border shadow-card p-5">
            <div className="text-[10px] uppercase tracking-wider text-ai font-semibold">Follow-up reminders</div>
            <h3 className="text-base font-semibold mb-2">After the meeting</h3>
            <ul className="space-y-2 text-[12px]">
              <li className="flex items-start gap-2"><Clock className="size-3 text-ai mt-1 shrink-0" /> Send AI-drafted summary within 24h</li>
              <li className="flex items-start gap-2"><Clock className="size-3 text-ai mt-1 shrink-0" /> Pulse check-in scheduled for Day 7</li>
              <li className="flex items-start gap-2"><Clock className="size-3 text-ai mt-1 shrink-0" /> Re-evaluate retention score in 14 days</li>
            </ul>
          </div>

          <button className="w-full px-4 py-3 rounded-xl gradient-ai text-ai-foreground text-sm font-semibold inline-flex items-center justify-center gap-2 shadow-glow-ai">
            <Sparkles className="size-4" /> Add {selected.size} Actions to Plan
          </button>
        </div>
      </div>
    </Layout>
  );
}
