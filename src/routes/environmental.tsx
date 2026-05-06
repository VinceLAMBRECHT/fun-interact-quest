import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Quiz } from "@/components/Quiz";
import { Flashcards } from "@/components/Flashcards";
import { TabsPanel, RevealGrid, DoDont, StatGrid } from "@/components/Interactive";
import { ActivityLauncher } from "@/components/ActivityLauncher";
import { TopicHero } from "@/components/TopicHero";
import heroImg from "@/assets/hero-environmental.jpg";
import seedlingImg from "@/assets/env-seedling.jpg";
import ewasteImg from "@/assets/env-ewaste.jpg";

export const Route = createFileRoute("/environmental")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Environmental Issues" },
      { name: "description", content: "Manufacture, energy consumption, disposal and responsible recycling of digital devices." },
    ],
  }),
});

const manufacture = [
  { label: "Raw materials", detail: "Large quantities of raw materials, including non-renewable copper and palladium, plus highly toxic ones like arsenic." },
  { label: "Mining damage", detail: "Mining scars landscapes and damages wildlife habitats." },
  { label: "Fossil fuel energy", detail: "Most manufacturing energy comes from non-renewable fossil fuels — contributing to global warming." },
  { label: "Polluted water", detail: "Polluted waste water is a by-product of the manufacturing process." },
];

const energy = [
  { label: "Production", detail: "Producing computer equipment uses huge amounts of energy." },
  { label: "Running it", detail: "Powering devices day-to-day." },
  { label: "Data centres", detail: "Online data storage in data centres consumes vast electricity." },
  { label: "Recycling", detail: "Even recycling old equipment uses energy." },
  { label: "Smart help", detail: "Smart tech like light sensors and route planners help cut consumption." },
];

const disposal = [
  { label: "50M tonnes / yr", detail: "Approximately 50 million tonnes of e-waste is produced each year." },
  { label: "Only 20% recycled", detail: "Only around 20% of e-waste is recycled — the rest pollutes the planet." },
  { label: "Toxic leakage", detail: "Illegally dumped e-waste leaks lead, mercury and cobalt into land and water." },
  { label: "Health risks", detail: "Severe health issues caused by people living near, or salvaging from, e-waste dumps." },
  { label: "Dumped abroad", detail: "Millions of tonnes of e-waste are dumped in developing countries every year." },
];

const recycling = [
  { label: "Less leakage", detail: "Reduces chemical leakage and fires in landfills." },
  { label: "Recover metals", detail: "Enables the recovery of valuable metals." },
  { label: "Less mining", detail: "Reduces the need for new mining." },
  { label: "Plastic cases", detail: "Recycles plastic cases that would otherwise decompose into toxic particles." },
  { label: "Cleaner air", detail: "Reduces the amount of harmful toxins released into the air." },
];

const positiveImpact = [
  { label: "Smart traffic", detail: "Intelligent traffic systems keep traffic moving and reduce fuel consumption." },
  { label: "Smart lighting", detail: "Switches off lights automatically when they are not needed." },
  { label: "Monitoring", detail: "Environmental monitoring ensures regulations are followed and prevents poaching." },
  { label: "Remote work", detail: "Working from home reduces traffic and lowers greenhouse gas emissions." },
];

const quiz = [
  { q: "Roughly how much e-waste is produced globally each year?", options: ["5 million tonnes", "20 million tonnes", "50 million tonnes", "200 million tonnes"], answer: 2, explain: "Around 50 million tonnes — and only ~20% is recycled." },
  { q: "What share of a device's footprint comes from manufacture & disposal?", options: ["10%", "30%", "50%", "70%"], answer: 3, explain: "Manufacture + disposal ≈ 70%; Use ≈ 30%." },
  { q: "Which is NOT a benefit of responsible recycling?", options: ["Recovers valuable metals", "Reduces chemical leakage", "Increases mining demand", "Reduces toxins in the air"], answer: 2 },
  { q: "Best way to cut your device's energy use?", options: ["Leave Bluetooth on", "Sleep mode + lower brightness", "Run apps in background", "Higher refresh rate"], answer: 1 },
  { q: "Why locate data centres in cool places?", options: ["Cheaper land", "Reduce cooling costs", "Better internet", "Less rain"], answer: 1 },
  { q: "Main driver of the short replacement cycle?", options: ["Devices break easily", "Latest-model desire", "Government rules", "Bad batteries"], answer: 1 },
  { q: "Which regulation sets targets for e-waste collection & recycling?", options: ["DPA", "WEEE", "PECR", "CMA"], answer: 1 },
];

