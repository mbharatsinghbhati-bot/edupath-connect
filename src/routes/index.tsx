import { createFileRoute, Link } from "@tanstack/react-router";
import heroImage from "@/assets/hero-students.jpg";
import professionalImage from "@/assets/professional.jpg";
import { classes, formatINR } from "@/data/courses";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurora Learn — Free & Premium Batches for Class 9–12, NEET, JEE" },
      {
        name: "description",
        content:
          "Learn with Aurora Learn: free standard batches for Class 9 to 12, premium live batches, dedicated NEET and JEE tracks, and evening courses for working professionals.",
      },
      { property: "og:title", content: "Aurora Learn — Online Classes for Students & Professionals" },
      {
        property: "og:description",
        content: "Free standard batches, premium live batches, NEET and JEE tracks, and professional upskilling.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = [
    classes[3].batches[0],
    classes[3].batches[1],
    classes[3].batches[2],
  ];

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pb-4 pt-10 sm:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="inline-block rounded-full bg-sun/40 px-3 py-1.5 text-xs font-bold text-ink">
              ✦ Learn by day, upskill by night
            </span>
            <h1 className="mt-4 font-display text-4xl leading-[1.05] font-bold text-ink sm:text-5xl">
              Big ideas, made <span className="text-brand">playful</span> &amp; easy to{" "}
              <span className="text-accent-violet">crack</span>.
            </h1>
            <p className="mt-4 max-w-md text-lg font-semibold text-ink/70">
              From Class 9 to 12, plus upskilling for working professionals. Free standard batches and premium
              mentor-led tracks.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/courses"
                className="rounded-full bg-brand px-6 py-3 font-bold text-cream pop-brand transition hover:-translate-y-0.5"
              >
                Browse courses
              </Link>
              <Link
                to="/batches/$batchId"
                params={{ batchId: "c12-standard" }}
                className="rounded-full border-2 border-ink/10 bg-card px-6 py-3 font-bold text-ink pop-card transition hover:-translate-y-0.5"
              >
                Watch a free demo
              </Link>
            </div>
            <div className="mt-8 flex gap-8">
              <div>
                <div className="font-display text-3xl font-bold text-ink">2.4L+</div>
                <div className="text-xs font-bold uppercase tracking-wide text-ink/50">Students</div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-ink">180+</div>
                <div className="text-xs font-bold uppercase tracking-wide text-ink/50">Mentors</div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-ink">4.8★</div>
                <div className="text-xs font-bold uppercase tracking-wide text-ink/50">Rating</div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5">
            <img
              src={heroImage}
              width={1024}
              height={820}
              alt="Students learning together with headphones and open books"
              className="aspect-[5/4] w-full rounded-[2rem] object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink">Pick your class</h2>
            <p className="text-sm font-bold text-ink/50">Two batch tracks per class · Premium unlocks full access</p>
          </div>
          <span className="hidden text-xs font-bold text-ink/40 sm:inline">
            Class 12 gets NEET &amp; JEE premium tracks
          </span>
        </div>
        <div className="flex flex-wrap gap-3">
          {classes.map((c) => (
            <Link
              key={c.id}
              to="/courses"
              search={{ class: c.id }}
              className="rounded-full border-2 border-ink/10 bg-card px-5 py-2.5 text-sm font-bold text-ink/70 transition hover:-translate-y-0.5"
            >
              {c.label}
            </Link>
          ))}
          <Link
            to="/professional"
            className="rounded-full border-2 border-mint/40 bg-mint/20 px-5 py-2.5 text-sm font-bold text-ink"
          >
            Professional upskilling →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((batch) => (
            <article
              key={batch.id}
              className={
                batch.tier === "premium" && batch.track === "NEET"
                  ? "flex flex-col rounded-3xl border-2 border-ink/5 bg-card p-5 pop-card"
                  : batch.tier === "premium"
                    ? "relative flex flex-col overflow-hidden rounded-3xl bg-ink p-5 text-cream"
                    : "flex flex-col rounded-3xl border-2 border-ink/5 bg-card p-5 pop-card"
              }
            >
              {batch.tier === "premium" && batch.track !== "NEET" ? (
                <span className="absolute -right-6 -top-6 size-24 rounded-full bg-brand/30" aria-hidden="true" />
              ) : null}
              <div className="relative flex items-center justify-between">
                <span
                  className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                    batch.tier === "premium" && batch.track !== "NEET"
                      ? "bg-cream/15"
                      : batch.tier === "premium"
                        ? "bg-mint/25"
                        : "bg-sky/20"
                  }`}
                >
                  {batch.classLabel}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                    batch.tier === "standard" ? "bg-mint/25" : "bg-sun text-ink"
                  }`}
                >
                  {batch.tier === "standard" ? "Free · Standard" : batch.track ? `Premium · ${batch.track}` : "Premium"}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold leading-tight">{batch.title}</h3>
              <p
                className={`mt-1 text-sm font-semibold ${
                  batch.tier === "premium" && batch.track !== "NEET" ? "text-cream/70" : "text-ink/60"
                }`}
              >
                {batch.tagline}
              </p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-2xl font-bold">{formatINR(batch.price)}</span>
                {batch.price === 0 ? (
                  <>
                    <span className="text-xs font-bold text-ink/40 line-through">
                      {formatINR(batch.strikePrice ?? 0)}
                    </span>
                    <span className="text-xs font-bold text-mint">Free forever</span>
                  </>
                ) : (
                  <span
                    className={`text-xs font-bold ${
                      batch.track === "NEET" ? "text-ink/40" : "text-cream/50"
                    }`}
                  >
                    / year
                  </span>
                )}
              </div>
              {batch.tier === "premium" && batch.track !== "NEET" ? (
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-bold text-cream/80">
                  {batch.highlights.slice(0, 4).map((h) => (
                    <div key={h} className="rounded-xl bg-cream/10 px-3 py-2">
                      {h}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-4 flex flex-wrap gap-1.5 text-[11px] font-bold text-ink/70">
                  {batch.subjects.map((s) => (
                    <span
                      key={s}
                      className={`rounded-md px-2 py-1 ${batch.track === "NEET" ? "bg-mint/20" : "bg-sun/20"}`}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
              <Link
                to="/batches/$batchId"
                params={{ batchId: batch.id }}
                className={`mt-5 rounded-full py-3 text-center text-sm font-bold transition hover:-translate-y-0.5 ${
                  batch.tier === "standard"
                    ? "bg-ink text-cream pop-ink"
                    : batch.track === "NEET"
                      ? "bg-mint text-ink pop-mint"
                      : "bg-sun text-ink pop-sun"
                }`}
              >
                {batch.tier === "standard" ? "Start free" : `Enroll ${batch.track ?? "premium"}`}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] border-2 border-ink/5 bg-gradient-to-br from-sun/40 via-blush to-mint/30 p-6 sm:p-10">
          <div className="max-w-xl">
            <span className="inline-block rounded-full bg-card/70 px-3 py-1.5 text-xs font-bold text-ink">
              🎓 For working professionals
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-ink">
              Evening upskilling, zero commute.
            </h2>
            <p className="mt-3 max-w-md font-semibold text-ink/70">
              Data, coding &amp; management courses in short, replayable modules — build a career while you hold one
              down.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/professional"
                className="rounded-full bg-brand px-6 py-3 font-bold text-cream pop-brand transition hover:-translate-y-0.5"
              >
                Explore professional track
              </Link>
              <Link
                to="/courses"
                className="rounded-full border-2 border-ink/10 bg-card/70 px-6 py-3 font-bold text-ink"
              >
                See all batches
              </Link>
            </div>
          </div>
          <img
            src={professionalImage}
            width={1024}
            height={1024}
            loading="lazy"
            alt="Working professional studying on a laptop in the evening"
            className="absolute right-8 top-1/2 hidden w-56 -translate-y-1/2 rounded-3xl object-cover md:block"
          />
        </div>
      </section>
    </>
  );
}
