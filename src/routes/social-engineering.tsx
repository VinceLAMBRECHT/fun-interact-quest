import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Quiz } from "@/components/Quiz";
import { Flashcards } from "@/components/Flashcards";
import { RevealGrid, Accordion } from "@/components/Interactive";
import { ActivityLauncher } from "@/components/ActivityLauncher";
import { TopicHero } from "@/components/TopicHero";
import heroImg from "@/assets/hero-social.jpg";

export const Route = createFileRoute("/social-engineering")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Social Engineering" },
      { name: "description", content: "Phishing, pretexting, baiting, quid pro quo and shoulder-surfing." },
    ],
  }),
});

const techniques = [
  { q: "Phishing", a: "Fake emails from a 'reputable source' trick victims into entering credentials on a hacker-controlled website. Sent in bulk to thousands." },
  { q: "Pretexting (blagging)", a: "Hacker pretends to be from a trusted organisation and creates urgency to panic the victim into revealing information." },
  { q: "Baiting", a: "A free download or 'lost' USB stick laced with malware. Once opened, the device is infected." },
  { q: "Quid pro quo", a: "Victim trades login details for a 'service' like a free upgrade — the attacker installs malware during setup." },
  { q: "Shoulder-surfing", a: "Watching over a victim's shoulder, with binoculars or cameras, to steal PINs and passwords." },
];

const phishingSigns = [
  { label: "Spelling mistakes", detail: "Poorly written and full of typos." },
  { label: "'Click this link'", detail: "Asks you to click a link to log in or reset a password." },
  { label: "Urgency", detail: "Says you must act immediately or lose access." },
  { label: "Suspicious attachment", detail: "Unexpected attachment that wants opening." },
  { label: "Odd address", detail: "Sender email address doesn't match the company." },
  { label: "Generic greeting", detail: "'Dear Customer' instead of your real name." },
];

const quiz = [
  { q: "Which technique uses fake emails sent in bulk?", options: ["Pretexting", "Phishing", "Baiting", "Shoulder-surfing"], answer: 1 },
  { q: "A USB stick left in a car park is an example of…", options: ["Phishing", "Baiting", "Quid pro quo", "Pretexting"], answer: 1 },
  { q: "Pretexting works because…", options: ["Victims are bored", "Of urgency & trust", "Of weak passwords", "It's automatic"], answer: 1 },
  { q: "Which is NOT a phishing red flag?", options: ["Generic greeting", "Spelling mistakes", "Use of your real name", "Urgency to act"], answer: 2 },
  { q: "Shoulder-surfing relies on…", options: ["Malware", "Watching the victim type", "Phone calls", "Email"], answer: 1 },
];

const cards = [
  { front: "Social engineering", back: "Tricks that exploit human nature to steal information." },
  { front: "Phishing", back: "Bulk fake emails leading to a fake login page." },
  { front: "Pretexting", back: "Pretending to be a trusted organisation to extract info." },
  { front: "Baiting", back: "Free download or infected USB used as bait." },
  { front: "Quid pro quo", back: "Trade a 'service' for confidential information." },
  { front: "Shoulder-surfing", back: "Spying on someone typing passwords or PINs." },
];

function Page() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        <TopicHero
          image={heroImg}
          eyebrow="Section 7"
          title="Social Engineering"
          description="Hackers exploit human nature — not just code — to steal information."
          accentClass="from-emerald-700/60 to-teal-500/30"
        />

        <section>
          <h2 className="font-display text-2xl font-bold mb-3">Techniques</h2>
          <p className="text-sm text-muted-foreground mb-4">Tap each technique to learn how it works.</p>
          <Accordion items={techniques} />
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold mb-3">Spot a phishing email</h2>
          <RevealGrid items={phishingSigns} />
        </section>

        <ActivityLauncher activities={[
          { id: "flash", label: "Flashcards", desc: "Flip key terms and definitions.", render: () => <Flashcards cards={cards} /> },
          { id: "quiz", label: "Quick Quiz", emoji: "🧠", desc: "Multiple-choice questions that track your progress.", render: () => <Quiz questions={quiz} title="Social Engineering" /> },
        ]} />
      </main>
    </div>
  );
}
