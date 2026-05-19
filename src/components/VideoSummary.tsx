type Props = {
  youtubeId: string;
  title?: string;
  caption?: string;
};

export function VideoSummary({ youtubeId, title = "Watch the summary", caption }: Props) {
  return (
    <section aria-labelledby="video-summary-heading" className="space-y-3">
      <h2 id="video-summary-heading" className="font-display text-2xl font-bold">
        {title}
      </h2>
      {caption && <p className="text-sm text-muted-foreground">{caption}</p>}
      <div className="relative w-full overflow-hidden rounded-2xl border border-border shadow-card aspect-video bg-black">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1`}
          title={title}
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </section>
  );
}
