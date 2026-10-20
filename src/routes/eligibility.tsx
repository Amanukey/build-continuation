import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { eligibilityQuestions, emptyEligibilityAnswers, getIndicativeEligibility, type EligibilityAnswers } from "@/lib/demo-data";
import { PageIntro } from "@/components/SiteShell";

export const Route = createFileRoute("/eligibility")({
  head: () => ({
    meta: [
      { title: "Indicative eligibility guide — Housing Assist" },
      { name: "description", content: "Six private questions to see which PMAY-U 2.0 pathway to explore. Not an eligibility decision." },
      { property: "og:title", content: "Indicative PMAY-U 2.0 eligibility guide" },
      { property: "og:description", content: "Answer six questions — no ID or bank details needed." },
    ],
  }),
  component: Eligibility,
});

const KEY = "ha-eligibility";

function Eligibility() {
  const [answers, setAnswers] = useState<EligibilityAnswers>(emptyEligibilityAnswers);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem(KEY);
    if (saved) setAnswers({ ...emptyEligibilityAnswers, ...JSON.parse(saved) });
  }, []);
  useEffect(() => { sessionStorage.setItem(KEY, JSON.stringify(answers)); }, [answers]);

  const q = eligibilityQuestions[step];
  const result = getIndicativeEligibility(answers);

  const next = () => {
    if (!answers[q.key]) return setError("Please choose an option to continue.");
    setError("");
    if (step === eligibilityQuestions.length - 1) setDone(true);
    else setStep(step + 1);
  };
  const restart = () => { setAnswers(emptyEligibilityAnswers); setStep(0); setDone(false); };

  return (
    <>
      <PageIntro eyebrow="Indicative guide" title="Which pathway should you explore?" description="Six questions. Answers stay in this browser tab only and are cleared when you close it." />
      <section className="container-page max-w-3xl py-14">
        <p className="mb-6 flex items-center gap-2 text-sm text-muted-foreground"><ShieldCheck className="h-4 w-4 text-accent" /> We never ask for Aadhaar, bank or document numbers.</p>
        {!done ? (
          <div className="rounded-2xl border bg-card p-8 shadow-soft">
            <div className="h-1.5 rounded-full bg-muted"><div className="h-full rounded-full bg-accent transition-all" style={{ width: `${((step + 1) / eligibilityQuestions.length) * 100}%` }} /></div>
            <p className="mt-6 text-sm font-semibold text-muted-foreground">Question {step + 1} of {eligibilityQuestions.length}</p>
            <fieldset className="mt-2">
              <legend className="font-display text-2xl font-semibold">{q.label}</legend>
              <p className="mt-2 text-sm text-muted-foreground">{q.hint}</p>
              <div className="mt-6 grid gap-3">
                {q.options.map((o) => (
                  <label key={o} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${answers[q.key] === o ? "border-accent bg-accent/10" : "hover:bg-secondary"}`}>
                    <input type="radio" name={q.key} value={o} checked={answers[q.key] === o} onChange={() => { setAnswers({ ...answers, [q.key]: o }); setError(""); }} className="accent-[var(--color-accent)]" />
                    {o}
                  </label>
                ))}
              </div>
            </fieldset>
            {error && <p role="alert" className="mt-4 text-sm font-semibold text-destructive">{error}</p>}
            <div className="mt-8 flex justify-between">
              <button disabled={step === 0} onClick={() => setStep(step - 1)} className="rounded-full border px-5 py-2.5 font-semibold disabled:opacity-40">Back</button>
              <button onClick={next} className="rounded-full bg-primary px-6 py-2.5 font-semibold text-primary-foreground">{step === eligibilityQuestions.length - 1 ? "See result" : "Continue"}</button>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border bg-card p-8 shadow-soft" aria-live="polite">
            <p className="eyebrow">Indicative result — not a decision</p>
            <h2 className="mt-3 text-4xl font-semibold">{result.outcome}</h2>
            <p className="mt-2 text-muted-foreground">Component selected: <strong className="text-foreground">{result.component}</strong></p>
            <p className="mt-6 rounded-xl bg-secondary p-5">{result.nextStep}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {result.component !== "Not selected" && <Link to="/schemes/$code" params={{ code: result.component }} className="rounded-full bg-primary px-5 py-2.5 font-semibold text-primary-foreground">Read the {result.component} guide</Link>}
              <Link to="/documents" className="rounded-full border px-5 py-2.5 font-semibold">Prepare documents</Link>
              <button onClick={restart} className="rounded-full px-5 py-2.5 font-semibold text-muted-foreground hover:text-foreground">Start again</button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
