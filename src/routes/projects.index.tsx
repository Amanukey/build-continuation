import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { searchDemoProjects, schemes } from "@/lib/demo-data";
import { PageIntro, DemoBadge } from "@/components/SiteShell";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Sample housing projects — Housing Assist" },
      { name: "description", content: "Search illustrative partner and rental housing projects by city and component." },
      { property: "og:title", content: "Sample housing project directory" },
      { property: "og:description", content: "Synthetic listings to explore how a project directory works." },
    ],
  }),
  component: Projects,
});

function Projects() {
  const [q, setQ] = useState("");
  const [c, setC] = useState("All");
  const results = searchDemoProjects(q, c);
  return (
    <>
      <PageIntro eyebrow="Project directory" title="Illustrative housing projects." description="Every listing here is synthetic. Availability and allotment are never confirmed." />
      <section className="container-page py-12">
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="flex flex-1 items-center gap-2 rounded-full border bg-card px-4">
            <Search className="h-4 w-4 text-muted-foreground" /><span className="sr-only">Search projects</span>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, city or state" className="w-full bg-transparent py-3 outline-none" />
          </label>
          <label><span className="sr-only">Filter by component</span>
            <select value={c} onChange={(e) => setC(e.target.value)} className="h-full rounded-full border bg-card px-4 py-3">
              <option value="All">All components</option>
              {schemes.map((s) => <option key={s.code} value={s.code}>{s.code} — {s.name}</option>)}
            </select>
          </label>
        </div>
        <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">{results.length} sample projects</p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => (
            <Link key={p.slug} to="/projects/$slug" params={{ slug: p.slug }} className="overflow-hidden rounded-2xl border bg-card shadow-soft transition hover:-translate-y-1">
              <img src="/images/housing-project.png" alt={`${p.name} housing community`} className="h-40 w-full object-cover" loading="lazy" />
              <div className="p-5">
                <div className="flex gap-2"><DemoBadge>Sample</DemoBadge><DemoBadge>{p.scheme}</DemoBadge></div>
                <h2 className="mt-3 text-xl font-semibold">{p.name}</h2>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{p.city}, {p.state}</p>
              </div>
            </Link>
          ))}
        </div>
        {results.length === 0 && (
          <div className="mt-6 rounded-2xl border border-dashed p-10 text-center">
            <p className="font-semibold">No projects match.</p>
            <button onClick={() => { setQ(""); setC("All"); }} className="mt-3 font-semibold text-primary underline">Clear filters</button>
          </div>
        )}
      </section>
    </>
  );
}
