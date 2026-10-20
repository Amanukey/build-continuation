import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Home, Building2, KeyRound, Landmark, ClipboardCheck, FileText, Search } from "lucide-react";
import { schemes, demoProjects, faqItems } from "@/lib/demo-data";
import { DemoBadge } from "@/components/SiteShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Housing Assist — Understand PMAY-U 2.0 in plain language" },
      { name: "description", content: "Explore PMAY-U 2.0 housing components, check indicative eligibility and prepare for your application. A student demonstration." },
      { property: "og:title", content: "Housing Assist — PMAY-U 2.0, explained" },
      { property: "og:description", content: "Scheme guidance, indicative eligibility and sample projects in one calm, accessible demo." },
    ],
  }),
  component: Index,
});

export const schemeIcons = { BLC: Home, AHP: Building2, ARH: KeyRound, ISS: Landmark } as const;

function Index() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img src="/images/housing-hero.png" alt="Families walking through a leafy affordable-housing courtyard" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-hero-fade" />
        <div className="container-page flex min-h-[78vh] flex-col justify-end pb-16 pt-32 text-primary-foreground">
          <p className="eyebrow !text-accent">Pradhan Mantri Awas Yojana — Urban 2.0</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-[1.02] md:text-7xl">A home starts with understanding the way there.</h1>
          <p className="mt-6 max-w-xl text-lg opacity-90">Learn the four housing components, check an indicative eligibility guide, and get ready to apply through the official channel.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/eligibility" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-accent-foreground hover:opacity-90">Check indicative eligibility <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/schemes" className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/50 px-6 py-3 font-semibold hover:bg-primary-foreground/10">Explore schemes</Link>
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="eyebrow">Four components</p><h2 className="mt-2 text-4xl font-semibold">Find the support that fits.</h2></div>
          <Link to="/schemes" className="font-semibold text-primary underline-offset-4 hover:underline">Compare all components →</Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {schemes.map((s) => {
            const Icon = schemeIcons[s.code];
            return (
              <Link key={s.code} to="/schemes/$code" params={{ code: s.code }} className="group rounded-2xl border bg-card p-6 shadow-soft transition hover:-translate-y-1">
                <Icon className="h-8 w-8 text-accent" aria-hidden />
                <p className="mt-6 text-xs font-bold tracking-widest text-warm">{s.code}</p>
                <h3 className="mt-1 text-xl font-semibold">{s.name}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{s.short}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">Learn more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="container-page grid gap-10 py-20 md:grid-cols-3">
          {[
            { icon: ClipboardCheck, t: "1. Check", d: "Answer six short questions. We never ask for ID numbers or bank details.", to: "/eligibility" as const },
            { icon: FileText, t: "2. Prepare", d: "See which documents you may be asked for, by component.", to: "/documents" as const },
            { icon: Search, t: "3. Apply officially", d: "Follow the steps to apply through the authorised government process.", to: "/how-to-apply" as const },
          ].map((x) => (
            <Link key={x.t} to={x.to} className="group">
              <x.icon className="h-7 w-7 text-accent" aria-hidden />
              <h3 className="mt-4 text-2xl font-semibold">{x.t}</h3>
              <p className="mt-2 opacity-80">{x.d}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-page grid gap-12 py-20 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Sample projects</p>
          <h2 className="mt-2 text-4xl font-semibold">Browse illustrative listings.</h2>
          <div className="mt-8 divide-y rounded-2xl border bg-card">
            {demoProjects.slice(0, 3).map((p) => (
              <Link key={p.slug} to="/projects/$slug" params={{ slug: p.slug }} className="flex items-center justify-between gap-4 p-5 hover:bg-secondary/60">
                <div><p className="font-semibold">{p.name}</p><p className="text-sm text-muted-foreground">{p.city}, {p.state} · {p.type}</p></div>
                <DemoBadge>{p.scheme}</DemoBadge>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow">Common questions</p>
          <h2 className="mt-2 text-4xl font-semibold">Straight answers.</h2>
          <div className="mt-8 space-y-3">
            {faqItems.slice(0, 3).map((f) => (
              <details key={f.question} className="group rounded-xl border bg-card p-5">
                <summary className="cursor-pointer list-none font-semibold">{f.question}</summary>
                <p className="mt-3 text-muted-foreground">{f.answer}</p>
              </details>
            ))}
          </div>
          <Link to="/faq" className="mt-6 inline-block font-semibold text-primary hover:underline">All FAQs →</Link>
        </div>
      </section>
    </>
  );
}
