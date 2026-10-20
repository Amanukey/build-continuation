import { Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/SiteShell";
import { CheckCircle2, Circle } from "lucide-react";
import { useState } from "react";

export function OperationsPage({ mode = "Staff", title = "Operations workspace", description = "Review assigned records and move each case to its next meaningful step.", items = ["Assigned applications", "Verification queue", "Inspections", "Grievances", "Reports"] }: { mode?: string; title?: string; description?: string; items?: string[] }) {
  const [completed, setCompleted] = useState<string[]>([]);
  const toggle = (item: string) => setCompleted((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item]);
  return <>
    <PageIntro eyebrow={`${mode} workspace`} title={title} description={description} />
    <section className="container-page py-12">
      <div className="mb-8 rounded-2xl border bg-card p-5 shadow-soft"><div className="flex items-center justify-between gap-4"><div><p className="text-sm font-semibold">Today&apos;s workflow</p><p className="mt-1 text-sm text-muted-foreground">Complete each action to keep the casework moving.</p></div><span className="text-sm font-semibold text-primary">{completed.length}/{items.length} complete</span></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-secondary"><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${items.length ? (completed.length / items.length) * 100 : 0}%` }} /></div></div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{items.map((item, i) => { const isDone = completed.includes(item); return <article key={item} className="rounded-2xl border bg-card p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-md"><div className="flex items-start justify-between gap-3"><p className="text-xs font-bold uppercase tracking-widest text-accent">Task {String(i + 1).padStart(2, "0")}</p>{isDone ? <CheckCircle2 className="text-primary" aria-label="Completed" /> : <Circle className="text-muted-foreground" aria-hidden />}</div><h2 className="mt-3 text-xl font-semibold">{item}</h2><p className="mt-2 text-sm text-muted-foreground">Review the latest records, capture a decision and keep the applicant informed.</p><button type="button" onClick={() => toggle(item)} className="mt-5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">{isDone ? "Mark as open" : "Open task"}</button></article>; })}</div>
      <div className="mt-8 flex flex-wrap gap-3"><Link to="/" className="rounded-full border px-5 py-3 font-semibold hover:bg-secondary">Return to public portal</Link><Link to="/dashboard" className="rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground">Open citizen workspace</Link></div>
    </section>
  </>;
}
