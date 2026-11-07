import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { LazyMotion, MotionConfig } from "motion/react";

const loadMotionFeatures = () =>
  import("./motionFeatures").then((mod) => mod.default);
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
    <MotionContext.Provider value={value}>
      {/* Componentes `motion` (incl. los de 21st.dev) respetan prefers-reduced-motion */}
      {/* LazyMotion + m.*: solo carga las features de animación DOM (bundle más ligero) */}
      <LazyMotion features={loadMotionFeatures}>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </LazyMotion>
    </MotionContext.Provider>
  );
}

export function useMotionPreference(): MotionContextValue {
  const ctx = useContext(MotionContext);
  if (!ctx) {
    throw new Error("useMotionPreference must be used within MotionProvider");
  }
  return ctx;
}
