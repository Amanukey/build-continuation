import { createFileRoute, Link } from "@tanstack/react-router";
import { schemes } from "@/lib/demo-data";
import { PageIntro } from "@/components/SiteShell";

export const Route = createFileRoute("/schemes/")({
  head: () => ({
    meta: [
      { title: "PMAY-U 2.0 components — Housing Assist" },
      { name: "description", content: "Compare BLC, AHP, ARH and ISS housing components in plain language." },
      { property: "og:title", content: "PMAY-U 2.0 components compared" },
      { property: "og:description", content: "Construction, partnership, rental and interest-subsidy support explained." },
    ],
  }),
  component: Schemes,
});

function Schemes() {
  return (
    <>
      <PageIntro eyebrow="Scheme components" title="Four routes towards a pucca home." description="Each component has its own conditions and process. Use this overview to decide what to read next." />
      <section className="container-page grid gap-6 py-16 md:grid-cols-2">
        {schemes.map((s) => (
          <article key={s.code} className="rounded-2xl border bg-card p-8 shadow-soft">
            <p className="text-sm font-bold tracking-widest text-warm">{s.code}</p>
            <h2 className="mt-2 text-3xl font-semibold">{s.name}</h2>
            <p className="mt-4 text-muted-foreground">{s.detail}</p>
            <Link to="/schemes/$code" params={{ code: s.code }} className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Read the {s.code} guide</Link>
          </article>
        ))}
      </section>
    </>
  );
}
