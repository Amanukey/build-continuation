import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { schemes, demoProjects, officialSchemeUrl } from "@/lib/demo-data";
import { PageIntro } from "@/components/SiteShell";

export const Route = createFileRoute("/schemes/$code")({
  loader: ({ params }) => {
    const scheme = schemes.find((s) => s.code === params.code.toUpperCase());
    if (!scheme) throw notFound();
    return { scheme };
  },
  head: ({ loaderData }) => {
    const t = loaderData ? `${loaderData.scheme.name} (${loaderData.scheme.code}) — Housing Assist` : "Scheme not found";
    const d = loaderData?.scheme.short ?? "Scheme component guide";
    return { meta: [{ title: t }, { name: "description", content: d }, { property: "og:title", content: t }, { property: "og:description", content: d }] };
  },
  component: SchemePage,
});

function SchemePage() {
  const { scheme } = Route.useLoaderData();
  const projects = demoProjects.filter((p) => p.scheme === scheme.code);
  return (
    <>
      <PageIntro eyebrow={`Component · ${scheme.code}`} title={scheme.name} description={scheme.detail} />
      <section className="container-page grid gap-12 py-16 lg:grid-cols-[2fr_1fr]">
        <div>
          <h2 className="text-3xl font-semibold">Typical steps</h2>
          <ol className="mt-6 space-y-4">
            {scheme.steps.map((step, i) => (
              <li key={step} className="flex gap-4 rounded-xl border bg-card p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent font-bold text-accent-foreground">{i + 1}</span>
                <span className="pt-1.5">{step}</span>
              </li>
            ))}
          </ol>
          {projects.length > 0 && (
            <>
              <h2 className="mt-12 text-3xl font-semibold">Sample {scheme.code} projects</h2>
              <ul className="mt-4 space-y-2">
                {projects.map((p) => <li key={p.slug}><Link to="/projects/$slug" params={{ slug: p.slug }} className="font-semibold text-primary hover:underline">{p.name}</Link> — {p.city}</li>)}
              </ul>
            </>
          )}
        </div>
        <aside className="h-fit rounded-2xl bg-primary p-6 text-primary-foreground">
          <h3 className="text-xl font-semibold">Before you act</h3>
          <p className="mt-2 text-sm opacity-85">Conditions change. Confirm current rules with your urban local body or the official portal.</p>
          <div className="mt-5 grid gap-2">
            <Link to="/eligibility" className="rounded-full bg-accent px-4 py-2.5 text-center text-sm font-semibold text-accent-foreground">Check indicative eligibility</Link>
            <a href={officialSchemeUrl} target="_blank" rel="noreferrer" className="rounded-full border border-primary-foreground/40 px-4 py-2.5 text-center text-sm font-semibold">Official portal ↗</a>
          </div>
        </aside>
      </section>
    </>
  );
}
