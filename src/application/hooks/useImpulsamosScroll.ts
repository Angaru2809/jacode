import { useEffect, type RefObject } from "react";

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const io = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const eo = (t: number) => 1 - Math.pow(1 - t, 4);
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));

type ImpulsamosRefs = {
  section: RefObject<HTMLElement | null>;
  halves: RefObject<(HTMLDivElement | null)[]>;
  words: RefObject<(HTMLSpanElement | null)[]>;
  hair: RefObject<HTMLDivElement | null>;
  band: RefObject<HTMLDivElement | null>;
  eyebrow: RefObject<HTMLParagraphElement | null>;
  cue: RefObject<HTMLDivElement | null>;
  lines: RefObject<(HTMLSpanElement | null)[]>;
  fx: RefObject<(HTMLElement | null)[]>;
};

export function useImpulsamosScroll(
  refs: ImpulsamosRefs,
  enabled: boolean
) {
  useEffect(() => {
    if (!enabled) return;

    const { section, halves, words, hair, band, eyebrow, cue, lines, fx } = refs;
    const sec = section.current;
    if (!sec) return;

    const halfEls = halves.current?.filter(Boolean) as HTMLDivElement[];
    const wordEls = words.current?.filter(Boolean) as HTMLSpanElement[];
    const lineEls = lines.current?.filter(Boolean) as HTMLSpanElement[];
    const fxEls = fx.current?.filter(Boolean) as HTMLElement[];

    const fit = () => {
      if (!wordEls.length) return;
      const gutter = Math.max(20, Math.min(64, window.innerWidth * 0.04));
      const target = window.innerWidth - 2 * gutter;
      wordEls.forEach((w) => {
        w.style.fontSize = "100px";
      });
      const wdt = wordEls[0].getBoundingClientRect().width || 1;
      const fs = Math.min((100 * target) / wdt, window.innerHeight * 0.36);
      wordEls.forEach((w) => {
        w.style.fontSize = `${fs.toFixed(1)}px`;
      });
    };

    const render = (p: number) => {
      const vh = window.innerHeight;
      const hairEl = hair.current;
      const bandEl = band.current;
      const eyebrowEl = eyebrow.current;
      const cueEl = cue.current;

      if (hairEl) {
        hairEl.style.transform = `scaleX(${io(seg(p, 0.02, 0.09)).toFixed(4)})`;
        hairEl.style.opacity = (1 - seg(p, 0.1, 0.14)).toFixed(3);
      }

      const g = io(seg(p, 0.08, 0.44)) * vh * 1.08;
      if (bandEl) bandEl.style.height = `${g.toFixed(1)}px`;
      if (halfEls[0]) halfEls[0].style.transform = `translateY(${(-g / 2).toFixed(1)}px)`;
      if (halfEls[1]) halfEls[1].style.transform = `translateY(${(g / 2).toFixed(1)}px)`;

      const out = 1 - seg(p, 0.05, 0.14);
      if (eyebrowEl) {
        eyebrowEl.style.opacity = out.toFixed(3);
        eyebrowEl.style.transform = `translateY(${(-(1 - out) * 20).toFixed(1)}px)`;
      }
      if (cueEl) cueEl.style.opacity = out.toFixed(3);

      const lr = eo(seg(p, 0.26, 0.36));
      if (fxEls[0]) {
        fxEls[0].style.opacity = lr.toFixed(3);
        fxEls[0].style.transform = `translateY(${((1 - lr) * 10).toFixed(1)}px)`;
      }

      lineEls.forEach((l, i) => {
        const r = eo(seg(p, 0.3 + i * 0.08, 0.46 + i * 0.08));
        l.style.transform = `translateY(${((1 - r) * 110).toFixed(1)}%)`;
      });

      const br = eo(seg(p, 0.5, 0.62));
      if (fxEls[1]) {
        fxEls[1].style.opacity = br.toFixed(3);
        fxEls[1].style.transform = `translateY(${((1 - br) * 14).toFixed(1)}px)`;
      }

      const cr = eo(seg(p, 0.6, 0.72));
      if (fxEls[2]) {
        fxEls[2].style.opacity = cr.toFixed(3);
        fxEls[2].style.transform = `translateY(${((1 - cr) * 14).toFixed(1)}px) scale(${(
          0.96 +
          0.04 * cr
        ).toFixed(3)})`;
        fxEls[2].style.pointerEvents = cr > 0.9 ? "auto" : "none";
      }
    };

    let target = 0;
    let cur = 0;
    let raf = 0;

    const measure = () => {
      const r = sec.getBoundingClientRect();
      const tot = r.height - window.innerHeight;
      target = tot > 0 ? clamp(-r.top / tot) : 0;
    };

    const frame = () => {
      cur += (target - cur) * 0.12;
      if (Math.abs(target - cur) < 0.0003) cur = target;
      render(cur);
      raf = requestAnimationFrame(frame);
    };

    fit();
    void document.fonts?.ready.then(fit);
    measure();
    cur = target;
    raf = requestAnimationFrame(frame);

    const onScroll = () => measure();
    const onResize = () => {
      fit();
      measure();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- refs are stable containers
  }, [enabled]);
}
