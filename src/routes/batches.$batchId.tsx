import { useState } from "react";
import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useApp } from "@/context/app-context";
import { formatINR, getBatch, getClass } from "@/data/courses";

export const Route = createFileRoute("/batches/$batchId")({
  loader: ({ params }) => {
    const batch = getBatch(params.batchId);
    if (!batch) throw notFound();
    return { batch };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Batch unavailable | Aurora Learn" }, { name: "robots", content: "noindex" }] };
    }
    const { batch } = loaderData;
    const title = `${batch.title} — ${batch.price === 0 ? "Free batch" : formatINR(batch.price) + " / year"} | Aurora Learn`;
    return {
      meta: [
        { title },
        { name: "description", content: `${batch.tagline} ${batch.hours}+ hours of teaching and ${batch.tests} tests for ${batch.classLabel} students.` },
        { property: "og:title", content: title },
        { property: "og:description", content: batch.tagline },
      ],
    };
  },
  component: BatchPage,
});

function BatchPage() {
  const { batch } = Route.useLoaderData();
  const { user } = useApp();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [checkout, setCheckout] = useState(false);
  const cls = getClass(batch.classId);

  const enrollment = useQuery({
    queryKey: ["enrollment", batch.id, user?.id],
    enabled: Boolean(user),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("enrollments")
        .select("id")
        .eq("batch_id", batch.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const enroll = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("enrollments").insert({
        user_id: user!.id,
        batch_id: batch.id,
        batch_title: batch.title,
        class_level: batch.classLabel,
        tier: batch.track ? `premium-${batch.track.toLowerCase()}` : batch.tier,
        amount_inr: batch.price,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      setCheckout(false);
      void queryClient.invalidateQueries({ queryKey: ["enrollment", batch.id] });
      void queryClient.invalidateQueries({ queryKey: ["enrollments"] });
      void navigate({ to: "/my-learning" });
    },
  });

  const isEnrolled = Boolean(enrollment.data);

  function onCta() {
    if (!user) {
      void navigate({ to: "/login", search: { next: `/batches/${batch.id}` } });
      return;
    }
    if (isEnrolled) {
      void navigate({ to: "/my-learning" });
      return;
    }
    if (batch.price > 0) setCheckout(true);
    else enroll.mutate();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Link to="/courses" search={{ class: batch.classId }} className="text-sm font-bold text-ink/50 hover:underline">
        ← Back to {batch.classLabel}
      </Link>

      <div className="mt-4 grid gap-6 lg:grid-cols-5">
        <div className="overflow-hidden rounded-[2rem] border-2 border-ink/5 bg-card lg:col-span-3">
          <img
            src={batch.poster}
            width={1024}
            height={576}
            alt={`${batch.title} course poster`}
            className="aspect-[16/9] w-full object-cover"
          />
          <div className="p-6">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                  batch.tier === "standard" ? "bg-mint/25" : "bg-sun/60"
                }`}
              >
                {batch.tier === "standard" ? "Free · Standard" : batch.track ? `Premium · ${batch.track}` : "Premium"}
              </span>
              <span className="rounded-full bg-sky/20 px-3 py-1 text-[11px] font-bold">{batch.classLabel}</span>
            </div>
            <h1 className="mt-3 font-display text-3xl font-bold text-ink">{batch.title}</h1>
            <p className="mt-2 font-semibold text-ink/60">{batch.tagline}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-ink/40">What's inside</p>
                <ul className="mt-2 space-y-1.5 text-sm font-semibold text-ink/70">
                  {batch.highlights.map((h) => (
                    <li key={h} className="flex gap-2">
                      <span className="text-mint">✓</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-ink/40">Subjects</p>
                <div className="mt-2 flex flex-wrap gap-1.5 text-[11px] font-bold text-ink/70">
                  {batch.subjects.map((s) => (
                    <span key={s} className="rounded-md bg-sun/20 px-2 py-1">
                      {s}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-xs font-bold uppercase tracking-widest text-ink/40">Mentor</p>
                <p className="mt-1 font-bold text-ink">{batch.mentor}</p>
                <p className="text-sm font-semibold text-ink/60">
                  {batch.hours}+ teaching hours · {batch.tests} tests
                </p>
              </div>
            </div>
          </div>
        </div>

        <aside className="lg:col-span-2">
          <div className="rounded-[2rem] bg-ink p-6 text-cream">
            <p className="text-xs font-bold uppercase tracking-widest text-cream/60">Enrolment</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-4xl font-bold text-sun">
                {batch.price === 0 ? "Free" : formatINR(batch.price)}
              </span>
              {batch.strikePrice ? (
                <span className="text-sm font-bold text-cream/50 line-through">{formatINR(batch.strikePrice)}</span>
              ) : null}
            </div>
            <p className="mt-1 text-sm font-semibold text-cream/60">
              {batch.price === 0 ? "Free forever, no card needed." : "One payment for the full academic year."}
            </p>

            <button
              onClick={onCta}
              disabled={enroll.isPending}
              className="mt-5 w-full rounded-full bg-brand py-3 text-sm font-bold text-cream pop-brand transition hover:-translate-y-0.5 disabled:opacity-60"
            >
              {isEnrolled
                ? "Go to my learning"
                : !user
                  ? "Login to enroll"
                  : batch.price === 0
                    ? "Start free"
                    : `Pay ${formatINR(batch.price)} & enroll`}
            </button>
            {enroll.isError ? (
              <p className="mt-3 rounded-xl bg-brand/20 px-3 py-2 text-xs font-bold">Could not enroll. Try again.</p>
            ) : null}

            {cls ? (
              <div className="mt-6 border-t border-cream/10 pt-4">
                <p className="text-xs font-bold uppercase tracking-widest text-cream/60">Other {cls.label} batches</p>
                <div className="mt-2 space-y-2">
                  {cls.batches
                    .filter((b) => b.id !== batch.id)
                    .map((b) => (
                      <Link
                        key={b.id}
                        to="/batches/$batchId"
                        params={{ batchId: b.id }}
                        className="flex items-center justify-between rounded-xl bg-cream/10 px-3 py-2 text-sm font-bold"
                      >
                        <span>{b.title}</span>
                        <span className="text-sun">{b.price === 0 ? "Free" : formatINR(b.price)}</span>
                      </Link>
                    ))}
                </div>
              </div>
            ) : null}
          </div>
        </aside>
      </div>

      {checkout ? (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-ink/50 p-4">
          <div className="w-full max-w-sm rounded-[2rem] border-2 border-ink/5 bg-cream p-6">
            <h2 className="font-display text-2xl font-bold text-ink">Confirm your seat</h2>
            <p className="mt-2 text-sm font-semibold text-ink/60">{batch.title}</p>
            <div className="mt-4 rounded-2xl bg-card p-4">
              <div className="flex items-center justify-between text-sm font-bold text-ink">
                <span>Batch fee</span>
                <span>{formatINR(batch.price)}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm font-bold text-ink/50">
                <span>Launch discount</span>
                <span>included</span>
              </div>
              <div className="mt-3 flex items-center justify-between border-t-2 border-ink/5 pt-3 font-display text-xl font-bold text-ink">
                <span>Total</span>
                <span>{formatINR(batch.price)}</span>
              </div>
            </div>
            <button
              onClick={() => enroll.mutate()}
              disabled={enroll.isPending}
              className="mt-5 w-full rounded-full bg-brand py-3 font-bold text-cream pop-brand disabled:opacity-60"
            >
              {enroll.isPending ? "Processing…" : "Pay & unlock batch"}
            </button>
            <button
              onClick={() => setCheckout(false)}
              className="mt-2 w-full rounded-full border-2 border-ink/10 bg-card py-3 text-sm font-bold text-ink"
            >
              Cancel
            </button>
            <p className="mt-3 text-center text-[11px] font-bold text-ink/40">
              Demo checkout — no card is charged in this preview.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
