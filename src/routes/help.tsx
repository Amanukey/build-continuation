import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { PageIntro } from "@/components/SiteShell";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help centre — Housing Assist" },
      { name: "description", content: "Get help using the Housing Assist demo and find the right official contact." },
      { property: "og:title", content: "Housing Assist help centre" },
      { property: "og:description", content: "Guidance and a simulated contact form." },
    ],
  }),
  component: Help,
});

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(80),
  message: z.string().trim().min(10, "Please write at least 10 characters").max(800),
});

function Help() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const r = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!r.success) return setErrors(Object.fromEntries(r.error.issues.map((i) => [i.path[0], i.message])));
    setErrors({}); setSent(true); toast.success("Message simulated — nothing was sent.");
  };
  return (
    <>
      <PageIntro eyebrow="Help" title="Find your next answer." description="For your actual application, contact your urban local body or the official PMAY-U helpline." />
      <section className="container-page max-w-2xl py-12">
        {sent ? (
          <div className="rounded-2xl border bg-card p-8"><h2 className="text-2xl font-semibold">Thanks — simulated only</h2><p className="mt-2 text-muted-foreground">This demo doesn't send messages anywhere.</p><button onClick={() => setSent(false)} className="mt-4 font-semibold text-primary underline">Write another</button></div>
        ) : (
          <form onSubmit={submit} noValidate className="space-y-5 rounded-2xl border bg-card p-8">
            <h2 className="text-2xl font-semibold">Ask about this demo</h2>
            <div><label htmlFor="name" className="font-semibold">Name</label><input id="name" name="name" className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5" />{errors["name"] && <p className="mt-1 text-sm text-destructive">{errors["name"]}</p>}</div>
            <div><label htmlFor="message" className="font-semibold">Message</label><textarea id="message" name="message" rows={5} className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5" /><p className="mt-1 text-xs text-muted-foreground">Please don't include ID, bank or phone numbers.</p>{errors["message"] && <p className="text-sm text-destructive">{errors["message"]}</p>}</div>
            <button className="rounded-full bg-primary px-6 py-2.5 font-semibold text-primary-foreground">Send (simulated)</button>
          </form>
        )}
      </section>
    </>
  );
}
