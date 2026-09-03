import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type Prefs = { location: string | null; language: string | null };

type AppContextValue = {
  prefs: Prefs;
  prefsReady: boolean;
  savePrefs: (next: Prefs) => void;
  panelOpen: boolean;
  setPanelOpen: (open: boolean) => void;
  session: Session | null;
  user: User | null;
  authReady: boolean;
  signOut: () => Promise<void>;
};

const STORAGE_KEY = "aurora-prefs";

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<Prefs>({ location: null, language: null });
  const [prefsReady, setPrefsReady] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setPrefs(JSON.parse(raw) as Prefs);
    } catch {
      /* ignore malformed storage */
    }
    setPrefsReady(true);
  }, []);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setAuthReady(true);
    });
    supabase.auth.getSession().then(({ data: { session: current } }) => {
      setSession(current);
      setAuthReady(true);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const savePrefs = useCallback((next: Prefs) => {
    setPrefs(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable */
    }
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      prefs,
      prefsReady,
      savePrefs,
      panelOpen,
      setPanelOpen,
      session,
      user: session?.user ?? null,
      authReady,
      signOut,
    }),
    [prefs, prefsReady, savePrefs, panelOpen, session, authReady, signOut],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
