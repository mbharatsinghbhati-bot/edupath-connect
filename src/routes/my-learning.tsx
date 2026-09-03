import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useApp } from "@/context/app-context";
import { formatINR, getBatch } from "@/data/courses";

export const Route = createFileRoute("/my-learning")({
  head: () => ({
    meta: [
      { title: "My Learning — Your Batches | Aurora Learn" },
      {
        name: "description",
        content: "See the Aurora Learn batches you are enrolled in, their fees and where to resume your lectures.",
      },
      { property: "og:title", content: "My Learning — Your Batches | Aurora Learn" },
      { property: "og:description", content: "Your enrolled batches, fees and lecture progress in one place." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: MyLearningPage,
});

function MyLearningPage() {
  const { user, authReady } = useApp();

  const enrollments = useQuery({
    queryKey: ["enrollments", user?.id],
    enabled: Boolean(user),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("enrollments")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  if (authReady && !user) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <h1 className="font-display text-3xl font-bold text-ink">Your learning lives here</h1>
        <p className="mt-2 font-semibold text-ink/60">Login with your email and a 6-digit OTP to see your batches.</p>
        <Link
          to="/login"
          search={{ next: "/my-learning" }}
          className="mt-6 inline-block rounded-full bg-brand px-6 py-3 font-bold text-cream pop-brand"
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">My learning</h1>
      <p className="mt-2 font-semibold text-ink/60">Everything you've enrolled in, free and premium.</p>

      {enrollments.isLoading ? (
        <p className="mt-8 font-bold text-ink/50">Loading your batches…</p>
      ) : (enrollments.data?.length ?? 0) === 0 ? (
        <div className="mt-8 rounded-[2rem] border-2 border-ink/5 bg-blush/40 p-8 text-center">
          <p className="font-display text-xl font-bold text-ink">No batches yet</p>
          <p className="mt-2 font-semibold text-ink/60">Start with a free standard batch — no card needed.</p>
          <Link
            to="/courses"
            className="mt-5 inline-block rounded-full bg-brand px-6 py-3 font-bold text-cream pop-brand"
          >
            Browse batches
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {enrollments.data?.map((row) => {
            const batch = getBatch(row.batch_id);
            return (
              <article key={row.id} className="flex flex-col rounded-3xl border-2 border-ink/5 bg-card p-5 pop-card">
                {batch ? (
                  <img
                    src={batch.poster}
                    width={1024}
                    height={576}
                    loading="lazy"
                    alt={`${row.batch_title} poster`}
                    className="aspect-[16/9] w-full rounded-2xl object-cover"
                  />
                ) : null}
                <h2 className="mt-4 font-display text-lg font-bold text-ink">{row.batch_title}</h2>
                <p className="text-sm font-bold text-ink/50">
                  {row.class_level} · {row.amount_inr === 0 ? "Free batch" : formatINR(row.amount_inr) + " paid"}
                </p>
                <Link
                  to="/batches/$batchId"
                  params={{ batchId: row.batch_id }}
                  className="mt-5 rounded-full bg-ink py-3 text-center text-sm font-bold text-cream pop-ink"
                >
                  Resume batch
                </Link>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
