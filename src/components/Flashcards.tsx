import { useState } from "react";

export type Card = { front: string; back: string };

export function Flashcards({ cards }: { cards: Card[] }) {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const c = cards[i];

  return (
    <div>
      <div
        onClick={() => setFlipped((f) => !f)}
        className="cursor-pointer rounded-3xl border border-border bg-gradient-hero p-10 min-h-[260px] flex items-center justify-center text-center shadow-card hover:shadow-glow transition-all select-none"
      >
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
            {flipped ? "Definition" : "Term"} · click to flip
          </p>
          <p className="font-display text-2xl sm:text-3xl">
            {flipped ? c.back : c.front}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-5">
        <button
          onClick={() => { setI((i - 1 + cards.length) % cards.length); setFlipped(false); }}
          className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground font-medium hover:bg-secondary/70"
        >
          ← Prev
        </button>
        <span className="text-sm text-muted-foreground">{i + 1} / {cards.length}</span>
        <button
          onClick={() => { setI((i + 1) % cards.length); setFlipped(false); }}
          className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground font-medium hover:bg-secondary/70"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
