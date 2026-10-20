import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { documentGroups } from "@/lib/demo-data";
import { PageIntro } from "@/components/SiteShell";

export const Route = createFileRoute("/documents")({
  head: () => ({
    meta: [
      { title: "Document preparation checklist — Housing Assist" },
      { name: "description", content: "An interactive checklist of documents you may be asked for. Nothing is uploaded." },
      { property: "og:title", content: "Document preparation checklist" },
      { property: "og:description", content: "Tick off what you have ready — nothing leaves your device." },
    ],
  }),
  component: Documents,
});

function Documents() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const total = documentGroups.flatMap((g) => g.items).length;
  const count = Object.values(checked).filter(Boolean).length;
  return (
    <>
      <PageIntro eyebrow="Get ready" title="Know what to keep at hand." description="A general preparation list, not a mandatory checklist. Never upload real documents here." />
      <section className="container-page py-16">
        <p className="mb-8 font-semibold">{count} of {total} ready</p>
        <div className="grid gap-6 md:grid-cols-2">
          {documentGroups.map((g) => (
            <div key={g.title} className="rounded-2xl border bg-card p-6">
              <h2 className="text-2xl font-semibold">{g.title}</h2>
              <ul className="mt-4 space-y-3">
                {g.items.map((it) => (
                  <li key={it}><label className="flex cursor-pointer gap-3"><input type="checkbox" checked={!!checked[it]} onChange={(e) => setChecked({ ...checked, [it]: e.target.checked })} className="mt-1 h-4 w-4 accent-[var(--color-accent)]" />{it}</label></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
