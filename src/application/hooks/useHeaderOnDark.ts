import { useEffect, useState } from "react";

const DARK_SURFACE_SELECTOR = ".stack-band, .cta-inner, .section-cta";

function probeHeaderOnDark(): boolean {
  const bar = document.querySelector(".header-bar");
  if (!bar) return false;

  const rect = bar.getBoundingClientRect();
  const y = rect.top + rect.height * 0.55;
  const xs = [
    rect.left + rect.width * 0.12,
    rect.left + rect.width * 0.5,
    rect.left + rect.width * 0.88,
  ];

  for (const x of xs) {
    const stack = document.elementsFromPoint(x, y);
    for (const el of stack) {
      if (el.closest(".site-header")) continue;
      if (el.closest(DARK_SURFACE_SELECTOR)) return true;
      if (el.closest("main, footer")) return false;
    }
  }

  return false;
}

/** Header sobre franjas oscuras (stack, CTA). */
export function useHeaderOnDark(): boolean {
  const [onDark, setOnDark] = useState(false);

  useEffect(() => {
    const update = () => setOnDark(probeHeaderOnDark());
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return onDark;
}
