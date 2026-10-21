import { useEffect, useState, type RefObject } from "react";

/** Progreso 0–1 del scroll dentro del elemento observado. */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  enabled: boolean
): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setProgress(0);
      return;
    }
    const el = ref.current;
    if (!el) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.92;
      const end = vh * 0.12;
      const traveled = start - rect.top;
      const range = rect.height + (start - end);
      const p = range <= 0 ? 0 : Math.min(1, Math.max(0, traveled / range));
      setProgress(p);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [enabled, ref]);

  return progress;
}
