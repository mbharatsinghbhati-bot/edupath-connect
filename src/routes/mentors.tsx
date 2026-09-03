import { createFileRoute } from "@tanstack/react-router";
import { mentors } from "@/data/courses";

export const Route = createFileRoute("/mentors")({
  head: () => ({
    meta: [
      { title: "Meet the Mentors | Aurora Learn" },
      {
        name: "description",
        content:
          "Aurora Learn mentors teach Class 9–12 boards, NEET Biology, JEE Mathematics and professional upskilling, with 7 to 15 years of classroom experience each.",
      },
      { property: "og:title", content: "Meet the Mentors | Aurora Learn" },
      {
        property: "og:description",
        content: "Board, NEET, JEE and professional mentors with 7 to 15 years of teaching experience.",
      },
    ],
  }),
  component: MentorsPage,
});

function MentorsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">Meet the mentors</h1>
      <p className="mt-2 max-w-2xl font-semibold text-ink/60">
        Every premium batch is led by a subject mentor who also runs the weekly doubt calls — not a rotating panel of
        strangers.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {mentors.map((mentor) => (
          <article key={mentor.name} className="rounded-3xl border-2 border-ink/5 bg-card p-5 pop-card">
            <div className={`grid size-14 place-items-center rounded-2xl ${mentor.tint} font-display text-xl font-bold text-ink`}>
              {mentor.initials}
            </div>
            <h2 className="mt-4 font-display text-lg font-bold text-ink">{mentor.name}</h2>
            <p className="text-sm font-bold text-ink/60">{mentor.subject}</p>
            <p className="mt-3 inline-block rounded-full bg-sun/25 px-3 py-1 text-xs font-bold text-ink">
              {mentor.years} years teaching
            </p>
          </article>
        ))}
      </div>

      <div className="mt-12 rounded-[2rem] border-2 border-ink/5 bg-ink p-6 text-cream sm:p-8">
        <h2 className="font-display text-2xl font-bold">How mentoring works</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {[
            { step: "01", title: "Weekly call", body: "A scheduled 30-minute call to clear the week's backlog." },
            { step: "02", title: "Test review", body: "Your mentor walks through every wrong answer with you." },
            { step: "03", title: "Plan reset", body: "A fresh study plan each month based on your test data." },
          ].map((item) => (
            <div key={item.step} className="rounded-2xl bg-cream/10 p-4">
              <span className="text-xs font-bold text-sun">{item.step}</span>
              <h3 className="mt-1 font-display text-lg font-bold text-cream">{item.title}</h3>
              <p className="mt-1 text-sm font-semibold text-cream/70">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
