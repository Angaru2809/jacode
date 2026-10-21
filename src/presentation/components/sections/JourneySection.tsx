import { useCallback, useMemo, useState, type CSSProperties } from "react";
import { journeyStages } from "@domain/content/process";
import { useInView } from "@application/hooks/useInView";
import { useScrollProgress } from "@application/hooks/useScrollProgress";
import { useMotionPreference } from "@app/providers/MotionProvider";
import { JacodeCube } from "@presentation/components/cube/JacodeCube";
import { Section } from "@presentation/components/ui/Section";
import { LateSectionHead } from "@presentation/components/ui/LateSectionHead";

export function JourneySection() {
  const { reducedMotion } = useMotionPreference();
  const [picked, setPicked] = useState<number | null>(null);
  const [trackRef, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const scrollProgress = useScrollProgress(trackRef, inView && !reducedMotion);

  const scrollIndex = Math.min(
    journeyStages.length - 1,
    Math.max(0, Math.floor(scrollProgress * journeyStages.length))
  );
  const activeIndex = picked ?? scrollIndex;
  const stage = journeyStages[activeIndex];

  const tabCenterPct = useMemo(() => {
    const slot = 100 / journeyStages.length;
    return slot * activeIndex + slot / 2;
  }, [activeIndex]);

  const select = useCallback((index: number) => {
    setPicked((prev) => (prev === index ? null : index));
  }, []);

  return (
    <Section
      id="recorrido"
      className="section-journey jacode-late"
      labelledBy="journey-title"
    >
      <LateSectionHead
        index="07"
        plain="El proceso en movimiento."
        accent=" Evolución continua."
        lead="Narrativa del ciclo de vida del producto — distinta a las fases formales de trabajo."
        titleId="journey-title"
      />

      <div
        ref={trackRef}
        className="journey-puzzle reveal"
        style={
          {
            "--journey-progress": scrollProgress,
            "--puzzle-tab": `${tabCenterPct}%`,
          } as CSSProperties
        }
      >
        <div className="journey-puzzle__progress" aria-hidden="true">
          <span className="journey-puzzle__progress-fill" />
        </div>

        <ol className="journey-puzzle__tabs">
          {journeyStages.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                className={`journey-puzzle__tab${i === activeIndex ? " is-active" : ""}${
                  i < activeIndex ? " is-past" : ""
                }`}
                onClick={() => select(i)}
              >
                <span className="journey-puzzle__tab-num">{s.number}</span>
                <span className="journey-puzzle__tab-label">{s.label}</span>
                <span className="journey-puzzle__tab-notch" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ol>

        <div className="journey-puzzle__panel">
          <div className="journey-puzzle__panel-socket" aria-hidden="true" />
          <div className="journey-puzzle__stage">
            <div className="journey-puzzle__cube" data-journey-active={stage.id}>
              <JacodeCube
                size={210}
                interactive={false}
                autoRotate={false}
                journeyStageId={stage.id}
                className="journey-cube journey-cube--calm"
              />
            </div>
            <article className="journey-puzzle__copy" aria-live="polite">
              <p className="journey-puzzle__hint">{stage.motionHint}</p>
              <h3>{stage.label}</h3>
              <p>{stage.description}</p>
            </article>
          </div>
        </div>
      </div>
    </Section>
  );
}
