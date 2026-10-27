import type { CSSProperties } from "react";
import { alcanceSectionCopy, processSteps } from "@domain/content/process";
import type { ProcessPhaseId, ProcessStep } from "@domain/models/types";
import { useAlcanceScroll } from "@application/hooks/useAlcanceScroll";
import { useMotionPreference } from "@app/providers/MotionProvider";
import { Section } from "@presentation/components/ui/Section";
import { Button } from "@presentation/components/ui/Button";
import { ProcessStepIcon } from "@presentation/components/sections/ProcessStepIcon";

const phaseLabel: Record<ProcessPhaseId, string> = {
  discover: "Descubrir",
  plan: "Planear",
  build: "Construir",
  ship: "Entregar",
};

const phaseOrder: ProcessPhaseId[] = ["discover", "plan", "build", "ship"];

function phaseIndex(phase: ProcessPhaseId) {
  return phaseOrder.indexOf(phase);
}

function AlcanceFeaturePanel({
  step,
  isActive,
  stepIndex,
  totalSteps,
  onPrev,
  onNext,
}: {
  step: ProcessStep;
  isActive: boolean;
  stepIndex: number;
  totalSteps: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  const pi = phaseIndex(step.phase);

  return (
    <article
      className={`alcance-feature${isActive ? " is-active" : ""}`}
      aria-hidden={!isActive}
    >
      <div className="alcance-feature__copy">
        <p className="alcance-feature__eyebrow">
          Fase {pi + 1}
          <span aria-hidden="true"> · </span>
          {phaseLabel[step.phase]}
        </p>
        <p className="alcance-feature__counter">
          <span className="alcance-feature__counter-current">{step.number}</span>
          <span className="alcance-feature__counter-total">
            / {String(totalSteps).padStart(2, "0")}
          </span>
        </p>
        <h3 className="alcance-feature__title">{step.title}</h3>
        <p className="alcance-feature__lead">{step.description}</p>
        {step.highlights && step.highlights.length > 0 ? (
          <div className="alcance-feature__highlights">
            <p className="alcance-feature__highlights-label">En este paso</p>
            <ul>
              {step.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}
        {isActive ? (
          <div className="alcance-feature__nav">
            <Button
              type="button"
              variant="ghost"
              size="md"
              disabled={stepIndex === 0}
              aria-label="Paso anterior"
              onClick={onPrev}
            >
              Anterior
            </Button>
            <Button
              type="button"
              variant="primary"
              size="md"
              showArrow
              disabled={stepIndex >= totalSteps - 1}
              onClick={onNext}
            >
              Siguiente
            </Button>
          </div>
        ) : null}
      </div>
      <div className="alcance-feature__visual" aria-hidden="true">
        <div className="alcance-feature__visual-icon">
          <ProcessStepIcon stepId={step.id} />
        </div>
      </div>
    </article>
  );
}

export function IncludeSection() {
  const { reducedMotion } = useMotionPreference();
  const {
    journeyRef,
    registerScene,
    activeIndex,
    journeyProgress,
    stepReveals,
    railShift,
    scrollToStep,
  } = useAlcanceScroll(processSteps.length, reducedMotion);

  const journeyStyle = {
    "--alcance-progress": journeyProgress,
  } as CSSProperties;

  const spineFill = stepReveals.reduce((max, r, i) => {
    const weight = (i + 1) / processSteps.length;
    return Math.max(max, r * weight);
  }, 0);

  const scrollDepth =
    journeyProgress > 0.55 ? "deep" : journeyProgress > 0.28 ? "mid" : "light";

  return (
    <Section id="alcance" className="section-process" labelledBy="alcance-title">
      <div className="alcance-section__decor" aria-hidden="true">
        <span className="alcance-section__blob alcance-section__blob--tr" />
        <span className="alcance-section__blob alcance-section__blob--bl" />
      </div>

      <header className="section-head reveal reveal-stagger">
        <span className="section-index reveal-stagger__item" aria-hidden="true">
          {alcanceSectionCopy.index}
        </span>
        <h2 id="alcance-title" className="reveal-stagger__item">
          {alcanceSectionCopy.titleLine1}{" "}
          <span className="alcance-head__accent">{alcanceSectionCopy.titleAccent}</span>
        </h2>
        <p className="section-lead reveal-stagger__item">{alcanceSectionCopy.lead}</p>
      </header>

      <div
        className="alcance-journey reveal"
        ref={journeyRef}
        style={journeyStyle}
        data-scroll-depth={scrollDepth}
      >
        <div
          className="alcance-studio"
          style={{ transform: `translate3d(0, ${railShift * 0.35}px, 0)` }}
        >
          <div className="alcance-rail" aria-hidden="true">
            <span className="alcance-rail__line" />
            <span
              className="alcance-rail__fill"
              style={{ transform: `scaleY(${spineFill})` }}
            />
          </div>

          <ol className="alcance-scenes" aria-live="polite">
            {processSteps.map((step, index) => {
              const reveal = stepReveals[index] ?? 0;
              const isActive = index === activeIndex;
              const isPast = index < activeIndex;
              const sceneStyle = { "--step-reveal": reveal } as CSSProperties;

              return (
                <li
                  key={step.id}
                  ref={(node) => registerScene(index, node)}
                  className={`alcance-scene${isActive ? " is-active" : ""}${
                    isPast ? " is-past" : ""
                  }`}
                  style={sceneStyle}
                >
                  <AlcanceFeaturePanel
                    step={step}
                    isActive={isActive}
                    stepIndex={index}
                    totalSteps={processSteps.length}
                    onPrev={() => scrollToStep(index - 1)}
                    onNext={() => scrollToStep(index + 1)}
                  />

                  <div className="alcance-scene__rail-cell" aria-hidden="true">
                    <span className="alcance-scene__dot">
                      {isActive ? (
                        <ProcessStepIcon stepId={step.id} />
                      ) : (
                        <span className="alcance-scene__dot-num">{step.number}</span>
                      )}
                    </span>
                  </div>

                  <article className="alcance-scene__card">
                    <p className="alcance-scene__phase">{phaseLabel[step.phase]}</p>
                    <h4 className="alcance-scene__title">{step.title}</h4>
                    <p className="alcance-scene__desc">{step.description}</p>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </Section>
  );
}
