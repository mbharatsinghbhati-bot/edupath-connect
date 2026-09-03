import { createFileRoute, Link } from "@tanstack/react-router";
import professionalImage from "@/assets/professional.jpg";
import { formatINR, proCourses } from "@/data/courses";

export const Route = createFileRoute("/professional")({
  head: () => ({
    meta: [
      { title: "Evening Upskilling for Working Professionals | Aurora Learn" },
      {
        name: "description",
        content:
          "Short, replayable evening courses in data analytics, full-stack engineering and people leadership for corporate employees and working professionals.",
      },
      { property: "og:title", content: "Evening Upskilling for Working Professionals | Aurora Learn" },
      {
        property: "og:description",
        content: "Data, engineering and leadership courses built around a full-time job.",
      },
    ],
  }),
  component: ProfessionalPage,
});

function ProfessionalPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="grid items-center gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <span className="inline-block rounded-full bg-mint/30 px-3 py-1.5 text-xs font-bold text-ink">
            🎓 For corporate employees &amp; working professionals
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
            Evening upskilling, zero commute.
          </h1>
          <p className="mt-3 max-w-md font-semibold text-ink/70">
            Modules run 25 to 40 minutes, drop after 7pm IST, and stay replayable for a year. Cohorts are capped so
            your mentor actually knows your name.
          </p>
        </div>
        <div className="lg:col-span-5">
          <img
            src={professionalImage}
            width={1024}
            height={1024}
            loading="lazy"
            alt="Professional taking an evening class on a laptop"
            className="aspect-square w-full rounded-[2rem] object-cover"
          />
        </div>
      </div>

      <h2 className="mt-12 font-display text-2xl font-bold text-ink">Current cohorts</h2>
      <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {proCourses.map((course) => (
          <article key={course.id} className="flex flex-col rounded-3xl border-2 border-ink/5 bg-card p-5 pop-card">
            <span className="w-fit rounded-full bg-sky/20 px-3 py-1 text-[11px] font-bold">{course.level}</span>
            <h3 className="mt-4 font-display text-lg font-bold leading-tight text-ink">{course.title}</h3>
            <p className="mt-1 text-sm font-semibold text-ink/60">{course.blurb}</p>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold text-ink">{formatINR(course.price)}</span>
              <span className="text-xs font-bold text-ink/40">/ {course.weeks} weeks</span>
            </div>
            <Link
              to="/login"
              className="mt-5 rounded-full bg-brand py-3 text-center text-sm font-bold text-cream pop-brand transition hover:-translate-y-0.5"
            >
              Request a seat
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-12 rounded-[2rem] border-2 border-ink/5 bg-gradient-to-br from-sun/40 via-blush to-mint/30 p-6 sm:p-8">
        <h2 className="font-display text-2xl font-bold text-ink">Team plans</h2>
        <p className="mt-2 max-w-xl font-semibold text-ink/70">
          Enrolling five or more people from one company? We set up a shared cohort, a private doubt channel and a
          monthly progress report for the L&amp;D team.
        </p>
        <Link
          to="/login"
          className="mt-5 inline-block rounded-full bg-ink px-6 py-3 font-bold text-cream pop-ink transition hover:-translate-y-0.5"
        >
          Talk to us
        </Link>
      </div>
    </div>
  );
}
