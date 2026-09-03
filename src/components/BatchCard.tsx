import { Link } from "@tanstack/react-router";
import { formatINR, type Batch } from "@/data/courses";

export function BatchCard({ batch }: { batch: Batch }) {
  const isPremium = batch.tier === "premium";

  if (isPremium) {
    return (
      <article className="relative flex flex-col overflow-hidden rounded-3xl bg-ink p-5 text-cream">
        <span className="absolute -right-6 -top-6 size-24 rounded-full bg-brand/30" aria-hidden="true" />
        <div className="relative flex items-center justify-between">
          <span className="rounded-full bg-cream/15 px-3 py-1 text-[11px] font-bold">{batch.classLabel}</span>
          <span className="rounded-full bg-sun px-3 py-1 text-[11px] font-bold text-ink">
            {batch.track ? `Premium · ${batch.track}` : "Premium"}
          </span>
        </div>
        <h3 className="mt-4 font-display text-lg font-bold leading-tight">{batch.title}</h3>
        <p className="mt-1 text-sm font-semibold text-cream/70">{batch.tagline}</p>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="font-display text-2xl font-bold">{formatINR(batch.price)}</span>
          <span className="text-xs font-bold text-cream/50">/ year</span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-bold text-cream/80">
          {batch.highlights.slice(0, 4).map((h) => (
            <div key={h} className="rounded-xl bg-cream/10 px-3 py-2">
              {h}
            </div>
          ))}
        </div>
        <Link
          to="/batches/$batchId"
          params={{ batchId: batch.id }}
          className="mt-5 rounded-full bg-sun py-3 text-center text-sm font-bold text-ink pop-sun transition hover:-translate-y-0.5"
        >
          View &amp; enroll
        </Link>
      </article>
    );
  }

  return (
    <article className="flex flex-col rounded-3xl border-2 border-ink/5 bg-card p-5 pop-card">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-sky/20 px-3 py-1 text-[11px] font-bold">{batch.classLabel}</span>
        <span className="rounded-full bg-mint/25 px-3 py-1 text-[11px] font-bold">Free · Standard</span>
      </div>
      <h3 className="mt-4 font-display text-lg font-bold leading-tight text-ink">{batch.title}</h3>
      <p className="mt-1 text-sm font-semibold text-ink/60">{batch.tagline}</p>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="font-display text-2xl font-bold text-ink">₹0</span>
        {batch.strikePrice ? (
          <span className="text-xs font-bold text-ink/40 line-through">{formatINR(batch.strikePrice)}</span>
        ) : null}
        <span className="text-xs font-bold text-mint">Free forever</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5 text-[11px] font-bold text-ink/70">
        {batch.subjects.map((s) => (
          <span key={s} className="rounded-md bg-sun/20 px-2 py-1">
            {s}
          </span>
        ))}
      </div>
      <Link
        to="/batches/$batchId"
        params={{ batchId: batch.id }}
        className="mt-5 rounded-full bg-ink py-3 text-center text-sm font-bold text-cream pop-ink transition hover:-translate-y-0.5"
      >
        Start free
      </Link>
    </article>
  );
}
