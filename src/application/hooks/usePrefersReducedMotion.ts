import { useEffect, useState } from "react";

/** Nielsen #7 — flexibility: respect OS preference; allow override */
export function usePrefersReducedMotion(forceReduce?: boolean): boolean {
  const [prefers, setPrefers] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefers(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return forceReduce ?? prefers;
}
