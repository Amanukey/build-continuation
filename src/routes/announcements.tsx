import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/SiteShell";

export const Route = createFileRoute("/announcements")({
  head: () => ({
    meta: [
      { title: "Sample announcements — Housing Assist" },
      { name: "description", content: "Clearly labelled sample notices. Not official orders or deadlines." },
      { property: "og:title", content: "Housing Assist sample announcements" },
      { property: "og:description", content: "Example notices for the demo." },
    ],
  }),
  component: () => (
    <>
      <PageIntro eyebrow="From the demonstration" title="Updates, clearly labelled." description="Sample notices illustrate how an announcements page might work. They are not official." />
      <section className="container-page max-w-3xl space-y-5 py-12">
        {[
          ["Using the Housing Assist demonstration", "Explains the difference between browsing demo guidance and applying through an authorised official process."],
          ["How to read the housing examples", "Listings in this demonstration are illustrative. Their location and availability have not been verified."],
        ].map(([t, d]) => (
          <article key={t} className="rounded-2xl border bg-card p-6"><p className="eyebrow">Sample content</p><h2 className="mt-2 text-2xl font-semibold">{t}</h2><p className="mt-2 text-muted-foreground">{d}</p></article>
        ))}
      </section>
    </>
  ),
});
