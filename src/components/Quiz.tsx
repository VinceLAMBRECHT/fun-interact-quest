import { useState } from "react";

export type QuizQuestion = {
  q: string;
  options: string[];
  answer: number;
  explain?: string;
};

export function Quiz({ questions, title }: { questions: QuizQuestion[]; title?: string }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="rounded-3xl border border-border bg-card p-8 shadow-card text-center">
        <h3 className="font-display text-2xl mb-2">Quiz Complete!</h3>
        <p className="text-5xl font-display font-bold text-gradient my-4">
          {score} / {questions.length}
        </p>
        <p className="text-muted-foreground mb-6">
          {score === questions.length ? "Perfect — Nailed it! 🎯" : score >= questions.length / 2 ? "Nearly there — keep going!" : "Had a look — try again!"}
        </p>
        <button
          onClick={() => { setI(0); setPicked(null); setScore(0); setDone(false); }}
          className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition"
        >
          Restart
        </button>
      </div>
    );
  }

  const q = questions[i];

  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-card">
      <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
        {title && <span className="font-medium">{title}</span>}
        <span>Question {i + 1} of {questions.length}</span>
      </div>
      <div className="h-1.5 bg-secondary rounded-full overflow-hidden mb-6">
        <div className="h-full bg-primary transition-all" style={{ width: `${((i) / questions.length) * 100}%` }} />
      </div>
      <h4 className="font-display text-xl sm:text-2xl mb-6">{q.q}</h4>
      <div className="grid gap-3">
        {q.options.map((opt, idx) => {
          const isPicked = picked === idx;
          const isCorrect = idx === q.answer;
          const showResult = picked !== null;
          return (
            <button
              key={idx}
              disabled={showResult}
              onClick={() => { setPicked(idx); if (idx === q.answer) setScore((s) => s + 1); }}
              className={`text-left p-4 rounded-2xl border-2 transition-all font-medium ${
                showResult
                  ? isCorrect
                    ? "border-success bg-success/15 text-success-foreground"
                    : isPicked
                      ? "border-destructive bg-destructive/15"
                      : "border-border opacity-60"
                  : "border-border bg-secondary/50 hover:border-primary hover:bg-secondary"
              }`}
            >
              <span className="inline-block w-6 mr-2 text-muted-foreground">{String.fromCharCode(65 + idx)}.</span>
              {opt}
            </button>
          );
        })}
      </div>
      {picked !== null && q.explain && (
        <p className="mt-5 p-4 rounded-xl bg-secondary/60 text-sm text-muted-foreground">
          💡 {q.explain}
        </p>
      )}
      {picked !== null && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => {
              if (i + 1 >= questions.length) setDone(true);
              else { setI(i + 1); setPicked(null); }
            }}
            className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition"
          >
            {i + 1 >= questions.length ? "See Results" : "Next →"}
          </button>
        </div>
      )}
    </div>
  );
}
