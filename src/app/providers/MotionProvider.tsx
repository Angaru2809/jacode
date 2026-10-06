import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePrefersReducedMotion } from "@application/hooks/usePrefersReducedMotion";

interface MotionContextValue {
  /** Effective reduced motion (OS or user override) */
  reducedMotion: boolean;
  /** User manually requested less motion */
  userPreferReduce: boolean;
  toggleReduceMotion: () => void;
}

const MotionContext = createContext<MotionContextValue | null>(null);

export function MotionProvider({ children }: { children: ReactNode }) {
  const osPrefer = usePrefersReducedMotion();
  const [userPreferReduce, setUserPreferReduce] = useState(false);

  const toggleReduceMotion = useCallback(() => {
    setUserPreferReduce((v) => !v);
  }, []);

  const value = useMemo(
    () => ({
      reducedMotion: osPrefer || userPreferReduce,
      userPreferReduce,
      toggleReduceMotion,
    }),
    [osPrefer, userPreferReduce, toggleReduceMotion]
  );

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
