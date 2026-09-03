import { Link } from "@tanstack/react-router";
import { useApp } from "@/context/app-context";
import { Wordmark } from "./Logo";

const links = [
  { to: "/courses", label: "Courses" },
  { to: "/pricing", label: "Pricing" },
  { to: "/professional", label: "Professionals" },
  { to: "/mentors", label: "Mentors" },
] as const;

export function SiteHeader() {
  const { setPanelOpen, user, prefs } = useApp();

  return (
    <>
      <header className="sticky top-0 z-30 border-b-2 border-ink/5 bg-cream/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/" aria-label="Aurora Learn home">
            <Wordmark />
          </Link>
          <nav className="hidden items-center gap-1 text-sm font-bold text-ink lg:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeProps={{ className: "bg-sun/40" }}
                className="rounded-full px-3 py-2 transition hover:bg-sun/30"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {user ? (
              <Link
                to="/my-learning"
                className="hidden rounded-full bg-ink px-4 py-2.5 text-sm font-bold text-cream pop-ink transition hover:-translate-y-0.5 sm:block"
              >
                My learning
              </Link>
            ) : (
              <Link
                to="/login"
                className="rounded-full bg-ink px-4 py-2.5 text-sm font-bold text-cream pop-ink transition hover:-translate-y-0.5"
              >
                Login
              </Link>
            )}
            <button
              onClick={() => setPanelOpen(true)}
              className="grid size-10 place-items-center rounded-full border-2 border-ink/10 bg-card text-lg font-bold text-ink"
              aria-label="Open menu"
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      <section className="border-b-2 border-accent-violet/10 bg-accent-violet/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 text-sm font-bold text-ink sm:px-6">
          <button onClick={() => setPanelOpen(true)} className="flex items-center gap-1.5 hover:underline">
            📍 Location <span className="text-ink/60">{prefs.location ?? "Choose"}</span>
          </button>
          <span className="text-ink/20">•</span>
          <button onClick={() => setPanelOpen(true)} className="flex items-center gap-1.5 hover:underline">
            🌐 Language <span className="text-ink/60">{prefs.language ?? "Choose"}</span>
          </button>
          <span className="text-ink/20">•</span>
          <span className="flex items-center gap-1.5">
            👤 {user ? user.email : "Guest"}
            {user ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-mint/25 px-2 py-0.5 text-[11px]">
                OTP verified
              </span>
            ) : null}
          </span>
        </div>
      </section>
    </>
  );
}
