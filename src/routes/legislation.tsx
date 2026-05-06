import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Quiz } from "@/components/Quiz";
import { Flashcards } from "@/components/Flashcards";
import { TabsPanel, RevealGrid, Accordion } from "@/components/Interactive";
import { ActivityLauncher } from "@/components/ActivityLauncher";
import { TopicHero } from "@/components/TopicHero";
import heroImg from "@/assets/hero-legislation.jpg";
import gavelImg from "@/assets/law-gavel.jpg";
import cookiesImg from "@/assets/law-cookies.jpg";

export const Route = createFileRoute("/legislation")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Legislation" },
      { name: "description", content: "DPA 2018, Computer Misuse Act 1990, cookies and PECR." },
    ],
  }),
});

const principles = [
  { label: "1. Lawfulness, fairness & transparency", detail: "Have a legitimate reason, tell people what data is for, get consent." },
  { label: "2. Purpose limitation", detail: "Only use data for the specific purpose it was collected for." },
  { label: "3. Data minimisation", detail: "Only collect as much data as is necessary." },
  { label: "4. Accuracy", detail: "Keep data accurate and act on requests to correct errors." },
  { label: "5. Storage limitation", detail: "Don't keep data for longer than necessary." },
  { label: "6. Security", detail: "Keep data secure — protect from loss or damage." },
  { label: "7. Accountability", detail: "Demonstrate your data-protection measures are adequate." },
];

const rights = [
  { label: "Withdraw consent", detail: "Pull permission for processing at any time." },
  { label: "Restrict processing", detail: "Limit how your data is used." },
  { label: "Data portability", detail: "Obtain and move your data for your own purposes." },
  { label: "Complain", detail: "Raise it with the Information Commissioner." },
  { label: "Be informed", detail: "Know what data is collected and why." },
  { label: "Erasure", detail: "Have your data erased (right to be forgotten)." },
];

const cma = [
  { q: "1. Unauthorised access to material", a: "E.g. logging into someone else's account without permission." },
  { q: "2. Unauthorised access with intent", a: "Hacking in to commit further offences — e.g. fraud, stealing card details." },
  { q: "3. Acts that cause damage", a: "Planting a virus or malware to impair a computer's operation." },
];

const cookieFacts = [
  { label: "What is it?", detail: "A small text file downloaded onto your computer when you visit a website." },
  { label: "Why useful?", detail: "Lets the site recognise your device and store your preferences." },
  { label: "PECR", detail: "Privacy & Electronic Communications Regulations — sites must ask consent before using cookies." },
  { label: "Opt out", detail: "Users can refuse and have data not collected this way." },
];

const quiz = [
  { q: "Which Act protects personal data in the UK today?", options: ["Computer Misuse Act 1990", "Data Protection Act 2018", "Copyright Act 1988", "Freedom of Information Act"], answer: 1 },
  { q: "How many DPA 2018 principles are there?", options: ["5", "6", "7", "10"], answer: 2 },
  { q: "Which principle says collect only what is necessary?", options: ["Purpose limitation", "Storage limitation", "Data minimisation", "Accountability"], answer: 2 },
  { q: "Which is NOT covered by the Computer Misuse Act?", options: ["Hacking an account", "Planting a virus", "Saving cookies", "Stealing data with intent to commit fraud"], answer: 2, explain: "Cookies are governed by PECR." },
  { q: "What is a cookie?", options: ["A small file stored when you visit a site", "Malware", "A browser tab", "An app icon"], answer: 0 },
  { q: "Which regulation requires consent before storing cookies?", options: ["DPA 2018", "Computer Misuse Act", "PECR", "WEEE"], answer: 2 },
  { q: "Under DPA 2018, which is a data subject's right?", options: ["Withdraw consent at any time", "Sell data back", "Hide data from courts", "Refuse to be billed"], answer: 0 },
  { q: "Which DPA principle says data must be kept up to date?", options: ["Accuracy", "Lawfulness", "Storage limitation", "Security"], answer: 0 },
];

const cards = [
  { front: "Data Protection Act 2018", back: "UK law on personal data — sets out 7 principles." },
  { front: "Computer Misuse Act 1990", back: "3 offences: unauthorised access, access with intent, damaging acts." },
  { front: "Cookie", back: "Small file downloaded when visiting a website — remembers preferences." },
  { front: "PECR", back: "Privacy & Electronic Communications Regs — requires cookie consent." },
  { front: "Information Commissioner", back: "UK regulator — data subjects can complain to them." },
  { front: "Data subject", back: "Individual whose personal data is being collected/processed." },
];

function Page() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        <TopicHero
          image={heroImg}
          eyebrow="Section 3"
          title="Legislation"
          description="DPA 2018, the Computer Misuse Act 1990 and the rules on cookies."
          accentClass="from-violet-700/60 to-amber-500/30"
        />

        <section>
          <h2 className="font-display text-2xl font-bold mb-3">Data Protection Act 2018</h2>
          <TabsPanel tabs={[
            { label: "7 Principles", content: <RevealGrid items={principles} /> },
            { label: "Your Rights", content: <RevealGrid items={rights} /> },
          ]} />
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold mb-3">Computer Misuse Act 1990</h2>
          <p className="text-sm text-muted-foreground mb-4">Three offences — tap to expand.</p>
          <Accordion items={cma} />
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold mb-3">Cookies & PECR</h2>
          <RevealGrid items={cookieFacts} />
        </section>

        <ActivityLauncher activities={[
          { id: "flash", label: "Flashcards", desc: "Flip key terms and definitions.", render: () => <Flashcards cards={cards} /> },
          { id: "quiz", label: "Quick Quiz", emoji: "🧠", desc: "Multiple-choice questions that track your progress.", render: () => <Quiz questions={quiz} title="Legislation" /> },
        ]} />
      </main>
    </div>
  );
}
