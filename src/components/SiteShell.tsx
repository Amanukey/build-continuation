import { Link } from "@tanstack/react-router";
import { Menu, X, Info } from "lucide-react";
import { useState, type ReactNode } from "react";
import { officialSchemeUrl } from "@/lib/demo-data";

const nav = [
  { to: "/schemes", label: "Schemes" },
  { to: "/eligibility", label: "Eligibility" },
  { to: "/how-to-apply", label: "How to apply" },
  { to: "/projects", label: "Projects" },
  { to: "/documents", label: "Documents" },
  { to: "/faq", label: "FAQ" },
  { to: "/help", label: "Help" },
  { to: "/announcements", label: "Announcements" },
  { to: "/dashboard", label: "My workspace" },
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen flex-col">
      <div className="bg-primary text-primary-foreground">
        <p className="container-page flex items-center gap-2 py-2 text-xs">
          <Info className="h-3.5 w-3.5 shrink-0" aria-hidden />
          Student demonstration — not an official government portal. Nothing here is submitted or verified.
        </p>
      </div>
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <img src="/favicon.png" alt="Housing Assist" className="h-9 w-9" />
            <span className="font-display text-lg font-semibold leading-none">
              Housing Assist<span className="block text-[0.65rem] font-sans font-semibold uppercase tracking-[0.18em] text-muted-foreground">PMAY-U 2.0 demo</span>
            </span>
          </Link>
          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground" activeProps={{ className: "text-foreground bg-secondary" }}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/auth/login" className="hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 sm:inline-flex">Sign in</Link>
            <button className="rounded-md p-2 lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {open && (
          <nav aria-label="Mobile" className="container-page grid gap-1 pb-4 lg:hidden">
            {[...nav, { to: "/auth/login", label: "Sign in" } as const].map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-md px-3 py-2.5 font-medium hover:bg-secondary">{n.label}</Link>
            ))}
          </nav>
        )}
      </header>
      <main className="flex-1">{children}</main>
      <footer className="mt-24 border-t bg-secondary">
        <div className="container-page grid gap-8 py-12 md:grid-cols-3">
          <div>
            <p className="font-display text-xl font-semibold">Housing Assist</p>
            <p className="mt-2 text-sm text-muted-foreground">A college prototype that explains PMAY-U 2.0 in plain language. All projects, records and announcements are synthetic.</p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {nav.map((n) => <Link key={n.to} to={n.to} className="text-muted-foreground hover:text-foreground">{n.label}</Link>)}
            <Link to="/documents" className="text-muted-foreground hover:text-foreground">Documents</Link>
            <Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link>
            <Link to="/sitemap" className="text-muted-foreground hover:text-foreground">Sitemap</Link>
            <Link to="/accessibility" className="text-muted-foreground hover:text-foreground">Accessibility</Link>
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground">Privacy</Link>
            <Link to="/terms" className="text-muted-foreground hover:text-foreground">Terms</Link>
          </div>
          <div className="text-sm text-muted-foreground">
            For official information, visit{" "}
            <a href={officialSchemeUrl} target="_blank" rel="noreferrer" className="font-semibold text-primary underline">pmay-urban.gov.in</a>.
          </div>
        </div>
      </footer>
    </div>
  );
}

export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="border-b bg-secondary/60">
      <div className="container-page py-14 md:py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold md:text-6xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{description}</p>
      </div>
    </section>
  );
}

export function DemoBadge({ children = "Demo" }: { children?: ReactNode }) {
  return <span className="inline-flex items-center rounded-full bg-warm/15 px-2.5 py-0.5 text-xs font-semibold text-warm">{children}</span>;
}
