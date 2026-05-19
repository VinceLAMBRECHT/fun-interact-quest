import { useState, type ReactNode } from "react";

/* ---------- Reveal Cards: click to flip a fact card ---------- */
export type Reveal = { label: string; detail: string; icon?: string };

const ACCENTS = [
  "from-emerald-500/15 to-teal-500/5 border-emerald-500/40 hover:border-emerald-400",
  "from-sky-500/15 to-blue-500/5 border-sky-500/40 hover:border-sky-400",
  "from-violet-500/15 to-fuchsia-500/5 border-violet-500/40 hover:border-violet-400",
  "from-amber-500/15 to-orange-500/5 border-amber-500/40 hover:border-amber-400",
  "from-rose-500/15 to-pink-500/5 border-rose-500/40 hover:border-rose-400",
  "from-cyan-500/15 to-teal-500/5 border-cyan-500/40 hover:border-cyan-400",
];

export function RevealGrid({ items, clickToReveal = false }: { items: Reveal[]; clickToReveal?: boolean }) {
  const [hover, setHover] = useState<number | null>(null);
  const [opened, setOpened] = useState<Set<number>>(new Set());
  const toggle = (i: number) =>
    setOpened((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {items.map((it, i) => {
        const accent = ACCENTS[i % ACCENTS.length];
        const isHover = hover === i;
        const isOpen = opened.has(i);
        const interactive = clickToReveal;
        return (
          <div
            key={i}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            onClick={() => interactive && toggle(i)}
            role={interactive ? "button" : undefined}
            tabIndex={interactive ? 0 : undefined}
            onKeyDown={(e) => {
              if (interactive && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                toggle(i);
              }
            }}
            className={`group relative overflow-hidden p-4 rounded-2xl border-2 bg-gradient-to-br shadow-card transition-all duration-300 ${interactive ? "cursor-pointer" : "cursor-default"} ${accent} ${
              isHover ? "-translate-y-1 shadow-lg scale-[1.02]" : ""
            }`}
          >
            <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-white/5 blur-2xl pointer-events-none" />
            <div className="flex items-center gap-2 mb-2">
              {it.icon && (
                <span className={`text-2xl inline-block transition-transform duration-300 ${isHover || isOpen ? "scale-125 rotate-6" : ""}`}>
                  {it.icon}
                </span>
              )}
              <span className="font-display font-bold text-base leading-tight">{it.label}</span>
            </div>
            {interactive && !isOpen ? (
              <p className="text-sm font-semibold text-primary/90 inline-flex items-center gap-1 animate-fade-in">
                Tap to reveal <span aria-hidden>→</span>
              </p>
            ) : (
              <p className="text-sm text-foreground/85 leading-relaxed animate-fade-in">{it.detail}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Tabs ---------- */
export function TabsPanel({ tabs }: { tabs: { label: string; icon?: string; content: ReactNode }[] }) {
  const [i, setI] = useState(0);
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {tabs.map((t, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              i === idx
                ? "bg-primary text-primary-foreground shadow-card"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
            }`}
          >
            {t.icon && <span className="mr-1.5">{t.icon}</span>}
            {t.label}
          </button>
        ))}
      </div>
      <div className="rounded-3xl border border-border bg-card p-6 shadow-card">{tabs[i].content}</div>
    </div>
  );
}

/* ---------- Do / Don't split ---------- */
export function DoDont({ doItems, dontItems }: { doItems: string[]; dontItems: string[] }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="rounded-2xl border-2 border-success/40 bg-success/5 p-5">
        <p className="font-display font-bold text-success mb-3">✓ Do</p>
        <ul className="space-y-2 text-sm">
          {doItems.map((d, i) => <li key={i} className="flex gap-2"><span>✓</span><span>{d}</span></li>)}
        </ul>
      </div>
      <div className="rounded-2xl border-2 border-destructive/40 bg-destructive/5 p-5">
        <p className="font-display font-bold text-destructive mb-3">✗ Avoid</p>
        <ul className="space-y-2 text-sm">
          {dontItems.map((d, i) => <li key={i} className="flex gap-2"><span>✗</span><span>{d}</span></li>)}
        </ul>
      </div>
    </div>
  );
}

/* ---------- Accordion ---------- */
export function Accordion({ items }: { items: { q: string; a: ReactNode }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-2">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full text-left px-5 py-4 flex items-center justify-between gap-3 hover:bg-secondary/40 transition"
            >
              <span className="font-semibold">{it.q}</span>
              <span className={`text-primary transition-transform ${isOpen ? "rotate-45" : ""}`}>＋</span>
            </button>
            {isOpen && <div className="px-5 pb-5 text-sm text-foreground/85 leading-relaxed">{it.a}</div>}
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Stat counters ---------- */
export function StatGrid({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((s, i) => (
        <div key={i} className="p-4 rounded-2xl bg-gradient-hero border border-border text-center">
          <p className="font-display text-3xl font-bold text-gradient">{s.value}</p>
          <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
