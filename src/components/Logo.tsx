export function Logo({ size = "md" }: { size?: "sm" | "md" }) {
  const box = size === "sm" ? "size-10 text-xl" : "size-11 text-2xl";
  return (
    <span
      className={`grid ${box} shrink-0 place-items-center rounded-2xl bg-brand font-display font-bold text-cream pop-brand`}
      aria-hidden="true"
    >
      {/* Open-book mark built from the wordmark initial */}
      <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 5.5c2.6-1 5.4-1 8 0v13c-2.6-1-5.4-1-8 0z" />
        <path d="M21 5.5c-2.6-1-5.4-1-8 0v13c2.6-1 5.4-1 8 0z" />
        <path d="M12 4.2 12 2.4" />
      </svg>
    </span>
  );
}

export function Wordmark({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <Logo />
      <span className="leading-none">
        <span className={`block font-display text-lg font-bold ${inverted ? "text-cream" : "text-ink"}`}>
          Aurora Learn
        </span>
        <span
          className={`block text-[10px] font-bold uppercase tracking-[0.18em] ${
            inverted ? "text-cream/60" : "text-accent-violet"
          }`}
        >
          Class 9–12 + Career
        </span>
      </span>
    </span>
  );
}
