import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { usePrefersReducedMotion } from "@application/hooks/usePrefersReducedMotion";

interface MotionContextValue {
  reducedMotion: boolean;
}

const MotionContext = createContext<MotionContextValue | null>(null);

export function MotionProvider({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    document.documentElement.dataset.motion = reducedMotion ? "off" : "on";
  }, [reducedMotion]);

  const value = useMemo(() => ({ reducedMotion }), [reducedMotion]);

  return (
    <MotionContext.Provider value={value}>{children}</MotionContext.Provider>
  );
}

export function useMotionPreference(): MotionContextValue {
  const ctx = useContext(MotionContext);
  if (!ctx) {
    throw new Error("useMotionPreference must be used within MotionProvider");
  }
  return ctx;
}
