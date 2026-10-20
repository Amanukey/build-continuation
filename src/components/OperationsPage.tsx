import { Link } from "@tanstack/react-router";
import { CheckCircle2, Circle, ArrowRight, ClipboardCheck, FileText, Users, Settings2 } from "lucide-react";
import { useState } from "react";
import { PageIntro } from "@/components/SiteShell";

const destinations: Record<string, string> = {
  "Assigned applications": "/staff/applications",
  "Verification queue": "/staff/applications",
  Inspections: "/staff/applications",
  Grievances: "/staff/grievances",
  Reports: "/staff/reports",
  Users: "/admin/users",
  "Scheme rules": "/admin/scheme-rules",
  "Housing projects": "/admin/projects",
  Announcements: "/admin/announcements",
  "Audit logs": "/admin/audit-logs",
};

export function OperationsPage({ mode = "Staff", title = "Operations workspace", description = "Review assigned records and move each case to its next meaningful step.", items = ["Assigned applications", "Verification queue", "Inspections", "Grievances", "Reports"] }: { mode?: string; title?: string; description?: string; items?: string[] }) {
  const [completed, setCompleted] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const isAdmin = mode === "Administrator";
  const toggle = (item: string) => setCompleted((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item]);
  return <>
    <PageIntro eyebrow={`${mode} workspace`} title={title} description={description} />
    <section className="container-page py-12">
      <div className="mb-8 rounded-2xl border bg-card p-5 shadow-soft"><div className="flex items-center justify-between gap-4"><div><p className="text-sm font-semibold">Today&apos;s workflow</p><p className="mt-1 text-sm text-muted-foreground">Open a queue, complete the action, and return here for the next task.</p></div><span className="text-sm font-semibold text-primary">{completed.length}/{items.length} complete</span></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-secondary"><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${items.length ? (completed.length / items.length) * 100 : 0}%` }} /></div></div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{items.map((item, i) => { const isDone = completed.includes(item); return <article key={item} className="rounded-2xl border bg-card p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-md"><div className="flex items-start justify-between gap-3"><p className="text-xs font-bold uppercase tracking-widest text-accent">{isAdmin ? "Control" : "Queue"} {String(i + 1).padStart(2, "0")}</p>{isDone ? <CheckCircle2 className="text-primary" aria-label="Completed" /> : <Circle className="text-muted-foreground" aria-hidden />}</div><h2 className="mt-3 text-xl font-semibold">{item}</h2><p className="mt-2 text-sm text-muted-foreground">{isAdmin ? "Manage programme settings, records and public service information." : "Review records, capture a decision and keep the applicant informed."}</p><div className="mt-5 flex flex-wrap gap-2"><Link to={destinations[item] as never} className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Open queue <ArrowRight className="size-4" /></Link><button type="button" onClick={() => { toggle(item); setSelected(item); }} className="rounded-full border px-4 py-2 text-sm font-semibold hover:bg-secondary">{isDone ? "Reopen" : "Complete"}</button></div></article>; })}</div>
      {selected && <div role="status" className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-5"><p className="font-semibold">{selected} marked {completed.includes(selected) ? "complete" : "open"}.</p><p className="mt-1 text-sm text-muted-foreground">The workflow list is ready for your next operational action.</p></div>}
      <div className="mt-8 flex flex-wrap gap-3"><Link to="/" className="rounded-full border px-5 py-3 font-semibold hover:bg-secondary">Return to public portal</Link><Link to="/workspace" className="rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground">Open role workspace</Link></div>
    </section>
  </>;
}
