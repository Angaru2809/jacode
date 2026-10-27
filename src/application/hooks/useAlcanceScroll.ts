import { useCallback, useEffect, useRef, useState } from "react";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function useAlcanceScroll(stepCount: number, reducedMotion: boolean) {
  const journeyRef = useRef<HTMLDivElement | null>(null);
  const sceneRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [journeyProgress, setJourneyProgress] = useState(0);
  const [stepReveals, setStepReveals] = useState<number[]>(() =>
    Array.from({ length: stepCount }, () => 0)
  );
  const [railShift, setRailShift] = useState(0);

  const registerScene = useCallback((index: number, node: HTMLElement | null) => {
    sceneRefs.current[index] = node;
  }, []);

  const scrollToStep = useCallback((index: number) => {
    const node = sceneRefs.current[index];
    if (!node) return;
    node.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  useEffect(() => {
    sceneRefs.current.length = stepCount;
  }, [stepCount]);

  useEffect(() => {
    if (reducedMotion) {
      setActiveIndex(stepCount - 1);
      setJourneyProgress(1);
      setStepReveals(Array.from({ length: stepCount }, () => 1));
      setRailShift(0);
      return;
    }

    const update = () => {
      const journey = journeyRef.current;
      const vh = window.innerHeight;
      if (!journey || stepCount === 0) return;

      const anchor = vh * 0.36;
      const reveals: number[] = [];
      let nextActive = 0;

      sceneRefs.current.forEach((scene, index) => {
        if (!scene) {
          reveals.push(0);
          return;
        }
        const rect = scene.getBoundingClientRect();
        const reveal = clamp((vh * 0.78 - rect.top) / (vh * 0.62), 0, 1);
        reveals.push(reveal);
        if (rect.top <= anchor) nextActive = index;
      });

      setStepReveals(reveals);
      setActiveIndex(nextActive);

      const jRect = journey.getBoundingClientRect();
      const travel = Math.max(jRect.height - vh * 0.25, 1);
      const scrolled = anchor - jRect.top;
      const progress = clamp(scrolled / travel, 0, 1);
      setJourneyProgress(progress);
      setRailShift(progress * 48 - 24);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [reducedMotion, stepCount]);

  return {
    journeyRef,
    registerScene,
    activeIndex,
    journeyProgress,
    stepReveals,
    railShift,
    scrollToStep,
  };
}
