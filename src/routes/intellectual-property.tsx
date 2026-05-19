import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Quiz } from "@/components/Quiz";
import { Flashcards } from "@/components/Flashcards";
import { TabsPanel, RevealGrid, Accordion } from "@/components/Interactive";
import { ActivityLauncher } from "@/components/ActivityLauncher";
import { TopicHero } from "@/components/TopicHero";
import { VideoSummary } from "@/components/VideoSummary";
import heroImg from "@/assets/hero-ip.jpg";

export const Route = createFileRoute("/intellectual-property")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Intellectual Property" },
      { name: "description", content: "Copyright, patents, trademarks, licensing and open-source vs proprietary software." },
    ],
  }),
});

const protections = [
  { label: "Copyright ©", detail: "Automatic protection for novels, code, images, films & music. Lasts 70 years after the creator's death." },
  { label: "Patents", detail: "Protect new inventions. Must be applied for. Last 20 years." },
  { label: "Trademarks ®/™", detail: "Protect logos, slogans and brand colours. Registration lasts 10 years." },
];

const licences = [
  { label: "Creative Commons", detail: "Use, build upon and share — under set conditions." },
  { label: "Attribution-non-commercial", detail: "Use & share for non-commercial purposes, with credit." },
  { label: "Attribution commercial", detail: "Same rights, plus commercial use allowed." },
  { label: "Public domain", detail: "Use freely, no permission or attribution required." },
];

const openSource = [
  { label: "Source code open", detail: "Anyone can view, modify and redistribute the code." },
  { label: "Free to install", detail: "Can be installed on any number of machines." },
  { label: "Community support", detail: "Supported by enthusiasts rather than a paid team." },
  { label: "Mostly free", detail: "Most open-source software is free, but a few exceptions exist." },
  { label: "Examples", detail: "Linux, LibreOffice, Firefox, Android, Apache." },
];

const proprietary = [
  { label: "Closed source", detail: "Only the copyright holder can view or modify the code." },
  { label: "Thoroughly tested", detail: "Tested by developers before release." },
  { label: "Paid support", detail: "Backed by a dedicated team of developers." },
  { label: "Patches fast", detail: "Vulnerabilities are patched quickly after release." },
  { label: "Examples", detail: "Microsoft Windows, MacOS, Adobe Photoshop, iTunes." },
];

const licenceTerms = [
  { q: "Number of installs", a: "How many computers it can be installed on." },
  { q: "Concurrent users", a: "How many people can use it at the same time." },
  { q: "Validity period", a: "How long the licence lasts." },
  { q: "Setting", a: "Educational, commercial, or private use." },
  { q: "Updates", a: "Whether automatic updates must be allowed." },
];

const quiz = [
  { q: "Copyright protection is…", options: ["Applied for", "Automatic on creation", "Bought yearly", "Granted by EU"], answer: 1 },
  { q: "How long does copyright last after death?", options: ["10 years", "20 years", "50 years", "70 years"], answer: 3 },
  { q: "Patents protect…", options: ["Logos", "Inventions", "Music", "Brand colours"], answer: 1 },
  { q: "A registered trademark uses which symbol?", options: ["©", "®", "™", "$"], answer: 1 },
  { q: "Which is open-source?", options: ["Adobe Photoshop", "Microsoft Windows", "Linux", "iTunes"], answer: 2 },
  { q: "Which is proprietary?", options: ["Firefox", "LibreOffice", "Android", "MacOS"], answer: 3 },
];

const cards = [
  { front: "Copyright", back: "Automatic protection for original creative work; 70 years after death." },
  { front: "Patent", back: "Applied-for protection for an invention; 20 years." },
  { front: "Trademark", back: "Protects brand identity; 10-year registration (renewable)." },
  { front: "Open-source", back: "Source code is free to view, modify and share." },
  { front: "Proprietary", back: "Closed source — only the owner may modify or distribute." },
  { front: "Creative Commons", back: "Licence allowing reuse under stated conditions." },
];

function Page() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        <TopicHero
          image={heroImg}
          eyebrow="Section 5"
          title="Intellectual Property"
          description="Copyright, patents, trademarks and the open-source vs proprietary debate."
          accentClass="from-emerald-700/60 to-teal-500/30"
        />

        <section>
          <h2 className="font-display text-2xl font-bold mb-3">How IP is protected</h2>
          <RevealGrid items={protections} clickToReveal />
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold mb-3">Licensing</h2>
          <p className="text-sm text-muted-foreground mb-4">Creators can grant licences allowing others to use their work.</p>
          <RevealGrid items={licences} />
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold mb-3">Open-source vs proprietary</h2>
          <TabsPanel tabs={[
            { label: "Open-source", icon: "🔓", content: <RevealGrid items={openSource} /> },
            { label: "Proprietary", icon: "🔒", content: <RevealGrid items={proprietary} /> },
          ]} />
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold mb-3">Software licence terms</h2>
          <Accordion items={licenceTerms} />
        </section>


        <VideoSummary youtubeId="3gWaAJR5L18" caption="Crash Course: how trademarks protect brands from consumer confusion." />

        <ActivityLauncher activities={[
          { id: "flash", label: "Flashcards", desc: "Flip key terms and definitions.", render: () => <Flashcards cards={cards} /> },
          { id: "quiz", label: "Quick Quiz", emoji: "🧠", desc: "Multiple-choice questions that track your progress.", render: () => <Quiz questions={quiz} title="Intellectual Property" /> },
        ]} />
      </main>
    </div>
  );
}