const cards = [
  { front: "E-waste", back: "Discarded electronic devices — often containing toxic substances." },
  { front: "WEEE Regulations", back: "Set targets for collection, recycling and recovery of electronic equipment." },
  { front: "Smart lighting", back: "Lighting that switches off automatically when not needed." },
  { front: "Footprint split", back: "≈70% manufacture & disposal, ≈30% use." },
  { front: "Responsible ownership", back: "Keep devices longer, buy pre-owned, donate, save energy." },
];

function Page() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        <TopicHero
          image={heroImg}
          eyebrow="Section 1"
          title="Environmental Issues"
          description="The environmental impact of making, using and throwing away digital devices."
          accentClass="from-emerald-600/60 to-amber-500/30"
        />


        <div className="grid sm:grid-cols-2 gap-4">
          <img src={seedlingImg} alt="Hands holding a seedling growing from soil with circuit pattern" loading="lazy" width={1200} height={800} className="rounded-2xl shadow-card object-cover w-full h-56" />
          <img src={ewasteImg} alt="E-waste reclaimed by moss and plants" loading="lazy" width={1200} height={800} className="rounded-2xl shadow-card object-cover w-full h-56" />
        </div>

        <StatGrid stats={[
          { value: "50M", label: "Tonnes e-waste / yr" },
          { value: "20%", label: "Actually recycled" },
          { value: "70%", label: "Footprint = make+bin" },
          { value: "~2yr", label: "Avg phone lifespan" },
        ]} />

        <section>
          <h2 className="font-display text-2xl font-bold mb-3">Explore the lifecycle</h2>
          <p className="text-sm text-muted-foreground mb-4">Tap a tab, then tap any card to reveal the detail.</p>
          <TabsPanel tabs={[
            { label: "Manufacture", icon: "🏭", content: <RevealGrid items={manufacture} /> },
            { label: "Energy use", icon: "⚡", content: <RevealGrid items={energy} /> },
            { label: "Disposal", icon: "🗑️", content: <RevealGrid items={disposal} /> },
            { label: "Recycling", icon: "♻️", content: <RevealGrid items={recycling} /> },
            { label: "Positive impact", icon: "🌱", content: <RevealGrid items={positiveImpact} /> },
          ]} />
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold mb-3">Short replacement cycle — be a responsible owner</h2>
          <DoDont
            doItems={[
              "Keep devices for longer",
              "Buy pre-owned rather than new",
              "Donate to charity / recycler",
              "Use energy-efficiency settings",
              "Reduce internet usage",
              "Buy devices with high energy-efficiency rating",
            ]}
            dontItems={[
              "Upgrade just for the latest model",
              "Throw devices in general waste",
              "Glue/solder parts that block repair",
              "Inflate spare-part prices",
              "End software updates after 1–2 years",
              "Leave Wi-Fi, Bluetooth, GPS on always",
            ]}
          />
        </section>

        <ActivityLauncher activities={[
          { id: "flash", label: "Flashcards", desc: "Flip key terms and definitions.", render: () => <Flashcards cards={cards} /> },
          { id: "quiz", label: "Quick Quiz", emoji: "🧠", desc: "Multiple-choice questions that track your progress.", render: () => <Quiz questions={quiz} title="Environmental Issues" /> },
        ]} />
      </main>
    </div>
  );
}
