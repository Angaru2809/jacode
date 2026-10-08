import { useEffect, useRef, useState } from "react";
import { useMotionPreference } from "@app/providers/MotionProvider";

export function CustomCursor() {
  const { reducedMotion } = useMotionPreference();
  const pointerRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    setEnabled(fine && !reducedMotion);
  }, [reducedMotion]);

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove("has-custom-cursor");
      return;
    }
    document.body.classList.add("has-custom-cursor");

    let x = 0;
    let y = 0;
    let px = 0;
    let py = 0;
    let angle = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - x;
      const dy = e.clientY - y;
      if (Math.abs(dx) + Math.abs(dy) > 2) {
        angle = (Math.atan2(dy, dx) * 180) / Math.PI;
      }
      x = e.clientX;
      y = e.clientY;
    };

    const tick = () => {
      px += (x - px) * 0.22;
      py += (y - py) * 0.22;
      if (pointerRef.current) {
        pointerRef.current.style.transform = `translate(${px - 11}px, ${py - 5}px) rotate(${angle + 90}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      setHovering(
        Boolean(
          t.closest(
            "a, button, .jacode-cube, input, textarea, select, label"
          )
        )
      );
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="custom-cursor" aria-hidden="true">
      <div
        ref={pointerRef}
        className={`custom-cursor__pointer${hovering ? " is-hover" : ""}`}
      />
    </div>
  );
}
