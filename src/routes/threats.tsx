import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Quiz } from "@/components/Quiz";
import { Flashcards } from "@/components/Flashcards";
import { TabsPanel, RevealGrid, Accordion } from "@/components/Interactive";
import { ActivityLauncher } from "@/components/ActivityLauncher";
import { TopicHero } from "@/components/TopicHero";
import { VideoSummary } from "@/components/VideoSummary";
import heroImg from "@/assets/hero-threats.jpg";

export const Route = createFileRoute("/threats")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Threats to Digital Systems" },
      { name: "description", content: "Malware, technical vulnerabilities and types of hacker." },
    ],
  }),
});

const malware = [
  { label: "Virus", detail: "Embeds itself in another program. Activates when the host runs, then spreads." },
  { label: "Worm", detail: "Spreads independently across a network — no host program needed." },
  { label: "Trojan", detail: "Disguised as legitimate software. Opens a backdoor for the hacker." },
  { label: "Ransomware", detail: "Encrypts files and demands payment for the decryption key." },
  { label: "Keylogger", detail: "Secretly records keystrokes — captures passwords and card numbers." },
  { label: "Botnet", detail: "Army of infected IoT 'zombie' devices used for mass DDoS attacks." },
];

const vulnerabilities = [
  { q: "Unpatched software", a: "Known security holes hackers can exploit. A zero-day is one with no patch yet." },
  { q: "Out-of-date anti-malware", a: "If signature libraries aren't updated, new malware is missed." },
  { q: "Open ports", a: "Hackers use port scanning to find services running on a computer." },
  { q: "Default admin passwords", a: "Routers and devices ship with default passwords easily looked up online." },
];

const hackers = [
  { label: "Black-hat", detail: "Cybercriminals who break into systems to cause harm or steal." },
  { label: "White-hat", detail: "Ethical hackers who help organisations strengthen their defences." },
];

const disruption = [
  { label: "Slow / crash", detail: "Computers run slowly or crash entirely." },
  { label: "Data loss", detail: "Files damaged or deleted from the hard drive." },
  { label: "Locked files", detail: "Files encrypted by ransomware until payment is made." },
  { label: "Spying", detail: "Keyloggers and webcam hijacks steal information." },
  { label: "DDoS", detail: "Networks or websites flooded with traffic and brought down." },
];

const quiz = [
  { q: "Which malware spreads without a host program?", options: ["Virus", "Worm", "Trojan", "Keylogger"], answer: 1 },
  { q: "Ransomware…", options: ["Spies on keystrokes", "Encrypts files & demands payment", "Slows networks", "Replaces icons"], answer: 1 },
  { q: "A zero-day vulnerability is…", options: ["Patched immediately", "Newly found, no patch yet", "Caused by users", "Always harmless"], answer: 1 },
  { q: "Botnets are typically built from…", options: ["Servers only", "Unsecured IoT devices", "Smartphones only", "Printers"], answer: 1 },
  { q: "Ethical hackers are called…", options: ["Black-hat", "Grey-hat", "White-hat", "Red-hat"], answer: 2 },
  { q: "Which is NOT a technical vulnerability?", options: ["Open ports", "Default admin password", "Unpatched software", "Strong encryption"], answer: 3 },
];

const cards = [
  { front: "Malware", back: "Malicious software designed to damage or steal data." },
  { front: "Trojan", back: "Disguised as legit software; opens a backdoor." },
  { front: "Ransomware", back: "Encrypts files, demands payment to unlock." },
  { front: "Zero-day", back: "Newly found vulnerability with no patch yet." },
  { front: "Botnet", back: "Network of infected zombie devices used for attacks." },
  { front: "White-hat", back: "Ethical hacker who helps secure systems." },
];

function Page() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        <TopicHero
          image={heroImg}
          eyebrow="Section 6"
          title="Threats to Digital Systems"
          description="Malware, technical vulnerabilities and the people who exploit them."
          accentClass="from-emerald-700/60 to-teal-500/30"
        />

        <section>
          <h2 className="font-display text-2xl font-bold mb-3">Types of malware</h2>
          <RevealGrid items={malware} />
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold mb-3">Technical vulnerabilities</h2>
          <Accordion items={vulnerabilities} />
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold mb-3">Types of hacker & disruption</h2>
          <TabsPanel tabs={[
            { label: "Hackers", icon: "🕵️", content: <RevealGrid items={hackers} /> },
            { label: "Disruption", icon: "💥", content: <RevealGrid items={disruption} /> },
          ]} />
        </section>


        <VideoSummary youtubeId="n8mbzU0X2nQ" caption="Difference between viruses, worms and trojans." />

        <ActivityLauncher activities={[
          { id: "flash", label: "Flashcards", desc: "Flip key terms and definitions.", render: () => <Flashcards cards={cards} /> },
          { id: "quiz", label: "Quick Quiz", emoji: "🧠", desc: "Multiple-choice questions that track your progress.", render: () => <Quiz questions={quiz} title="Threats" /> },
        ]} />
      </main>
    </div>
  );
}
