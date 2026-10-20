import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useDemoRole } from "@/lib/demo-session";
import { DemoBadge, PageIntro } from "@/components/SiteShell";

export const Route = createFileRoute("/auth/login")({ component: Login });
function Login() {
  const navigate = useNavigate();
  const { setRole } = useDemoRole();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const submit = (event: React.FormEvent) => { event.preventDefault(); if (!email.includes("@") || password.length < 6) return setError("Enter a valid email and a password with at least 6 characters."); setRole("citizen"); navigate({ to: "/dashboard" }); };
  return <><PageIntro eyebrow="Account access" title="Sign in to your workspace." description="This frontend demo uses a simulated account flow. No credentials are sent anywhere." /><section className="container-page grid gap-8 py-14 lg:grid-cols-[1fr_.8fr]"><form onSubmit={submit} className="rounded-2xl border bg-card p-8 shadow-soft"><DemoBadge>Simulated sign-in</DemoBadge><div className="mt-6 grid gap-4"><label className="grid gap-2 font-semibold">Email<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="rounded-lg border bg-background px-4 py-3 font-normal" placeholder="you@example.com" /></label><label className="grid gap-2 font-semibold">Password<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="rounded-lg border bg-background px-4 py-3 font-normal" placeholder="At least 6 characters" /></label>{error && <p role="alert" className="text-sm font-semibold text-destructive">{error}</p>}<button className="rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground">Continue to demo</button></div><div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold text-primary"><Link to="/auth/register">Create an account</Link><Link to="/auth/forgot-password">Forgot password?</Link></div></form><aside className="rounded-2xl bg-secondary p-8"><h2 className="text-2xl font-semibold">Explore each role</h2><p className="mt-3 text-muted-foreground">After signing in, switch between citizen, officer and administrator views from the workspace.</p><Link to="/sign-in" className="mt-6 inline-block font-semibold text-primary">Open role selector →</Link></aside></section></>;
}
