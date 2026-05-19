import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Quiz } from "@/components/Quiz";
import { Flashcards } from "@/components/Flashcards";
import { TabsPanel, RevealGrid, DoDont } from "@/components/Interactive";
import { ActivityLauncher } from "@/components/ActivityLauncher";
import { TopicHero } from "@/components/TopicHero";
import { VideoSummary } from "@/components/VideoSummary";
import heroImg from "@/assets/hero-defence.jpg";

export const Route = createFileRoute("/protecting-systems")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Protecting Digital Systems" },
      { name: "description", content: "Firewalls, anti-malware, encryption, backups and acceptable use policies." },
    ],
  }),
});

const defences = [
  { label: "Firewall", detail: "First line of defence — monitors traffic in and out, blocking suspicious activity." },
  { label: "Anti-malware", detail: "Scans files against known signatures; modern tools also use heuristic analysis." },
  { label: "Symmetric encryption", detail: "Same key encrypts and decrypts. Risk: the key can be intercepted." },
  { label: "Asymmetric encryption", detail: "Public key encrypts; private key decrypts. Far more secure." },
  { label: "Defence in depth", detail: "Layered defences — if one fails, the next stops the attacker." },
];

const backups = [
  { label: "Full backup", detail: "Copies all data, regardless of changes. Slower, larger." },
  { label: "Incremental backup", detail: "Copies only files new or changed since last backup. Fast & small." },
  { label: "RAID", detail: "Disk content mirrored to a second drive — failed disk swapped without downtime." },
  { label: "Recovery", detail: "Restoring data and systems from backup, sometimes at an alternative site." },
];

const aupExamples = {
  doItems: [
    "Lock the screen before leaving the desk",
    "Use a strong, secret password",
    "Be cautious with email attachments",
    "Read & sign the AUP",
    "Attend security training",
  ],
  dontItems: [
    "Install software downloaded from the web",
    "Plug in unknown USB sticks",
    "Share confidential info by phone or email",
    "Take data off-site without authority",
    "Browse social media in work time",
  ],
};

const quiz = [
  { q: "A firewall mainly…", options: ["Encrypts data", "Backs up files", "Filters network traffic", "Removes viruses"], answer: 2 },
  { q: "Asymmetric encryption uses…", options: ["No keys", "One shared key", "Two keys (public + private)", "Passwords only"], answer: 2 },
  { q: "Heuristic analysis looks for…", options: ["Backup errors", "Suspicious behaviour", "Open ports", "Cookies"], answer: 1 },
  { q: "Incremental backup copies…", options: ["Everything every time", "Only changed/new files", "Only system files", "Nothing"], answer: 1 },
  { q: "RAID protects against…", options: ["Cyberattacks", "Single disk failure", "Phishing", "Power cuts only"], answer: 1 },
  { q: "An AUP is mainly intended to…", options: ["Sell software", "Set rules for acceptable user behaviour", "Replace antivirus", "Speed up Wi-Fi"], answer: 1 },
  { q: "'Defence in depth' means…", options: ["One strong defence", "Layered defences", "Hiring more staff", "Using only firewalls"], answer: 1 },
];

const cards = [
  { front: "Firewall", back: "Monitors and filters network traffic per rules." },
  { front: "Anti-malware", back: "Scans files using signatures or heuristics." },
  { front: "Symmetric encryption", back: "Same key encrypts and decrypts." },
  { front: "Asymmetric encryption", back: "Public key encrypts; private key decrypts." },
  { front: "Full backup", back: "Copies all data each time." },
  { front: "Incremental backup", back: "Copies only what changed since last backup." },
  { front: "RAID", back: "Mirrors disks so one failure doesn't stop the server." },
  { front: "AUP", back: "Acceptable Use Policy — rules users must follow." },
];

function Page() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        <TopicHero
          image={heroImg}
          eyebrow="Section 8"
          title="Protecting Digital Systems"
          description="Firewalls, encryption, backups and policies — defence in depth."
          accentClass="from-emerald-600/60 to-teal-500/30"
        />

        <section>
          <h2 className="font-display text-2xl font-bold mb-3">Layered defences</h2>
          <TabsPanel tabs={[
            { label: "Defences", icon: "🛡️", content: <RevealGrid items={defences} /> },
            { label: "Backup & recovery", icon: "💾", content: <RevealGrid items={backups} /> },
          ]} />
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold mb-3">Acceptable Use Policy (AUP)</h2>
          <DoDont doItems={aupExamples.doItems} dontItems={aupExamples.dontItems} />
        </section>


        <VideoSummary youtubeId="kDEX1HXybrU" caption="How a firewall protects a network." />

        <ActivityLauncher activities={[
          { id: "flash", label: "Flashcards", desc: "Flip key terms and definitions.", render: () => <Flashcards cards={cards} /> },
          { id: "quiz", label: "Quick Quiz", emoji: "🧠", desc: "Multiple-choice questions that track your progress.", render: () => <Quiz questions={quiz} title="Protecting Digital Systems" /> },
        ]} />
      </main>
    </div>
  );
}
