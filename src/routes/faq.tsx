import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { faqItems } from "@/lib/demo-data";
import { PageIntro } from "@/components/SiteShell";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently asked questions — Housing Assist" },
      { name: "description", content: "Plain-language answers on PMAY-U 2.0 components, eligibility and this demo." },
      { property: "og:title", content: "Housing Assist FAQ" },
      { property: "og:description", content: "Search answers about components, eligibility and documents." },
    ],
  }),
  component: Faq,
});

function Faq() {
  const [q, setQ] = useState("");
  const [topic, setTopic] = useState("All topics");
  const list = faqItems.filter((f) => (topic === "All topics" || f.category === topic) && (f.question + f.answer).toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <PageIntro eyebrow="Answers" title="A clearer answer, one question at a time." description="Browse plain-language starting points on components, eligibility and the demo." />
      <section className="container-page max-w-3xl py-12">
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="flex flex-1 items-center gap-2 rounded-full border bg-card px-4"><Search className="h-4 w-4" /><span className="sr-only">Search questions</span>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search questions" className="w-full bg-transparent py-3 outline-none" /></label>
          <label><span className="sr-only">Topic</span><select value={topic} onChange={(e) => setTopic(e.target.value)} className="rounded-full border bg-card px-4 py-3">
            <option>All topics</option>{[...new Set(faqItems.map((f) => f.category))].map((c) => <option key={c}>{c}</option>)}</select></label>
        </div>
        <div className="mt-8 space-y-3">
          {list.map((f) => (
            <details key={f.question} className="rounded-xl border bg-card p-5">
              <summary className="cursor-pointer font-semibold"><span className="mr-2 text-xs font-bold uppercase tracking-wider text-warm">{f.category}</span>{f.question}</summary>
              <p className="mt-3 text-muted-foreground">{f.answer}</p>
            </details>
          ))}
          {list.length === 0 && <p className="rounded-xl border border-dashed p-8 text-center">No questions found. <button className="font-semibold text-primary underline" onClick={() => { setQ(""); setTopic("All topics"); }}>Reset</button></p>}
        </div>
        <Link to="/help" className="mt-8 inline-block font-semibold text-primary hover:underline">Still stuck? Visit the help centre →</Link>
      </section>
    </>
  );
}
