import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import heroImg from "@/assets/hero.jpg";
import envImg from "@/assets/environmental.jpg";
import dataImg from "@/assets/personal-data.jpg";
import lawImg from "@/assets/legislation.jpg";
import gamesImg from "@/assets/games.jpg";
import aiImg from "@/assets/hero-ai.jpg";
import ipImg from "@/assets/hero-ip.jpg";
import threatsImg from "@/assets/hero-threats.jpg";
import socialImg from "@/assets/hero-social.jpg";
import defenceImg from "@/assets/hero-defence.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Interactive Revision Hub" },
      { name: "description", content: "Master Environmental issues, Personal data, and Legislation through interactive games, quizzes, and flashcards." },
    ],
  }),
});

const topics = [
  {
    to: "/environmental",
    tag: "Section 1",
    title: "Environmental Issues",
    desc: "Manufacture, energy use, disposal & responsible recycling of digital devices.",
    color: "from-emerald-500/30 to-lime-400/10",
    img: envImg,
  },
  {
    to: "/personal-data",
    tag: "Section 2",
    title: "Personal Data",
    desc: "Digital footprint, ownership of data, benefits & drawbacks.",
    color: "from-teal-500/30 to-emerald-400/10",
    img: dataImg,
  },
  {
    to: "/legislation",
    tag: "Section 3",
    title: "Legislation",
    desc: "DPA 2018, Computer Misuse Act, Cookies & EU Regulations.",
    color: "from-green-600/30 to-emerald-400/10",
    img: lawImg,
  },
  {
    to: "/ai",
    tag: "Section 4",
    title: "Artificial Intelligence",
    desc: "Machine learning, narrow AI, algorithmic bias & accountability.",
    color: "from-emerald-500/30 to-teal-400/10",
    img: aiImg,
  },
  {
    to: "/intellectual-property",
    tag: "Section 5",
    title: "Intellectual Property",
    desc: "Copyright, patents, trademarks & open-source vs proprietary.",
    color: "from-teal-500/30 to-emerald-400/10",
    img: ipImg,
  },
  {
    to: "/threats",
    tag: "Section 6",
    title: "Threats to Digital Systems",
    desc: "Malware, vulnerabilities and types of hacker.",
    color: "from-emerald-600/30 to-lime-400/10",
    img: threatsImg,
  },
  {
    to: "/social-engineering",
    tag: "Section 7",
    title: "Social Engineering",
    desc: "Phishing, baiting, pretexting & shoulder-surfing.",
    color: "from-lime-500/30 to-emerald-400/10",
    img: socialImg,
  },
  {
    to: "/protecting-systems",
    tag: "Section 8",
    title: "Protecting Digital Systems",
    desc: "Firewalls, encryption, backups & acceptable use policies.",
    color: "from-emerald-700/30 to-teal-400/10",
    img: defenceImg,
  },
  {
    to: "/games",
    tag: "Test Your Learning",
    title: "Interactive Challenges",
    desc: "Match-up, drag-to-sort, true/false rapid-fire and more.",
    color: "from-lime-500/30 to-emerald-500/10",
    img: gamesImg,
  },
] as const;

function Index() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="max-w-6xl mx-auto px-6 pt-12 pb-24">
        <section className="grid md:grid-cols-2 gap-10 items-center mb-20">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-sm font-medium text-muted-foreground mb-6">
              Interactive Revision
            </span>
            <h1 className="font-display text-5xl sm:text-6xl font-bold tracking-tight mb-6">
              Learn the <span className="text-gradient">fun</span> way
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Dive into the world of tech and people: discover how our devices
              shape the planet, who really controls your personal data, and the
              laws designed to protect it — all through quick, hands-on
              activities and games.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <Link to="/environmental" className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition shadow-glow">
                Start learning →
              </Link>
              <Link to="/games" className="px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/70 transition">
                Test your learning
              </Link>
            </div>
          </div>
          <div className="relative max-w-md lg:max-w-lg mx-auto md:mx-0 md:ml-auto">
            <img
              src={heroImg}
              alt="Students learning together with laptop and study icons"
              width={800}
              height={450}
              className="rounded-3xl shadow-card w-full h-auto"
            />
          </div>
        </section>

        <section className="grid sm:grid-cols-2 gap-5">
          {topics.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              className={`group relative overflow-hidden rounded-3xl border border-border bg-card shadow-card hover:shadow-glow transition-all hover:-translate-y-1`}
            >
              <div className="aspect-[16/7] overflow-hidden">
                <img
                  src={t.img}
                  alt={t.title}
                  loading="lazy"
                  width={768}
                  height={336}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className={`absolute inset-x-0 top-0 aspect-[16/7] bg-gradient-to-br ${t.color} opacity-30 group-hover:opacity-50 transition-opacity pointer-events-none`} />
              <div className="p-6">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{t.tag}</p>
                <h2 className="font-display text-2xl font-bold mb-2">{t.title}</h2>
                <p className="text-muted-foreground">{t.desc}</p>
                <p className="mt-4 text-sm font-semibold text-primary">Open section →</p>
              </div>
            </Link>
          ))}
        </section>
      </main>
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        Built for interactive revision
      </footer>
    </div>
  );
}
