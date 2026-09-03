import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-10 sm:flex-row sm:px-6">
        <div>
          <div className="flex items-center gap-2.5">
            <Logo size="sm" />
            <span className="font-display text-lg font-bold">Aurora Learn</span>
          </div>
          <p className="mt-3 max-w-xs text-sm font-semibold text-cream/60">
            Playful, affordable education for school students and working professionals across India.
          </p>
        </div>
        <div className="flex gap-10 text-sm font-bold">
          <div className="flex flex-col gap-2 text-cream/70">
            <span className="text-cream">Explore</span>
            <Link to="/courses" className="transition hover:text-sun">
              Courses
            </Link>
            <Link to="/pricing" className="transition hover:text-sun">
              Pricing
            </Link>
            <Link to="/professional" className="transition hover:text-sun">
              Professionals
            </Link>
          </div>
          <div className="flex flex-col gap-2 text-cream/70">
            <span className="text-cream">Account</span>
            <Link to="/mentors" className="transition hover:text-sun">
              Mentors
            </Link>
            <Link to="/my-learning" className="transition hover:text-sun">
              My learning
            </Link>
            <Link to="/login" className="transition hover:text-sun">
              Login
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl justify-between px-4 py-4 text-xs font-bold text-cream/40 sm:px-6">
          <span>© 2026 Aurora Learn</span>
          <span>Made for learners 🌈</span>
        </div>
      </div>
    </footer>
  );
}
