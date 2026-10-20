import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageIntro, DemoBadge } from "@/components/SiteShell";

export const Route = createFileRoute("/contact")({ component: Contact });

function Contact() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (!form.get("name") || !form.get("email") || !form.get("message")) return setError("Please complete all required fields.");
    setError(""); setSent(true);
  }
  return <><PageIntro eyebrow="Support" title="Contact the demonstration team." description="Send a question about this student prototype. This form does not reach a government department." /><section className="container-page grid gap-8 py-12 lg:grid-cols-[1.2fr_.8fr]"><form onSubmit={submit} className="rounded-2xl border bg-card p-6 shadow-soft"><DemoBadge>Simulated submission</DemoBadge><div className="mt-6 grid gap-4"><label className="grid gap-2 text-sm font-semibold">Name<input name="name" className="rounded-lg border bg-background px-3 py-2.5 font-normal" /></label><label className="grid gap-2 text-sm font-semibold">Email<input name="email" type="email" className="rounded-lg border bg-background px-3 py-2.5 font-normal" /></label><label className="grid gap-2 text-sm font-semibold">Subject<input name="subject" className="rounded-lg border bg-background px-3 py-2.5 font-normal" /></label><label className="grid gap-2 text-sm font-semibold">Message<textarea name="message" rows={5} className="rounded-lg border bg-background px-3 py-2.5 font-normal" /></label></div>{error && <p role="alert" className="mt-4 text-sm font-semibold text-destructive">{error}</p>}{sent ? <p className="mt-5 rounded-lg bg-accent/15 p-4 text-sm font-semibold" role="status">Thanks. Your simulated reference is DEMO-CONTACT-1042.</p> : <button className="mt-6 rounded-full bg-primary px-5 py-2.5 font-semibold text-primary-foreground">Send message</button>}</form><aside className="rounded-2xl bg-primary p-6 text-primary-foreground"><h2 className="text-2xl font-semibold">Need quick guidance?</h2><p className="mt-3 opacity-80">Browse the <a className="underline" href="/help">Help Centre</a> or read the <a className="underline" href="/faq">FAQs</a> first. For official information, use the reference link in the footer.</p></aside></section></>;
}
