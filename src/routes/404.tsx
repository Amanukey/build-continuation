import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/SiteShell";
export const Route=createFileRoute("/404")({component:()=> <><PageIntro eyebrow="Page not found" title="That page is not in this journey." description="Return to the home page or choose a task to continue."/><section className="container-page py-12"><Link to="/" className="rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground">Return home</Link></section></>});
