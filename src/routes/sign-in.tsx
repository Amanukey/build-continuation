import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { demoRoles } from "@/lib/demo-data";
import { useDemoRole } from "@/lib/demo-session";
import { PageIntro } from "@/components/SiteShell";

export const Route = createFileRoute("/sign-in")({
  head: () => ({
    meta: [
      { title: "Demo sign-in — Housing Assist" },
      { name: "description", content: "Pick a demo role to explore citizen, officer or administrator workspaces." },
      { property: "og:title", content: "Housing Assist demo sign-in" },
      { property: "og:description", content: "No password, no personal data — just pick a role." },
    ],
  }),
  component: SignIn,
});

function SignIn() {
  const { setRole } = useDemoRole();
  const navigate = useNavigate();
  return (
    <>
      <PageIntro eyebrow="Demo sign-in" title="Choose a workspace to explore." description="No password and no personal data. Your choice lasts for this browser tab only." />
      <section className="container-page grid gap-5 py-12 md:grid-cols-3">
        {demoRoles.map((r) => (
          <button key={r.role} onClick={() => { setRole(r.role); navigate({ to: "/workspace" }); }} className="rounded-2xl border bg-card p-8 text-left shadow-soft transition hover:-translate-y-1 hover:border-accent">
            <p className="eyebrow">Sign in as</p>
            <h2 className="mt-2 text-3xl font-semibold">{r.label}</h2>
            <p className="mt-3 text-muted-foreground">{r.description}</p>
          </button>
        ))}
      </section>
    </>
  );
}
