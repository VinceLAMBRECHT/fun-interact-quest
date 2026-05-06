import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { useEffect, useMemo, useRef, useState } from "react";
import gamesImg from "@/assets/games.jpg";

export const Route = createFileRoute("/games")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Test Your Learning" },
      { name: "description", content: "Play interactive games to revise: matching, sorting, true/false rapid-fire and more." },
    ],
  }),
});

/* ---------------- MATCH-UP GAME ---------------- */
const matchPairs = [
  { term: "E-waste", def: "Discarded electronic devices" },
  { term: "DPA 2018", def: "Law protecting personal data in UK" },
  { term: "Cookie", def: "Small file stored when visiting a site" },
  { term: "Digital footprint", def: "Trail of personal data left online" },
  { term: "WEEE", base: "WEEE", def: "Recycling rules for electronic waste" },
  { term: "Smart lighting", def: "Lights that switch off when not needed" },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function MatchGame() {
  const [terms] = useState(() => shuffle(matchPairs.map((p, i) => ({ ...p, id: i }))));
  const [defs] = useState(() => shuffle(matchPairs.map((p, i) => ({ ...p, id: i }))));
  const [selT, setSelT] = useState<number | null>(null);
  const [selD, setSelD] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [wrong, setWrong] = useState(false);

  useEffect(() => {
    if (selT !== null && selD !== null) {
      if (selT === selD) {
        setMatched((m) => new Set(m).add(selT));
        setSelT(null); setSelD(null);
      } else {
        setWrong(true);
        setTimeout(() => { setSelT(null); setSelD(null); setWrong(false); }, 600);
      }
    }
  }, [selT, selD]);

  const done = matched.size === matchPairs.length;

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-2xl font-bold">🎯 Match-up</h3>
        <span className="text-sm text-muted-foreground">{matched.size} / {matchPairs.length}</span>
      </div>
      {done ? (
        <div className="text-center py-10">
          <p className="text-5xl mb-3">🏆</p>
          <p className="font-display text-xl mb-4">All matched!</p>
          <button onClick={() => location.reload()} className="px-5 py-2 rounded-full bg-primary text-primary-foreground font-semibold">Play again</button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Terms</p>
            {terms.map((t) => {
              const isMatched = matched.has(t.id);
              const isSel = selT === t.id;
              return (
                <button
                  key={t.id}
                  disabled={isMatched}
                  onClick={() => setSelT(t.id)}
                  className={`w-full p-3 rounded-xl text-sm text-left font-medium border-2 transition-all ${
                    isMatched ? "opacity-30 border-success bg-success/10" :
                    isSel ? (wrong ? "border-destructive bg-destructive/15" : "border-primary bg-primary/15") :
                    "border-border bg-secondary/40 hover:border-primary"
                  }`}
                >{t.term}</button>
              );
            })}
          </div>
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Definitions</p>
            {defs.map((d) => {
              const isMatched = matched.has(d.id);
              const isSel = selD === d.id;
              return (
                <button
                  key={d.id}
                  disabled={isMatched}
                  onClick={() => setSelD(d.id)}
                  className={`w-full p-3 rounded-xl text-sm text-left font-medium border-2 transition-all ${
                    isMatched ? "opacity-30 border-success bg-success/10" :
                    isSel ? (wrong ? "border-destructive bg-destructive/15" : "border-accent bg-accent/15") :
                    "border-border bg-secondary/40 hover:border-accent"
                  }`}
                >{d.def}</button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- TRUE/FALSE RAPID FIRE ---------------- */
const tfQuestions = [
  { s: "Manufacture and disposal account for ~70% of a device's carbon footprint.", t: true },
  { s: "Around 80% of e-waste is recycled globally.", t: false, e: "Only ~20% is recycled." },
  { s: "The DPA 2018 has 7 principles.", t: true },
  { s: "Cookies are illegal in the EU.", t: false, e: "They're legal but require consent under PECR." },
  { s: "Planting a virus is an offence under the Computer Misuse Act.", t: true },
  { s: "Smart lighting increases energy use.", t: false, e: "It reduces energy use by switching off when not needed." },
  { s: "Patients own their NHS medical records.", t: false, e: "The NHS owns them; patients only have a right to view them." },
  { s: "A digital footprint is the trail of personal data you leave online.", t: true },
  { s: "Mining for raw materials has no environmental impact.", t: false, e: "It scars landscapes and disturbs wildlife." },
  { s: "Locating data centres in cool climates reduces cooling costs.", t: true },
];

function TrueFalseGame() {
  const [qs] = useState(() => shuffle(tfQuestions));
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(30);
  const [feedback, setFeedback] = useState<null | { ok: boolean; e?: string }>(null);
  const [done, setDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTime((t) => {
        if (t <= 1) { setDone(true); if (timerRef.current) clearInterval(timerRef.current); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const answer = (val: boolean) => {
    if (done) return;
    const q = qs[i];
    const ok = val === q.t;
    if (ok) setScore((s) => s + 1);
    setFeedback({ ok, e: q.e });
    setTimeout(() => {
      setFeedback(null);
      if (i + 1 >= qs.length) setDone(true);
      else setI(i + 1);
    }, 700);
  };

  const restart = () => {
    setI(0); setScore(0); setTime(30); setDone(false); setFeedback(null);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setTime((t) => {
      if (t <= 1) { setDone(true); return 0; }
      return t - 1;
    }), 1000);
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-2xl font-bold">⚡ True / False Rapid-Fire</h3>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-muted-foreground">Score: <strong className="text-foreground">{score}</strong></span>
          <span className={`px-3 py-1 rounded-full font-bold ${time <= 10 ? "bg-destructive/20 text-destructive" : "bg-secondary"}`}>{time}s</span>
        </div>
      </div>
      {done ? (
        <div className="text-center py-10">
          <p className="text-5xl mb-3">{score >= 7 ? "🔥" : "💪"}</p>
          <p className="font-display text-2xl mb-2">Final score: {score} / {qs.length}</p>
          <button onClick={restart} className="mt-4 px-5 py-2 rounded-full bg-primary text-primary-foreground font-semibold">Play again</button>
        </div>
      ) : (
        <div>
          <div className="min-h-[120px] flex items-center justify-center text-center p-6 bg-secondary/40 rounded-2xl mb-5">
            <p className="font-display text-xl">{qs[i].s}</p>
          </div>
          {feedback ? (
            <div className={`text-center p-4 rounded-2xl font-semibold ${feedback.ok ? "bg-success/20 text-success" : "bg-destructive/20"}`}>
              {feedback.ok ? "✓ Correct!" : "✗ Wrong"} {feedback.e && <p className="text-sm font-normal mt-1 opacity-90">{feedback.e}</p>}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => answer(true)} className="py-4 rounded-2xl bg-success/20 hover:bg-success/30 text-success font-bold text-lg border-2 border-success/40 transition">TRUE</button>
              <button onClick={() => answer(false)} className="py-4 rounded-2xl bg-destructive/20 hover:bg-destructive/30 font-bold text-lg border-2 border-destructive/40 transition">FALSE</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------------- SORT GAME ---------------- */
const sortItems = [
  { text: "Hacking into someone's email", cat: "Computer Misuse Act" },
  { text: "Selling user data without consent", cat: "DPA 2018" },
  { text: "Storing cookies without notice", cat: "PECR" },
  { text: "Planting a virus on a server", cat: "Computer Misuse Act" },
  { text: "Keeping data longer than needed", cat: "DPA 2018" },
  { text: "Tracking a user via cookies without asking", cat: "PECR" },
  { text: "Accessing a system to commit fraud", cat: "Computer Misuse Act" },
  { text: "Failing to keep data accurate", cat: "DPA 2018" },
];

const cats = ["DPA 2018", "Computer Misuse Act", "PECR"] as const;

function SortGame() {
  const [items] = useState(() => shuffle(sortItems));
  const [placed, setPlaced] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);

  const drag = (e: React.DragEvent, i: number) => e.dataTransfer.setData("i", String(i));
  const drop = (e: React.DragEvent, c: string) => {
    const i = Number(e.dataTransfer.getData("i"));
    setPlaced((p) => ({ ...p, [i]: c }));
  };

  const correct = items.filter((it, i) => placed[i] === it.cat).length;
  const allPlaced = Object.keys(placed).length === items.length;

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-2xl font-bold">📥 Drag &amp; Sort</h3>
        <span className="text-sm text-muted-foreground">Drag each scenario to the law that applies</span>
      </div>

      <div className="flex gap-2 flex-wrap mb-5">
        {items.map((it, i) => (
          placed[i] ? null : (
            <div key={i} draggable onDragStart={(e) => drag(e, i)}
              className="px-3 py-2 rounded-xl bg-secondary border border-border text-sm cursor-grab active:cursor-grabbing hover:border-primary">
              {it.text}
            </div>
          )
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        {cats.map((c) => (
          <div key={c} onDragOver={(e) => e.preventDefault()} onDrop={(e) => drop(e, c)}
            className="min-h-[160px] p-3 rounded-2xl border-2 border-dashed border-border bg-secondary/30">
            <p className="font-bold text-sm mb-2 text-gradient">{c}</p>
            <div className="space-y-1.5">
              {items.map((it, i) => placed[i] === c && (
                <div key={i} className={`px-2.5 py-1.5 rounded-lg text-xs border ${
                  checked ? (it.cat === c ? "bg-success/20 border-success/40" : "bg-destructive/20 border-destructive/40") : "bg-card border-border"
                }`}>{it.text}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <button onClick={() => { setPlaced({}); setChecked(false); }} className="px-4 py-2 rounded-full bg-secondary text-sm font-medium hover:bg-secondary/70">Reset</button>
        {checked ? (
          <p className="font-semibold">Score: <span className="text-gradient">{correct} / {items.length}</span></p>
        ) : (
          <button disabled={!allPlaced} onClick={() => setChecked(true)}
            className="px-5 py-2 rounded-full bg-primary text-primary-foreground font-semibold disabled:opacity-40">Check answers</button>
        )}
      </div>
    </div>
  );
}

/* ---------------- HANGMAN-STYLE GUESS ---------------- */
const wordBank = [
  { word: "RECYCLING", clue: "Helps reduce e-waste impact" },
  { word: "COOKIES", clue: "Stored in your browser when visiting sites" },
  { word: "FOOTPRINT", clue: "Digital trail you leave online" },
  { word: "LEGISLATION", clue: "Laws that protect personal data" },
  { word: "PRIVACY", clue: "Control over your own information" },
  { word: "MANUFACTURE", clue: "Stage with the highest carbon impact" },
];

function GuessGame() {
  const [round, setRound] = useState(() => wordBank[Math.floor(Math.random() * wordBank.length)]);
  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [lives, setLives] = useState(6);

  const letters = useMemo(() => "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""), []);
  const display = round.word.split("").map((l) => guessed.has(l) ? l : "_");
  const won = !display.includes("_");
  const lost = lives <= 0;

  const guess = (l: string) => {
    if (won || lost || guessed.has(l)) return;
    setGuessed((g) => new Set(g).add(l));
    if (!round.word.includes(l)) setLives((v) => v - 1);
  };

  const newRound = () => {
    setRound(wordBank[Math.floor(Math.random() * wordBank.length)]);
    setGuessed(new Set()); setLives(6);
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-2xl font-bold">🔤 Word Guess</h3>
        <span className="text-sm">Lives: {"❤️".repeat(Math.max(0, lives))}{"🖤".repeat(6 - Math.max(0, lives))}</span>
      </div>
      <p className="text-muted-foreground text-sm mb-3">Clue: <em>{round.clue}</em></p>
      <div className="text-center text-3xl sm:text-4xl font-display tracking-[0.3em] my-6 text-gradient">
        {display.join(" ")}
      </div>
      {(won || lost) ? (
        <div className="text-center">
          <p className="font-display text-xl mb-3">{won ? "🎉 You got it!" : `💀 The word was: ${round.word}`}</p>
          <button onClick={newRound} className="px-5 py-2 rounded-full bg-primary text-primary-foreground font-semibold">New word</button>
        </div>
      ) : (
        <div className="grid grid-cols-9 sm:grid-cols-13 gap-1.5">
          {letters.map((l) => {
            const used = guessed.has(l);
            const inWord = round.word.includes(l);
            return (
              <button key={l} onClick={() => guess(l)} disabled={used}
                className={`aspect-square rounded-lg text-sm font-bold transition ${
                  used ? (inWord ? "bg-success/30 text-success" : "bg-destructive/20 opacity-50") : "bg-secondary hover:bg-primary hover:text-primary-foreground"
                }`}>{l}</button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ---------------- QUIZ GAME ---------------- */
const quizQuestions = [
  // Environmental
  { q: "Roughly how much e-waste is produced globally each year?", options: ["5M tonnes", "20M tonnes", "50M tonnes", "200M tonnes"], answer: 2, explain: "About 50 million tonnes — only ~20% recycled." },
  { q: "What share of a device's footprint comes from manufacture & disposal?", options: ["10%", "30%", "50%", "70%"], answer: 3, explain: "Make + bin ≈ 70%; use ≈ 30%." },
  { q: "Which is NOT a benefit of responsible recycling?", options: ["Recovers metals", "Reduces leakage", "Increases mining", "Reduces toxins"], answer: 2 },
  { q: "Best way to cut your device's energy use?", options: ["Leave Bluetooth on", "Sleep + lower brightness", "Run apps in background", "Higher refresh rate"], answer: 1 },
  { q: "Smart lighting is an example of tech that…", options: ["Increases energy use", "Reduces energy use", "Has no impact", "Causes e-waste"], answer: 1 },
  // Personal data
  { q: "What is a digital footprint?", options: ["A device hardware ID", "Trail of personal data left online", "A type of cookie", "Your typing speed"], answer: 1 },
  { q: "In the UK, who owns medical records?", options: ["The patient", "The doctor", "The NHS", "Insurance"], answer: 2, explain: "The NHS owns them — patients only have a right to view." },
  { q: "Which is sensitive personal data?", options: ["Shoe size", "Political opinions", "Favourite colour", "Browser version"], answer: 1 },
  // Legislation
  { q: "How many DPA 2018 principles are there?", options: ["5", "6", "7", "10"], answer: 2 },
  { q: "Which DPA principle says collect only what is necessary?", options: ["Purpose limitation", "Storage limitation", "Data minimisation", "Accountability"], answer: 2 },
  { q: "Which is NOT covered by the Computer Misuse Act?", options: ["Hacking an account", "Planting a virus", "Saving cookies", "Access with intent to defraud"], answer: 2, explain: "Cookies fall under PECR." },
  { q: "Which regulation requires consent before using cookies?", options: ["DPA 2018", "CMA", "PECR", "WEEE"], answer: 2 },
  { q: "Who can a data subject complain to in the UK?", options: ["Police", "Information Commissioner", "Their MP", "The Home Office"], answer: 1 },
  // AI
  { q: "Machine learning is best described as…", options: ["Hard-coded rules", "Learning patterns from data", "A type of robot", "A spreadsheet"], answer: 1 },
  { q: "Narrow AI can…", options: ["Do anything a human can", "Only do tasks it was designed for", "Reprogram itself for new fields", "Feel emotions"], answer: 1 },
  { q: "Algorithmic bias is most often caused by…", options: ["Slow internet", "Biased training data", "Old hardware", "Cookies"], answer: 1 },
  { q: "Why is AI accountability difficult?", options: ["AI is open-source", "Black-box decisions are hard to explain", "Cookies block logs", "Robots refuse to help"], answer: 1 },
  // IP
  { q: "Copyright protection is…", options: ["Applied for", "Automatic on creation", "Bought yearly", "Granted by EU"], answer: 1 },
  { q: "How long does copyright last after the creator's death?", options: ["10 years", "20 years", "50 years", "70 years"], answer: 3 },
  { q: "Patents protect…", options: ["Logos", "Inventions", "Music", "Brand colours"], answer: 1 },
  { q: "A registered trademark uses which symbol?", options: ["©", "®", "™", "$"], answer: 1 },
  { q: "Which is open-source?", options: ["Adobe Photoshop", "Microsoft Windows", "Linux", "iTunes"], answer: 2 },
  { q: "Open-source software means…", options: ["Free of bugs", "Source code can be viewed & modified", "Owned by Microsoft", "Always paid"], answer: 1 },
  // Threats
  { q: "Which malware spreads without a host program?", options: ["Virus", "Worm", "Trojan", "Keylogger"], answer: 1 },
  { q: "Ransomware…", options: ["Spies on keystrokes", "Encrypts files & demands payment", "Slows networks", "Replaces icons"], answer: 1 },
  { q: "A zero-day vulnerability is…", options: ["Patched immediately", "Newly found, no patch yet", "Caused by users", "Always harmless"], answer: 1 },
  { q: "Botnets are typically built from…", options: ["Servers only", "Unsecured IoT devices", "Smartphones only", "Printers"], answer: 1 },
  { q: "Ethical hackers are called…", options: ["Black-hat", "Grey-hat", "White-hat", "Red-hat"], answer: 2 },
  // Social engineering
  { q: "Bulk fake emails leading to fake login pages is called…", options: ["Pretexting", "Phishing", "Baiting", "Shoulder-surfing"], answer: 1 },
  { q: "A USB stick left in a car park is an example of…", options: ["Phishing", "Baiting", "Quid pro quo", "Pretexting"], answer: 1 },
  { q: "Which is NOT a phishing red flag?", options: ["Generic greeting", "Spelling mistakes", "Use of your real name", "Urgency to act"], answer: 2 },
  { q: "Pretexting works by…", options: ["Watching the screen", "Pretending to be a trusted org & creating urgency", "Sending malware in USBs", "Using cookies"], answer: 1 },
  // Protection
  { q: "A firewall mainly…", options: ["Encrypts data", "Backs up files", "Filters network traffic", "Removes viruses"], answer: 2 },
  { q: "Asymmetric encryption uses…", options: ["No keys", "One shared key", "Two keys (public + private)", "Passwords only"], answer: 2 },
  { q: "Incremental backup copies…", options: ["Everything every time", "Only changed/new files", "Only system files", "Nothing"], answer: 1 },
  { q: "RAID protects against…", options: ["Cyberattacks", "Single disk failure", "Phishing", "Power cuts only"], answer: 1 },
  { q: "An AUP is mainly intended to…", options: ["Sell software", "Set rules for acceptable user behaviour", "Replace antivirus", "Speed up Wi-Fi"], answer: 1 },
  { q: "'Defence in depth' means…", options: ["One strong defence", "Layered defences", "Hiring more staff", "Using only firewalls"], answer: 1 },
];

function endMessage(score: number, total: number) {
  const pct = score / total;
  if (pct === 1) return { emoji: "🏆", title: "Perfect score!", text: "Outstanding — you've mastered every section." };
  if (pct >= 0.8) return { emoji: "🌟", title: "Excellent work!", text: "You really know your stuff. A small review and you're flawless." };
  if (pct >= 0.6) return { emoji: "👍", title: "Solid effort!", text: "Good understanding overall — revisit the tricky topics and try again." };
  if (pct >= 0.4) return { emoji: "💪", title: "Keep going!", text: "You're getting there. Re-read each section then come back." };
  return { emoji: "📚", title: "Time to revise!", text: "Take a fresh look at the three sections — every attempt makes it stick." };
}

function QuizGame() {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const q = quizQuestions[i];

  if (done) {
    const msg = endMessage(score, quizQuestions.length);
    return (
      <div className="rounded-3xl border border-border bg-card p-8 shadow-card text-center">
        <p className="text-5xl mb-3">{msg.emoji}</p>
        <h3 className="font-display text-2xl mb-2">{msg.title}</h3>
        <p className="text-4xl font-display font-bold text-gradient my-3">{score} / {quizQuestions.length}</p>
        <p className="text-muted-foreground max-w-md mx-auto mb-4">{msg.text}</p>
        <button onClick={() => { setI(0); setPicked(null); setScore(0); setDone(false); }}
          className="mt-3 px-5 py-2 rounded-full bg-primary text-primary-foreground font-semibold">Play again</button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-2xl font-bold">❓ Quiz Challenge</h3>
        <span className="text-sm text-muted-foreground">Q {i + 1} / {quizQuestions.length}</span>
      </div>
      <div className="h-1.5 bg-secondary rounded-full overflow-hidden mb-5">
        <div className="h-full bg-primary transition-all" style={{ width: `${(i / quizQuestions.length) * 100}%` }} />
      </div>
      <p className="font-display text-lg mb-5">{q.q}</p>
      <div className="grid gap-2.5">
        {q.options.map((opt, idx) => {
          const showResult = picked !== null;
          const isCorrect = idx === q.answer;
          const isPicked = picked === idx;
          return (
            <button key={idx} disabled={showResult}
              onClick={() => { setPicked(idx); if (idx === q.answer) setScore((s) => s + 1); }}
              className={`text-left p-3.5 rounded-2xl border-2 transition-all font-medium ${
                showResult
                  ? isCorrect ? "border-success bg-success/15" : isPicked ? "border-destructive bg-destructive/15" : "border-border opacity-60"
                  : "border-border bg-secondary/50 hover:border-primary"
              }`}>
              <span className="inline-block w-6 mr-2 text-muted-foreground">{String.fromCharCode(65 + idx)}.</span>{opt}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <>
          <div className={`mt-4 p-3 rounded-xl text-sm ${picked === q.answer ? "bg-success/15 text-success" : "bg-destructive/15"}`}>
            {picked === q.answer ? "✓ Correct! " : "✗ Not quite. "}{q.explain}
          </div>
          <div className="mt-4 flex justify-end">
            <button onClick={() => { if (i + 1 >= quizQuestions.length) setDone(true); else { setI(i + 1); setPicked(null); } }}
              className="px-5 py-2 rounded-full bg-primary text-primary-foreground font-semibold">
              {i + 1 >= quizQuestions.length ? "See score" : "Next →"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const GAMES = [
  { id: "match", label: "Match-up", emoji: "🎯", desc: "Pair terms with their definitions" },
  { id: "tf", label: "True / False Rapid-Fire", emoji: "⚡", desc: "Beat the 30-second clock" },
  { id: "sort", label: "Drag & Sort", emoji: "📥", desc: "Sort scenarios into the right law" },
  { id: "guess", label: "Word Guess", emoji: "🔤", desc: "Hangman-style word puzzle" },
  { id: "quiz", label: "Quiz Challenge", emoji: "❓", desc: "Multiple-choice with feedback" },
] as const;

type GameId = typeof GAMES[number]["id"];

function Page() {
  const [active, setActive] = useState<GameId | null>(null);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-10">
        <header className="grid md:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <span className="text-sm text-accent font-semibold tracking-wide uppercase">Test Your Learning</span>
            <h1 className="font-display text-5xl font-bold mt-2 mb-3">Choose your challenge</h1>
            <p className="text-muted-foreground text-lg">Five mini games covering all the content. Tap one to play.</p>
          </div>
          <img src={gamesImg} alt="Game controller" width={180} height={180} loading="lazy" className="rounded-2xl shadow-card w-32 sm:w-44 h-auto justify-self-end" />
        </header>

        <section className="grid sm:grid-cols-2 gap-4">
          {GAMES.map((g) => {
            const isActive = active === g.id;
            return (
              <button
                key={g.id}
                onClick={() => setActive(isActive ? null : g.id)}
                className={`text-left rounded-2xl border-2 p-5 transition-all ${
                  isActive
                    ? "border-primary bg-primary/10 shadow-glow"
                    : "border-border bg-card hover:border-primary hover:-translate-y-0.5"
                }`}
              >
                <div className="text-3xl mb-2">{g.emoji}</div>
                <h3 className="font-display text-xl font-bold">{g.label}</h3>
                <p className="text-sm text-muted-foreground mt-1">{g.desc}</p>
                <p className="mt-3 text-sm font-semibold text-primary">{isActive ? "Hide ↑" : "Play →"}</p>
              </button>
            );
          })}
        </section>

        {active === "match" && <MatchGame />}
        {active === "tf" && <TrueFalseGame />}
        {active === "sort" && <SortGame />}
        {active === "guess" && <GuessGame />}
        {active === "quiz" && <QuizGame />}
      </main>
    </div>
  );
}
