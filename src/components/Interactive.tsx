import { useState, type ReactNode } from "react";

/* ---------- Reveal Cards: click to flip a fact card ---------- */
export type Reveal = { label: string; detail: string; icon?: string };

export function RevealGrid({ items }: { items: Reveal[] }) {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const toggle = (i: number) => {
    const n = new Set(open);
    n.has(i) ? n.delete(i) : n.add(i);
    setOpen(n);
  };
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {items.map((it, i) => {
        const isOpen = open.has(i);
        return (
          <button
            key={i}
            onClick={() => toggle(i)}
            className={`text-left p-4 rounded-2xl border-2 transition-all min-h-[120px] ${
              isOpen
                ? "border-primary bg-primary/5 shadow-card"
                : "border-border bg-secondary/40 hover:border-primary/50 hover:bg-secondary"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              {it.icon && <span className="text-xl">{it.icon}</span>}
              <span className="font-semibold">{it.label}</span>
            </div>
            <p className={`text-sm transition-all ${isOpen ? "text-foreground/90" : "text-muted-foreground italic"}`}>
              {isOpen ? it.detail : "Tap to reveal"}
            </p>
          </button>
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
