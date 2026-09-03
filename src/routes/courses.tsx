import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { BatchCard } from "@/components/BatchCard";
import { classes } from "@/data/courses";

type CoursesSearch = { class?: string };

export const Route = createFileRoute("/courses")({
  validateSearch: (search: Record<string, unknown>): CoursesSearch => ({
    class: typeof search["class"] === "string" ? search["class"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Courses & Batches for Class 9–12 | Aurora Learn" },
      {
        name: "description",
        content:
          "Browse Aurora Learn batches for Class 9, 10, 11 and 12 — free standard batches plus premium live batches, including dedicated NEET and JEE tracks for Class 12.",
      },
      { property: "og:title", content: "Courses & Batches for Class 9–12 | Aurora Learn" },
      {
        property: "og:description",
        content: "Free standard batches and premium live batches for every class, with NEET and JEE tracks.",
      },
    ],
  }),
  component: CoursesPage,
});

function CoursesPage() {
  const { class: selected } = Route.useSearch();
  const navigate = useNavigate({ from: "/courses" });
  const activeId = selected && classes.some((c) => c.id === selected) ? selected : "class-9";
  const active = classes.find((c) => c.id === activeId)!;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">Courses &amp; batches</h1>
      <p className="mt-2 max-w-2xl font-semibold text-ink/60">
        Every class has a free Standard batch and a paid Premium batch. Class 12 adds two premium entrance tracks —
        NEET and JEE.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        {classes.map((c) => (
          <button
            key={c.id}
            onClick={() => navigate({ search: { class: c.id } })}
            className={`rounded-full px-5 py-2.5 text-sm font-bold transition hover:-translate-y-0.5 ${
              c.id === activeId
                ? "bg-accent-violet text-cream pop-violet"
                : "border-2 border-ink/10 bg-card text-ink/70"
            }`}
          >
            {c.label}
            <span className="ml-2 text-xs opacity-70">{c.batches.length} batches</span>
          </button>
        ))}
        <Link
          to="/professional"
          className="rounded-full border-2 border-mint/40 bg-mint/20 px-5 py-2.5 text-sm font-bold text-ink"
        >
          Professional upskilling →
        </Link>
      </div>

      <div className="mt-8 rounded-[2rem] border-2 border-ink/5 bg-blush/40 p-5 sm:p-6">
        <h2 className="font-display text-2xl font-bold text-ink">{active.label}</h2>
        <p className="mt-1 max-w-2xl text-sm font-semibold text-ink/60">{active.blurb}</p>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {active.batches.map((batch) => (
          <BatchCard key={batch.id} batch={batch} />
        ))}
      </div>
    </div>
  );
}
