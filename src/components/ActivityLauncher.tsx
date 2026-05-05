import { useState, type ReactNode } from "react";

export type Activity = {
  id: string;
  label: string;
  emoji?: string;
  desc: string;
  render: () => ReactNode;
};

export function ActivityLauncher({ activities, heading = "Practise what you've learnt" }: { activities: Activity[]; heading?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl font-bold">{heading}</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {activities.map((a) => {
          const isActive = active === a.id;
          return (
            <button
              key={a.id}
              onClick={() => setActive(isActive ? null : a.id)}
              className={`text-left rounded-2xl border-2 p-5 transition-all ${
                isActive
                  ? "border-primary bg-primary/10 shadow-glow"
                  : "border-border bg-card hover:border-primary hover:-translate-y-0.5"
              }`}
            >
              {a.emoji && <div className="text-3xl mb-2">{a.emoji}</div>}
              <h3 className="font-display text-xl font-bold">{a.label}</h3>
              <p className="text-sm text-muted-foreground mt-1">{a.desc}</p>
              <p className="mt-3 text-sm font-semibold text-primary">{isActive ? "Hide ↑" : "Start →"}</p>
            </button>
          );
        })}
      </div>
      {active && (
        <div>{activities.find((a) => a.id === active)?.render()}</div>
      )}
    </div>
  );
}
