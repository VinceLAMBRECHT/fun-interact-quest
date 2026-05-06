import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Quiz } from "@/components/Quiz";
import { Flashcards } from "@/components/Flashcards";
import { TabsPanel, RevealGrid, Accordion } from "@/components/Interactive";
import { ActivityLauncher } from "@/components/ActivityLauncher";
import { TopicHero } from "@/components/TopicHero";
import heroImg from "@/assets/hero-ai.jpg";

export const Route = createFileRoute("/ai")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Artificial Intelligence" },
      { name: "description", content: "AI, machine learning, narrow AI, algorithmic bias and accountability." },
    ],
  }),
});

const definitions = [
  { label: "Artificial Intelligence", detail: "Computer systems that perform tasks needing human intelligence — pattern recognition, decision making, problem solving." },
  { label: "Machine Learning", detail: "A subset of AI. Algorithms learn from real-time data, improving without explicit rules." },
  { label: "Narrow AI", detail: "Designed for a single task or limited range. Cannot transfer knowledge to other tasks." },
  { label: "Robots", detail: "Programmable machines that interact with the world through sensors & actuators — many are AI-controlled." },
];

const examples = [
  { label: "Spam filters", detail: "Email systems learn to identify junk mail." },
  { label: "Facial recognition", detail: "Identifying people in photos and live video." },
  { label: "Voice assistants", detail: "Voice recognition in Alexa, Siri, Google Assistant." },
  { label: "Recommendations", detail: "Netflix, YouTube, Spotify suggesting what's next." },
  { label: "Self-driving cars", detail: "Sensing the road and reacting in real time." },
  { label: "Autonomous weapons", detail: "Lethal autonomous weapons systems — controversial use of AI." },
];

const bias = [
  { q: "Biased training data", a: "If the dataset used to train the AI is biased, the system inherits that bias." },
  { q: "Design flaws", a: "An algorithm may exaggerate bias rather than ignore it." },
  { q: "Developer prejudice", a: "Developers can unintentionally bake their own preconceptions into the system." },
];

const responsibility = [
  { label: "The creator", detail: "An error in the algorithm may produce unpredictable behaviour." },
  { label: "The data supplier", detail: "A small or biased training dataset will cause errors." },
  { label: "The user", detail: "If they overrule the AI or fail to exercise judgement, they're at fault." },
];

const quiz = [
  { q: "Machine learning is best described as…", options: ["Hard-coded rules", "Learning patterns from data", "A type of robot", "A spreadsheet"], answer: 1 },
  { q: "Narrow AI can…", options: ["Do anything a human can", "Only do tasks it was designed for", "Reprogram itself for new fields", "Feel emotions"], answer: 1 },
  { q: "Algorithmic bias is often caused by…", options: ["Slow internet", "Biased training data", "Old hardware", "Cookies"], answer: 1 },
  { q: "Which is NOT an example of narrow AI?", options: ["Spam filter", "Voice assistant", "Self-driving car", "A general human-like intellect"], answer: 3 },
  { q: "Why is AI accountability hard?", options: ["AI is open-source", "Black-box decisions are hard to explain", "Cookies block logs", "Robots refuse to help"], answer: 1 },
];

const cards = [
  { front: "AI", back: "Computer systems performing tasks that need human intelligence." },
  { front: "Machine Learning", back: "Subset of AI — learns patterns from data without explicit rules." },
  { front: "Narrow AI", back: "Performs a single or limited range of tasks." },
  { front: "Algorithmic bias", back: "AI making prejudiced decisions due to biased data or design." },
  { front: "Black-box", back: "AI decisions are opaque, making accountability difficult." },
];

function Page() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        <TopicHero
          image={heroImg}
          eyebrow="Section 4"
          title="Artificial Intelligence"
          description="The benefits and the ethical & legal issues raised by AI and machine learning."
          accentClass="from-emerald-600/60 to-teal-500/30"
        />

        <section>
          <h2 className="font-display text-2xl font-bold mb-3">Key terms</h2>
          <TabsPanel tabs={[
            { label: "Definitions", icon: "📘", content: <RevealGrid items={definitions} /> },
            { label: "Examples", icon: "🤖", content: <RevealGrid items={examples} /> },
          ]} />
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold mb-3">Algorithmic bias</h2>
          <p className="text-sm text-muted-foreground mb-4">Three causes — tap to expand.</p>
          <Accordion items={bias} />
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold mb-3">Who's responsible when AI goes wrong?</h2>
          <RevealGrid items={responsibility} />
        </section>

        <ActivityLauncher activities={[
          { id: "flash", label: "Flashcards", desc: "Flip key terms and definitions.", render: () => <Flashcards cards={cards} /> },
          { id: "quiz", label: "Quick Quiz", emoji: "🧠", desc: "Multiple-choice questions that track your progress.", render: () => <Quiz questions={quiz} title="AI" /> },
        ]} />
      </main>
    </div>
  );
}
