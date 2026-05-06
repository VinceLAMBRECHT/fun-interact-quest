import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Quiz } from "@/components/Quiz";
import { Flashcards } from "@/components/Flashcards";
import { TabsPanel, RevealGrid, Accordion } from "@/components/Interactive";
import { ActivityLauncher } from "@/components/ActivityLauncher";
import { TopicHero } from "@/components/TopicHero";
import heroImg from "@/assets/hero-personal-data.jpg";
import fingerprintImg from "@/assets/data-fingerprint.jpg";
import footprintImg from "@/assets/data-footprint.jpg";

export const Route = createFileRoute("/personal-data")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Personal Data" },
      { name: "description", content: "Digital footprint, ownership of data, benefits and drawbacks of personal data online." },
    ],
  }),
});

const examples = [
  { label: "Name", detail: "Identifies you directly." },
  { label: "Passport number", detail: "Unique government-issued ID." },
  { label: "Fingerprints", detail: "Biometric data — unique to you." },
  { label: "Ethnicity", detail: "Sensitive personal characteristic." },
  { label: "Medical record", detail: "Health information — highly protected." },
  { label: "Shopping history", detail: "Reveals habits and preferences." },
  { label: "Political opinions", detail: "Sensitive — extra protection in law." },
];

const footprintTraces = [
  { label: "Websites visited", detail: "Every site you load can be logged." },
  { label: "Emails sent", detail: "Metadata + content tracked by providers." },
  { label: "Social posts", detail: "Permanent record — even after deletion." },
  { label: "Card payments", detail: "Buying coffee with a card leaves a trace." },
  { label: "Google Maps", detail: "Route history reveals where you go." },
  { label: "Doctor's appt.", detail: "Booking systems store personal data." },
  { label: "Phone masts", detail: "Phones tracked between masts as you move." },
];

const benefits = [
  { label: "Personalisation", detail: "Offers tailored to your preferences and location." },
  { label: "Convenience", detail: "Card numbers and addresses only entered once." },
];

const drawbacks = [
  { label: "Privacy", detail: "Not always obvious who collects your data or why they pass it on." },
  { label: "Security", detail: "Data breaches happen often and can be financially damaging." },
  { label: "Civil liberties", detail: "Police analysis could wrongly link innocent people to crime." },
  { label: "Discrimination", detail: "Shared data could be used to discriminate against groups." },
];

const ownership = [
  { q: "Who owns a photo you post on social media?", a: "You retain the IP — but the company also gets rights to use it under their terms." },
  { q: "Who owns your UK medical records?", a: "The NHS owns them. You only have a right to view them — they are not your property." },
  { q: "What do online retailers do with your data?", a: "They sell shoppers' personal data to other retailers — Google sells search histories." },
];

const quiz = [
  { q: "Which is NOT personal data?", options: ["Passport number", "Fingerprints", "Public weather forecast", "Medical record"], answer: 2 },
  { q: "What is a 'digital footprint'?", options: ["A device hardware ID", "Trail of personal data left online", "A type of cookie", "Your typing speed"], answer: 1 },
  { q: "In the UK, who owns medical records?", options: ["The patient", "The doctor", "The NHS", "The government"], answer: 2 },
  { q: "Which is a BENEFIT of sharing personal data?", options: ["Identity theft", "Personalisation & convenience", "Discrimination", "Lost civil liberties"], answer: 1 },
  { q: "Why are shared datasets a civil-liberties concern?", options: ["Use too much storage", "Wrongly link innocents to crime", "Slow internet", "Raise tax"], answer: 1 },
  { q: "Who might collect your personal data online?", options: ["Advertisers", "Employers", "Law enforcement", "All of the above"], answer: 3 },
];

const cards = [
  { front: "Personal data", back: "Information relating to a known individual or one whose identity can be deduced." },
  { front: "Digital footprint", back: "The trail of personal data left behind each time someone uses the internet." },
  { front: "Personalisation", back: "Tailored offers based on preferences and location." },
  { front: "Medical records (UK)", back: "Owned by the NHS — patients have a right to view." },
  { front: "Discrimination risk", back: "Analysis of shared data could lead to unfair treatment of groups." },
];

function Page() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        <TopicHero
          image={heroImg}
          eyebrow="Section 2"
          title="Personal Data"
          description="Digital footprints, who owns the data, and the benefit-vs-risk trade-off."
          accentClass="from-fuchsia-600/60 to-cyan-500/30"
        />

        <section>
          <h2 className="font-display text-2xl font-bold mb-3">Is it personal data?</h2>
          <p className="text-sm text-muted-foreground mb-4">Tap to confirm what counts as personal data.</p>
          <RevealGrid items={examples} />
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold mb-3">Your digital footprint</h2>
          <TabsPanel tabs={[
            { label: "What you leave behind", content: <RevealGrid items={footprintTraces} /> },
            { label: "Benefits", content: <RevealGrid items={benefits} /> },
            { label: "Drawbacks", content: <RevealGrid items={drawbacks} /> },
          ]} />
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold mb-3">Who owns the data?</h2>
          <Accordion items={ownership} />
        </section>

        <ActivityLauncher activities={[
          { id: "flash", label: "Flashcards", desc: "Flip key terms and definitions.", render: () => <Flashcards cards={cards} /> },
          { id: "quiz", label: "Quick Quiz", emoji: "🧠", desc: "Multiple-choice questions that track your progress.", render: () => <Quiz questions={quiz} title="Personal Data" /> },
        ]} />
      </main>
    </div>
  );
}
