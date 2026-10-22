import { useEffect, useState } from "react";

/** Superficies oscuras bajo el header → logo blanco + barra oscura */
const DARK_SURFACE_SELECTOR =
  ".stack-band, .cta-inner, .section-cta, #proceso.jacode-late .process-studio__card";

function isDarkAtPoint(x: number, y: number): boolean {
  const stack = document.elementsFromPoint(x, y);

  for (const el of stack) {
    if (el.closest(".site-header")) continue;
    if (el.closest(DARK_SURFACE_SELECTOR)) return true;

    const region = el.closest("section, footer, main");
    if (region) return false;
  }

  return false;
}

function probeHeaderOnDark(): boolean {
  const bar = document.querySelector(".header-bar");
  if (!bar) return false;

  const rect = bar.getBoundingClientRect();
  const y = rect.top + rect.height * 0.55;
  const ratios = [0.14, 0.5, 0.86];
  let darkVotes = 0;

  for (const ratio of ratios) {
    const x = rect.left + rect.width * ratio;
    if (isDarkAtPoint(x, y)) darkVotes += 1;
  }

  return darkVotes >= 2;
}

/** Header sobre franjas oscuras (stack, CTA, panel enfoque, recorrido). */
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
