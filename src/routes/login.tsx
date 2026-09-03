import { useEffect, useRef, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useApp } from "@/context/app-context";
import { Logo } from "@/components/Logo";

type LoginSearch = { next?: string };

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>): LoginSearch => ({
    next: typeof search["next"] === "string" && search["next"].startsWith("/") ? search["next"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Login with Email OTP | Aurora Learn" },
      {
        name: "description",
        content:
          "Sign in to Aurora Learn with your email address and a 6-digit one-time password. No passwords to remember.",
      },
      { property: "og:title", content: "Login with Email OTP | Aurora Learn" },
      { property: "og:description", content: "Sign in with your email and a 6-digit one-time password." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { next } = Route.useSearch();
  const navigate = useNavigate();
  const { user, prefs } = useApp();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(0);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (user) navigate({ to: next ?? "/my-learning" });
  }, [user, next, navigate]);

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = window.setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [seconds]);

  async function sendCode(e?: React.FormEvent) {
    e?.preventDefault();
    setError(null);
    setBusy(true);
    const { error: otpError } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { shouldCreateUser: true },
    });
    setBusy(false);
    if (otpError) {
      setError(otpError.message);
      return;
    }
    setStep("otp");
    setSeconds(45);
    setDigits(["", "", "", "", "", ""]);
    window.setTimeout(() => inputs.current[0]?.focus(), 50);
  }

  async function verify(code: string) {
    setError(null);
    setBusy(true);
    const { error: verifyError } = await supabase.auth.verifyOtp({
      email: email.trim(),
      token: code,
      type: "email",
    });
    setBusy(false);
    if (verifyError) {
      setError(verifyError.message);
      return;
    }
    await supabase
      .from("profiles")
      .upsert({
        id: (await supabase.auth.getUser()).data.user!.id,
        email: email.trim(),
        location: prefs.location,
        language: prefs.language,
      })
      .select();
    navigate({ to: next ?? "/my-learning" });
  }

  function onDigit(index: number, value: string) {
    const clean = value.replace(/\D/g, "");
    if (!clean) {
      setDigits((d) => d.map((v, i) => (i === index ? "" : v)));
      return;
    }
    const nextDigits = [...digits];
    clean.split("").forEach((ch, offset) => {
      if (index + offset < 6) nextDigits[index + offset] = ch;
    });
    setDigits(nextDigits);
    const focusAt = Math.min(index + clean.length, 5);
    inputs.current[focusAt]?.focus();
    if (nextDigits.every((d) => d)) void verify(nextDigits.join(""));
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">Login to Aurora Learn</h1>
        <p className="mt-3 max-w-md font-semibold text-ink/70">
          We never ask for a password. Enter your email, and we'll send a 6-digit one-time code that expires in a few
          minutes.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {[
            { title: "One account, every device", body: "Pick up a lecture on your phone where the laptop left off." },
            { title: "Free batches stay free", body: "Standard batches unlock the moment you verify." },
            { title: "Premium in one tap", body: "Your enrolled batches follow the account, not the browser." },
            { title: "Safer than passwords", body: "Nothing to leak, nothing to reuse." },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border-2 border-ink/5 bg-card p-4">
              <p className="font-display font-bold text-ink">{item.title}</p>
              <p className="mt-1 text-sm font-semibold text-ink/60">{item.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="rounded-[2rem] bg-ink p-6 text-cream">
          <Logo size="sm" />
          <h2 className="mt-4 font-display text-2xl font-bold">
            {step === "email" ? "Sign in with email" : "Verify with OTP"}
          </h2>

          {step === "email" ? (
            <form onSubmit={sendCode}>
              <label className="mt-5 block text-xs font-bold text-cream/70" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1.5 w-full rounded-xl bg-cream/10 px-3 py-2.5 text-sm font-bold text-cream outline-none ring-1 ring-cream/15 focus:ring-brand"
              />
              <button
                type="submit"
                disabled={busy}
                className="mt-5 w-full rounded-full bg-brand py-3 text-sm font-bold text-cream pop-brand transition hover:-translate-y-0.5 disabled:opacity-60"
              >
                {busy ? "Sending code…" : "Send OTP"}
              </button>
            </form>
          ) : (
            <>
              <p className="mt-2 text-sm font-semibold text-cream/70">
                Code sent to <span className="text-cream">{email}</span>
              </p>
              <label className="mt-5 block text-xs font-bold text-cream/70">6-digit OTP</label>
              <div className="mt-1.5 flex gap-2">
                {digits.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputs.current[index] = el;
                    }}
                    inputMode="numeric"
                    maxLength={6}
                    value={digit}
                    aria-label={`OTP digit ${index + 1}`}
                    onChange={(e) => onDigit(index, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && !digits[index] && index > 0) inputs.current[index - 1]?.focus();
                    }}
                    className="size-11 rounded-xl bg-cream/10 text-center font-display text-lg font-bold text-cream outline-none ring-1 ring-cream/15 focus:ring-brand"
                  />
                ))}
              </div>
              <button
                onClick={() => void verify(digits.join(""))}
                disabled={busy || digits.some((d) => !d)}
                className="mt-5 w-full rounded-full bg-brand py-3 text-sm font-bold text-cream pop-brand transition hover:-translate-y-0.5 disabled:opacity-60"
              >
                {busy ? "Verifying…" : "Verify & continue"}
              </button>
              <div className="mt-3 flex items-center justify-between text-[11px] font-bold text-cream/60">
                <button onClick={() => setStep("email")} className="underline">
                  Change email
                </button>
                <button
                  onClick={() => void sendCode()}
                  disabled={seconds > 0 || busy}
                  className="underline disabled:no-underline disabled:opacity-60"
                >
                  {seconds > 0 ? `Resend in ${String(seconds).padStart(2, "0")}s` : "Resend code"}
                </button>
              </div>
            </>
          )}

          {error ? (
            <p className="mt-4 rounded-xl bg-brand/20 px-3 py-2 text-xs font-bold text-cream">{error}</p>
          ) : null}

          <p className="mt-4 text-center text-[11px] font-bold text-cream/50">
            {prefs.language ?? "English"} · {prefs.location ?? "India"}
          </p>
        </div>
      </div>
    </div>
  );
}
