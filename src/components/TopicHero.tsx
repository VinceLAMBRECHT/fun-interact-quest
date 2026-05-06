type Props = {
  image: string;
  eyebrow: string;
  title: string;
  description: string;
  accentClass?: string; // e.g. "from-emerald-500/70 to-amber-500/40"
};

export function TopicHero({ image, eyebrow, title, description, accentClass = "from-primary/70 to-accent/40" }: Props) {
  return (
    <header className="relative overflow-hidden rounded-3xl border border-border shadow-card">
      <img
        src={image}
        alt=""
        width={1600}
        height={700}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className={`absolute inset-0 bg-gradient-to-tr ${accentClass} mix-blend-multiply`} />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
      <div className="relative px-6 sm:px-10 py-14 sm:py-20 max-w-3xl">
        <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-background/80 backdrop-blur border border-border">
          {eyebrow}
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-bold mt-4 mb-3 drop-shadow-sm">
          {title}
        </h1>
        <p className="text-base sm:text-lg text-foreground/85 max-w-2xl">{description}</p>
      </div>
    </header>
  );
}
