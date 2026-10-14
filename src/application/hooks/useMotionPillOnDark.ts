import { useEffect, useState } from "react";

const DARK_ZONE_SELECTOR = ".cta-inner, .stack-band";

/** Pastilla fija a la derecha: detecta si el fondo detrás es oscuro. */
export function useMotionPillOnDark(): boolean {
  const [onDark, setOnDark] = useState(false);

  useEffect(() => {
    const probe = () => {
      const x = Math.max(0, window.innerWidth - 28);
      const y = window.innerHeight * 0.5;
      const zones = document.querySelectorAll(DARK_ZONE_SELECTOR);
      let hit = false;
      zones.forEach((zone) => {
        const r = zone.getBoundingClientRect();
        if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) {
          hit = true;
        }
      });
      setOnDark(hit);
    };

    probe();
    window.addEventListener("scroll", probe, { passive: true });
    window.addEventListener("resize", probe);
    return () => {
      window.removeEventListener("scroll", probe);
      window.removeEventListener("resize", probe);
    };
  }, []);

  return onDark;
}
