import { useState } from "react";
import { useApp } from "@/context/app-context";
import { cities, languages } from "@/data/courses";
import { Logo } from "./Logo";

export function OnboardingDialog() {
  const { prefs, prefsReady, savePrefs } = useApp();
  const [city, setCity] = useState(cities[0]);
  const [language, setLanguage] = useState(languages[0]);

  if (!prefsReady || (prefs.location && prefs.language)) return null;

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-ink/50 p-4">
      <div className="w-full max-w-md rounded-[2rem] border-2 border-ink/5 bg-cream p-6 sm:p-8">
        <Logo />
        <h2 className="mt-4 font-display text-2xl font-bold text-ink">Namaste! Where are you learning from?</h2>
        <p className="mt-2 text-sm font-semibold text-ink/60">
          We use this to show batch timings and teaching language that suit you.
        </p>

        <label className="mt-6 block text-xs font-bold text-ink/60">
          <span className="mb-1.5 block">📍 Location</span>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full rounded-2xl border-2 border-ink/10 bg-card px-4 py-3 text-sm font-bold text-ink"
          >
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>

        <label className="mt-4 block text-xs font-bold text-ink/60">
          <span className="mb-1.5 block">🌐 Preferred language</span>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full rounded-2xl border-2 border-ink/10 bg-card px-4 py-3 text-sm font-bold text-ink"
          >
            {languages.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </label>

        <button
          onClick={() => savePrefs({ location: city, language })}
          className="mt-6 w-full rounded-full bg-brand py-3 font-bold text-cream pop-brand transition hover:-translate-y-0.5"
        >
          Continue
        </button>
        <p className="mt-3 text-center text-[11px] font-bold text-ink/40">
          You can change this any time from the side menu.
        </p>
      </div>
    </div>
  );
}
