import { useCallback, useEffect, useState } from "react";
import { journeyStages } from "@domain/content/process";

export function useJourneyStage(autoPlay: boolean, intervalMs = 2800) {
  const [index, setIndex] = useState(0);

  const select = useCallback((i: number) => {
    setIndex(Math.max(0, Math.min(i, journeyStages.length - 1)));
  }, []);

  useEffect(() => {
    if (!autoPlay) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % journeyStages.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [autoPlay, intervalMs]);

  return {
    index,
    stage: journeyStages[index],
    stages: journeyStages,
    select,
  };
}
