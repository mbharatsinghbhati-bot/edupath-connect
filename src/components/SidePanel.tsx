import { Link } from "@tanstack/react-router";
import { useApp } from "@/context/app-context";
import { cities, languages } from "@/data/courses";
import { Logo } from "./Logo";

const navItems = [
  { to: "/", label: "Home", icon: "🏠", meta: "" },
  { to: "/courses", label: "Courses", icon: "🎓", meta: "Class 9–12" },
  { to: "/pricing", label: "Pricing", icon: "💳", meta: "from ₹0" },
  { to: "/professional", label: "Professionals", icon: "💼", meta: "Evening" },
  { to: "/mentors", label: "Mentors", icon: "👩‍🏫", meta: "180+" },
  { to: "/my-learning", label: "My learning", icon: "📖", meta: "" },
] as const;

export function SidePanel() {
  const { panelOpen, setPanelOpen, prefs, savePrefs, user, signOut } = useApp();

  return (
    <>
      <div
        onClick={() => setPanelOpen(false)}
        className={`fixed inset-0 z-40 bg-ink/40 transition-opacity duration-200 ${
          panelOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
      />
      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-80 max-w-[85vw] flex-col border-l-2 border-ink/10 bg-cream panel-shadow transition-transform duration-300 ${
          panelOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!panelOpen}
      >
        <div className="flex items-center justify-between border-b-2 border-ink/5 p-5">
          <div className="flex items-center gap-2.5">
            <Logo size="sm" />
            <div>
              <div className="font-display font-bold text-ink">Menu</div>
              <div className="text-[11px] font-bold text-ink/50">
                {user ? `Hi, ${user.email?.split("@")[0]} 👋` : "Welcome 👋"}
              </div>
            </div>
          </div>
          <button
            onClick={() => setPanelOpen(false)}
            className="grid size-9 place-items-center rounded-full border-2 border-ink/10 bg-card font-bold text-ink"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <div className="border-b-2 border-ink/5 p-5">
          <p className="mb-3 text-xs font-bold text-ink/50">Your preferences</p>
          <div className="grid grid-cols-2 gap-3">
            <label className="text-xs font-bold text-ink/60">
              <span className="mb-1 block">Location</span>
              <select
                value={prefs.location ?? ""}
                onChange={(e) => savePrefs({ ...prefs, location: e.target.value })}
                className="w-full rounded-xl border-2 border-ink/10 bg-card px-3 py-2 text-sm font-bold text-ink"
              >
                {cities.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <label className="text-xs font-bold text-ink/60">
              <span className="mb-1 block">Language</span>
              <select
                value={prefs.language ?? ""}
                onChange={(e) => savePrefs({ ...prefs, language: e.target.value })}
                className="w-full rounded-xl border-2 border-ink/10 bg-card px-3 py-2 text-sm font-bold text-ink"
              >
                {languages.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <nav className="flex-1 space-y-1.5 overflow-auto p-4">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setPanelOpen(false)}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "bg-brand/10" }}
              className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold text-ink/80 transition hover:bg-sun/20"
            >
              <span className="flex items-center gap-3">
                <span aria-hidden="true">{item.icon}</span>
                {item.label}
              </span>
              {item.meta ? <span className="text-xs text-ink/40">{item.meta}</span> : null}
            </Link>
          ))}
        </nav>

        <div className="p-4">
          <div className="rounded-2xl border-2 border-ink/5 bg-card p-4">
            {user ? (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-ink/60">Signed in</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-mint/25 px-2 py-0.5 text-[10px] font-bold">
                    ✓ OTP verified
                  </span>
                </div>
                <p className="mt-2 truncate font-display font-bold text-ink">{user.email}</p>
                <button
                  onClick={() => {
                    void signOut();
                    setPanelOpen(false);
                  }}
                  className="mt-3 w-full rounded-full bg-ink py-2.5 text-xs font-bold text-cream pop-ink transition hover:-translate-y-0.5"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <p className="text-xs font-bold text-ink/60">Not signed in</p>
                <p className="mt-1 font-display font-bold text-ink">Verify by email OTP</p>
                <Link
                  to="/login"
                  onClick={() => setPanelOpen(false)}
                  className="mt-3 block rounded-full bg-brand py-2.5 text-center text-xs font-bold text-cream pop-brand transition hover:-translate-y-0.5"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
