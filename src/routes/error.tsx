import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/SiteShell";
export const Route=createFileRoute("/error")({component:()=> <><PageIntro eyebrow="Something went wrong" title="We could not complete that step." description="Your demonstration data is safe. Return to a known task and try again."/><section className="container-page py-12"><Link to="/dashboard" className="rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground">Open workspace</Link></section></>});
