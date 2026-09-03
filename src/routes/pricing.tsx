import { createFileRoute, Link } from "@tanstack/react-router";
import { classes, formatINR, proCourses } from "@/data/courses";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Batch Pricing — Class 9 to 12, NEET & JEE | Aurora Learn" },
      {
        name: "description",
        content:
          "Transparent Aurora Learn pricing: every class has a free standard batch, premium batches from ₹1,999, and NEET or JEE tracks at ₹12,999 a year.",
      },
      { property: "og:title", content: "Batch Pricing — Class 9 to 12, NEET & JEE | Aurora Learn" },
      {
        property: "og:description",
        content: "Free standard batches, premium batches from ₹1,999, NEET and JEE tracks at ₹12,999 a year.",
      },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">Simple, set pricing</h1>
      <p className="mt-2 max-w-2xl font-semibold text-ink/60">
        One price per batch, for the full academic year. No hidden charges, no drip-fed upsells. Standard batches stay
        free forever.
      </p>

      <div className="mt-8 overflow-hidden rounded-[2rem] border-2 border-ink/5 bg-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-ink text-cream">
            <tr>
              <th className="px-5 py-4 font-bold">Class</th>
              <th className="px-5 py-4 font-bold">Batch</th>
              <th className="px-5 py-4 font-bold">Includes</th>
              <th className="px-5 py-4 text-right font-bold">Price / year</th>
              <th className="px-5 py-4" />
            </tr>
          </thead>
          <tbody>
            {classes.flatMap((c) =>
              c.batches.map((batch) => (
                <tr key={batch.id} className="border-t-2 border-ink/5">
                  <td className="px-5 py-4 font-bold text-ink">{c.label}</td>
                  <td className="px-5 py-4">
                    <span className="font-bold text-ink">{batch.title}</span>
                    <span
                      className={`ml-2 rounded-full px-2 py-0.5 text-[11px] font-bold ${
                        batch.tier === "standard" ? "bg-mint/25" : "bg-sun/60"
                      }`}
                    >
                      {batch.tier === "standard" ? "Standard" : batch.track ?? "Premium"}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-semibold text-ink/60">
                    {batch.hours}+ hrs · {batch.tests} tests
                  </td>
                  <td className="px-5 py-4 text-right font-display text-lg font-bold text-ink">
                    {batch.price === 0 ? "Free" : formatINR(batch.price)}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      to="/batches/$batchId"
                      params={{ batchId: batch.id }}
                      className="rounded-full bg-brand px-4 py-2 text-xs font-bold text-cream pop-brand"
                    >
                      {batch.price === 0 ? "Start free" : "Enroll"}
                    </Link>
                  </td>
                </tr>
              )),
            )}
          </tbody>
        </table>
      </div>

      <h2 className="mt-12 font-display text-2xl font-bold text-ink">Professional courses</h2>
      <div className="mt-4 grid gap-5 sm:grid-cols-3">
        {proCourses.map((course) => (
          <div key={course.id} className="rounded-3xl border-2 border-ink/5 bg-card p-5 pop-card">
            <h3 className="font-display text-lg font-bold text-ink">{course.title}</h3>
            <p className="mt-1 text-sm font-semibold text-ink/60">{course.blurb}</p>
            <p className="mt-4 font-display text-2xl font-bold text-ink">{formatINR(course.price)}</p>
            <p className="text-xs font-bold text-ink/40">{course.weeks} weeks · {course.level}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-[2rem] border-2 border-ink/5 bg-blush/50 p-6 sm:p-8">
        <h2 className="font-display text-2xl font-bold text-ink">What every premium batch includes</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "Live classes with recordings",
            "Mentor doubt-solving calls",
            "Full test series with rank analysis",
            "Downloadable notes & DPP sheets",
          ].map((item) => (
            <div key={item} className="rounded-2xl bg-card px-4 py-3 text-sm font-bold text-ink">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
