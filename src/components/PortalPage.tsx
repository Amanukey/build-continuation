import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, FileText, MapPin, ShieldCheck } from "lucide-react";
import { PageIntro } from "@/components/SiteShell";

export type PortalAction = { label: string; to: string; primary?: boolean };

export function PortalPage({ eyebrow, title, description, sections, actions = [] }: { eyebrow: string; title: string; description: string; sections: { title: string; text: string; icon?: "check" | "file" | "map" }[]; actions?: PortalAction[] }) {
  const icons = { check: CheckCircle2, file: FileText, map: MapPin };
  return <>
    <PageIntro eyebrow={eyebrow} title={title} description={description} />
    <section className="container-page py-12">
      {actions.length > 0 && <div className="mb-10 flex flex-wrap gap-3">{actions.map((action) => <Link key={action.to} to={action.to as never} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold ${action.primary ? "bg-primary text-primary-foreground" : "border bg-card hover:bg-secondary"}`}>{action.label}<ArrowRight className="h-4 w-4" /></Link>)}</div>}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{sections.map((section) => { const Icon = icons[section.icon ?? "check"]; return <article key={section.title} className="rounded-2xl border bg-card p-6 shadow-soft"><Icon className="h-7 w-7 text-accent" aria-hidden /><h2 className="mt-5 text-xl font-semibold">{section.title}</h2><p className="mt-3 leading-7 text-muted-foreground">{section.text}</p></article> })}</div>
      <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-6"><div className="flex gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden /><p className="text-sm leading-6 text-muted-foreground">This college demonstration uses synthetic records. It explains the journey and does not make an official eligibility decision or submit information to a government system.</p></div></div>
    </section>
  </>;
}
