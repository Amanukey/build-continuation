import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { demoApplications, demoProjects, demoRoles, advanceStatus } from "@/lib/demo-data";
import { useDemoRole } from "@/lib/demo-session";
import { DemoBadge } from "@/components/SiteShell";

export const Route = createFileRoute("/workspace")({
  head: () => ({
    meta: [
      { title: "Demo workspace — Housing Assist" },
      { name: "description", content: "Citizen, officer and administrator workspaces with synthetic records." },
      { property: "og:title", content: "Housing Assist demo workspace" },
      { property: "og:description", content: "Explore simulated application workflows." },
    ],
  }),
  component: Workspace,
});

function Workspace() {
  const { role, setRole, ready } = useDemoRole();
  const navigate = useNavigate();
  const [apps, setApps] = useState(demoApplications.map((a) => ({ ...a, status: a.status as string })));
  const [projects, setProjects] = useState(demoProjects.map((p) => ({ ...p, published: true })));
  const [filter, setFilter] = useState("All");
  const [notice, setNotice] = useState("");
  const filteredApps = filter === "All" ? apps : apps.filter((app) => app.status === filter);

  if (!ready) return <div className="container-page py-20" />;
  if (!role) return (
    <div className="container-page py-20 text-center"><h1 className="text-4xl font-semibold">You're not signed in to the demo.</h1><Link to="/sign-in" className="mt-6 inline-block rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">Choose a role</Link></div>
  );
  const label = demoRoles.find((r) => r.role === role)!.label;

  return (
    <div className="container-page py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div><DemoBadge>Simulated workspace</DemoBadge><h1 className="mt-3 text-4xl font-semibold">{label} workspace</h1></div>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Switch role">
          {demoRoles.map((r) => (
            <button key={r.role} role="tab" aria-selected={r.role === role} onClick={() => setRole(r.role)} className={`rounded-full px-4 py-2 text-sm font-semibold ${r.role === role ? "bg-primary text-primary-foreground" : "border"}`}>{r.label}</button>
          ))}
          <button onClick={() => { setRole(null); navigate({ to: "/" }); }} className="rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground">Sign out</button>
        </div>
      </div>

      {role === "citizen" && (
        <div className="mt-10 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <section className="rounded-2xl border bg-card p-6">
            <h2 className="text-2xl font-semibold">My sample applications</h2>
            <ul className="mt-4 divide-y">
              {apps.slice(0, 2).map((a) => (
                <li key={a.reference} className="flex items-center justify-between py-4">
                  <div><p className="font-semibold">{a.reference} · {a.component}</p><p className="text-sm text-muted-foreground">{a.city}</p></div>
                  <span className="rounded-full bg-accent/15 px-3 py-1 text-sm font-semibold">{a.status}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-2xl bg-primary p-6 text-primary-foreground">
            <h2 className="text-2xl font-semibold">Next steps</h2>
            <div className="mt-4 grid gap-2">
              <Link to="/eligibility" className="rounded-full bg-accent px-4 py-2.5 text-center font-semibold text-accent-foreground">Re-check eligibility</Link>
              <Link to="/documents" className="rounded-full border border-primary-foreground/40 px-4 py-2.5 text-center font-semibold">Document checklist</Link>
            </div>
          </section>
        </div>
      )}

      {role === "officer" && (
        <section className="mt-10 overflow-x-auto rounded-2xl border bg-card">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b p-4">
            <div><h2 className="text-lg font-semibold">Application queue</h2><p className="text-sm text-muted-foreground">Review and advance each application through the workflow.</p></div>
            <label className="flex items-center gap-2 text-sm font-semibold">Filter
              <select value={filter} onChange={(event) => setFilter(event.target.value)} className="rounded-full border bg-background px-3 py-2 font-normal">
                <option>All</option><option>Submitted</option><option>Under review</option><option>Approved</option><option>Needs documents</option>
              </select>
            </label>
          </div>
          {notice && <p role="status" className="border-b bg-accent/10 px-4 py-3 text-sm font-semibold text-primary">{notice}</p>}
          <table className="w-full text-left">
            <thead className="bg-secondary text-sm"><tr><th className="p-4">Reference</th><th className="p-4">Applicant</th><th className="p-4">Component</th><th className="p-4">Status</th><th className="p-4"><span className="sr-only">Action</span></th></tr></thead>
            <tbody className="divide-y">
              {filteredApps.map((a) => (
                <tr key={a.reference}>
                  <td className="p-4 font-semibold">{a.reference}</td><td className="p-4">{a.applicant}</td><td className="p-4">{a.component}</td><td className="p-4">{a.status}</td>
                  <td className="p-4"><button disabled={advanceStatus(a.status) === a.status} onClick={() => { const next = advanceStatus(a.status); setApps(apps.map((x) => x.reference === a.reference ? { ...x, status: next } : x)); setNotice(`${a.reference} moved to ${next}.`); toast("Application status updated"); }} className="rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground disabled:opacity-40">Advance</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {role === "admin" && (
        <section className="mt-10 rounded-2xl border bg-card p-6">
          <h2 className="text-2xl font-semibold">Sample project listings</h2>
          <ul className="mt-4 divide-y">
            {projects.map((p) => (
              <li key={p.slug} className="flex items-center justify-between gap-4 py-4">
                <div><p className="font-semibold">{p.name}</p><p className="text-sm text-muted-foreground">{p.city} · {p.scheme}</p></div>
                <label className="flex items-center gap-2 text-sm font-semibold">
                  <input type="checkbox" checked={p.published} onChange={() => { setProjects(projects.map((x) => x.slug === p.slug ? { ...x, published: !x.published } : x)); setNotice(`${p.name} visibility updated.`); toast("Project visibility updated"); }} className="h-4 w-4 accent-[var(--color-accent)]" />
                  Visible
                </label>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
