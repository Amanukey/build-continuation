import { createFileRoute, Link } from "@tanstack/react-router"
import { PageIntro } from "@/components/SiteShell"

export const Route = createFileRoute("/verify-otp")({
  component: VerifyOtp,
})

function VerifyOtp() {
  return (
    <>
      <PageIntro
        eyebrow="Verification"
        title="Enter the six-digit demonstration code."
        description="Use 123456 to simulate a successful OTP verification. No message is sent."
      />
      <section className="container-page max-w-xl py-12">
        <div className="rounded-2xl border bg-card p-6">
          <label className="grid gap-2 font-semibold">
            Verification code
            <input className="rounded-lg border p-3 tracking-[0.4em]" maxLength={6} placeholder="123456" />
          </label>
          <Link to="/dashboard" className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground">
            Verify and continue
          </Link>
        </div>
      </section>
    </>
  )
}
