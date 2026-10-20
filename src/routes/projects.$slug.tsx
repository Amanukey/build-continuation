import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { demoProjects, schemes } from "@/lib/demo-data";
import { DemoBadge } from "@/components/SiteShell";
import hero from "@/assets/pmay-community.jpg.asset.json";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = demoProjects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const t = loaderData ? `${loaderData.project.name} (sample) — Housing Assist` : "Project not found";
    const d = loaderData?.project.summary ?? "Sample project";
    return { meta: [{ title: t }, { name: "description", content: d }, { property: "og:title", content: t }, { property: "og:description", content: d }] };
  },
  component: ProjectPage,
});

function ProjectPage() {
  const { project } = Route.useLoaderData();
  const scheme = schemes.find((s) => s.code === project.scheme)!;
  return (
    <article className="container-page py-12">
      <Link to="/projects" className="text-sm font-semibold text-primary hover:underline">← All projects</Link>
      <img src={hero.url} alt="Illustrative housing courtyard" className="mt-6 h-72 w-full rounded-2xl object-cover md:h-96" />
      <div className="mt-8 grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div>
          <div className="flex gap-2"><DemoBadge>Synthetic listing</DemoBadge><DemoBadge>{project.type}</DemoBadge></div>
          <h1 className="mt-4 text-5xl font-semibold">{project.name}</h1>
          <p className="mt-2 text-lg text-muted-foreground">{project.city}, {project.state}</p>
          <p className="mt-6 text-lg">{project.summary}</p>
        </div>
        <aside className="h-fit rounded-2xl border bg-card p-6">
          <p className="eyebrow">Component</p>
          <p className="mt-2 font-display text-xl font-semibold">{scheme.name}</p>
          <Link to="/schemes/$code" params={{ code: scheme.code }} className="mt-4 inline-block font-semibold text-primary hover:underline">Read the {scheme.code} guide →</Link>
        </aside>
      </div>
    </article>
  );
}
