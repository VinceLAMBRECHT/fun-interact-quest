import { Link } from "@tanstack/react-router";

const links = [
  { to: "/", label: "Home" },
  { to: "/environmental", label: "Environmental" },
  { to: "/personal-data", label: "Personal Data" },
  { to: "/legislation", label: "Legislation" },
  { to: "/games", label: "Test Your Learning" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        <Link to="/" className="font-display font-bold text-lg tracking-tight">
          <span className="text-gradient">Revision Hub</span>
        </Link>
        <nav className="flex items-center gap-1 flex-wrap">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-3 py-1.5 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              activeProps={{ className: "px-3 py-1.5 rounded-full text-sm font-medium bg-primary text-primary-foreground" }}
              activeOptions={{ exact: true }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
