import { useRef } from "react";
import { impulsamosCopy } from "@domain/content/impulsamos";
import { brand } from "@domain/content/brand";
import { useImpulsamosScroll } from "@application/hooks/useImpulsamosScroll";
import { useMotionPreference } from "@app/providers/MotionProvider";

export function ImpulsamosSection() {
  const { reducedMotion } = useMotionPreference();
  const sectionRef = useRef<HTMLElement>(null);
  const halvesRef = useRef<(HTMLDivElement | null)[]>([]);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const hairRef = useRef<HTMLDivElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const fxRef = useRef<(HTMLElement | null)[]>([]);

  useImpulsamosScroll(
    {
      section: sectionRef,
      halves: halvesRef,
      words: wordsRef,
      hair: hairRef,
      band: bandRef,
      eyebrow: eyebrowRef,
      cue: cueRef,
      lines: linesRef,
      fx: fxRef,
    },
    !reducedMotion
  );

  const splitWord = (
    <span className="impulsamos__w">
      {impulsamosCopy.splitWord}
      <i className="impulsamos__dot">.</i>
    </span>
  );

  return (
    <section
      ref={sectionRef}
      id="impulsamos"
      className={`impulsamos${reducedMotion ? " impulsamos--reduced" : ""}`}
      aria-labelledby="impulsamos-title"
    >
      <div className="impulsamos__pin">
        <p ref={eyebrowRef} className="impulsamos__eyebrow" aria-hidden={reducedMotion}>
          {impulsamosCopy.index} / {impulsamosCopy.eyebrow}
        </p>

        <div className="impulsamos__word-wrap" aria-hidden={reducedMotion}>
          <div
            ref={(el) => {
              halvesRef.current[0] = el;
            }}
            className="impulsamos__half impulsamos__half--top"
          >
            <span
              ref={(el) => {
                wordsRef.current[0] = el;
              }}
            >
              {splitWord}
            </span>
          </div>
          <div
            ref={(el) => {
              halvesRef.current[1] = el;
            }}
            className="impulsamos__half impulsamos__half--bot"
          >
            <span
              ref={(el) => {
                wordsRef.current[1] = el;
              }}
            >
              {splitWord}
            </span>
          </div>
        </div>

        <div ref={hairRef} className="impulsamos__hair" aria-hidden="true" />

        <div ref={cueRef} className="impulsamos__cue" aria-hidden={reducedMotion}>
          <i />
          {impulsamosCopy.scrollCue}
        </div>

        <div ref={bandRef} className="impulsamos__band">
          <div className="impulsamos__inner">
            <p
              ref={(el) => {
                fxRef.current[0] = el;
              }}
              className="impulsamos__label impulsamos__fx"
            >
              {impulsamosCopy.index} / {impulsamosCopy.eyebrow}
            </p>

            <h2 className="impulsamos__head" id="impulsamos-title">
              <span className="impulsamos__ln">
                <span
                  ref={(el) => {
                    linesRef.current[0] = el;
                  }}
                >
                  {impulsamosCopy.headlineLine1}
                </span>
              </span>
              <span className="impulsamos__ln">
                <span
                  ref={(el) => {
                    linesRef.current[1] = el;
                  }}
                >
                  {impulsamosCopy.headlineLine2}
                  <span className="impulsamos__ink">{impulsamosCopy.headlineAccent}</span>
                </span>
              </span>
            </h2>

            <p
              ref={(el) => {
                fxRef.current[1] = el;
              }}
              className="impulsamos__body impulsamos__fx"
            >
              {impulsamosCopy.body}
            </p>

            <a
              ref={(el) => {
                fxRef.current[2] = el;
              }}
              className="impulsamos__go impulsamos__fx"
              href={brand.primaryCtaHref}
            >
              {impulsamosCopy.cta}{" "}
              <b aria-hidden="true">→</b>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
