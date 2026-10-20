import { useEffect } from "react";

const REVEAL_SELECTOR = ".reveal";

/**
 * Añade `.is-in` a bloques `.reveal` al entrar en viewport (scroll entre secciones).
 */
export function useScrollReveal(reducedMotion: boolean) {
  useEffect(() => {
    if (reducedMotion) {
      document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => {
        el.classList.add("is-in");
      });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -6% 0px",
      }
    );

    const observeAll = () => {
      document.querySelectorAll(REVEAL_SELECTOR).forEach((node) => {
        if (!node.classList.contains("is-in")) {
          io.observe(node);
        }
      });
    };

    observeAll();

    return () => io.disconnect();
  }, [reducedMotion]);
}
