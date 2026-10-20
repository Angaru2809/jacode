import { useCallback, useEffect, useRef, useState } from "react";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function useProcessTimeline(stepCount: number, reducedMotion: boolean) {
  const flowRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const registerStep = useCallback((index: number, node: HTMLElement | null) => {
    stepRefs.current[index] = node;
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setActiveIndex(stepCount - 1);
      setProgress(1);
      return;
    }

    const update = () => {
      const flow = flowRef.current;
      if (!flow || stepCount === 0) return;

      const anchor = window.innerHeight * 0.42;
      let nextActive = 0;

      stepRefs.current.forEach((node, index) => {
        if (!node) return;
        const { top } = node.getBoundingClientRect();
        if (top <= anchor) nextActive = index;
      });

      setActiveIndex(nextActive);

      const flowRect = flow.getBoundingClientRect();
      const travel = flowRect.height - window.innerHeight * 0.35;
      const scrolled = anchor - flowRect.top;
      setProgress(clamp(scrolled / Math.max(travel, 1), 0, 1));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [reducedMotion, stepCount]);

  return { flowRef, registerStep, activeIndex, progress };
}
