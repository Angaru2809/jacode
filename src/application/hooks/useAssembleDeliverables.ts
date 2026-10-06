import { useEffect, useState } from "react";
import { deliverables } from "@domain/content/process";

export function useAssembleDeliverables(inView: boolean, reducedMotion: boolean) {
  const [activeCount, setActiveCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView || done) return;

    if (reducedMotion) {
      setActiveCount(deliverables.length);
      setDone(true);
      return;
    }

    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setActiveCount(i);
      if (i >= deliverables.length) {
        window.clearInterval(id);
        setDone(true);
      }
    }, 160);

    return () => window.clearInterval(id);
  }, [inView, reducedMotion, done]);

  return { activeCount, done, items: deliverables };
}
