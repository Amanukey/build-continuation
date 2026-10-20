import { createFileRoute, Link } from "@tanstack/react-router";
import { officialSchemeUrl } from "@/lib/demo-data";
import { PageIntro } from "@/components/SiteShell";

export const Route = createFileRoute("/how-to-apply")({
  head: () => ({
    meta: [
      { title: "How to apply for PMAY-U 2.0 — Housing Assist" },
      { name: "description", content: "A step-by-step preparation guide for applying through the official PMAY-U 2.0 channel." },
      { property: "og:title", content: "How to apply — step by step" },
      { property: "og:description", content: "Prepare, verify and apply through the authorised process." },
    ],
  }),
  component: HowToApply,
});

const steps = [
  { t: "Understand the components", d: "Read which component matches your situation.", to: "/schemes" as const },
  { t: "Check indicative eligibility", d: "Use our six-question guide to spot what to verify.", to: "/eligibility" as const },
  { t: "Prepare your documents", d: "Gather identity, income and property details.", to: "/documents" as const },
  { t: "Apply on the official portal", d: "Submit only through the authorised government website or your urban local body." },
  { t: "Track with the authority", d: "Follow up using the reference number issued officially." },
];

function HowToApply() {
  return (
    <>
      <PageIntro eyebrow="Application guidance" title="Five steps, no guesswork." description="This demo prepares you — the real application happens on the official portal." />
      <section className="container-page max-w-3xl py-16">
        <ol className="relative space-y-8 border-l-2 border-accent/40 pl-8">
          {steps.map((s, i) => (
            <li key={s.t} className="relative">
              <span className="absolute -left-[2.85rem] flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{i + 1}</span>
              <h2 className="text-2xl font-semibold">{s.t}</h2>
              <p className="mt-1 text-muted-foreground">{s.d}</p>
              {s.to ? <Link to={s.to} className="mt-2 inline-block font-semibold text-primary hover:underline">Open →</Link> : i === 3 ? <a href={officialSchemeUrl} target="_blank" rel="noreferrer" className="mt-2 inline-block font-semibold text-primary hover:underline">pmay-urban.gov.in ↗</a> : null}
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
