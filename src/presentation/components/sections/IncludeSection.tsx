import { useMemo } from "react";
import { processPhases, processSteps } from "@domain/content/process";
import type { ProcessPhaseId } from "@domain/models/types";
import { useProcessTimeline } from "@application/hooks/useProcessTimeline";
import { useMotionPreference } from "@app/providers/MotionProvider";
import { Section, SectionHead } from "@presentation/components/ui/Section";
import { ProcessStepIcon } from "@presentation/components/sections/ProcessStepIcon";

const phaseLabel: Record<ProcessPhaseId, string> = {
  discover: "Descubrir",
  plan: "Planear",
  build: "Construir",
  ship: "Entregar",
};

function ProcessStepItem({
  id,
  number,
  title,
  description,
  phase,
  showPhase,
  isActive,
  isPast,
  registerRef,
}: {
  id: string;
  number: string;
  title: string;
  description: string;
  phase: ProcessPhaseId;
  showPhase: boolean;
  isActive: boolean;
  isPast: boolean;
  registerRef: (node: HTMLElement | null) => void;
}) {
  const stateClass = isActive ? " is-active" : isPast ? " is-past" : "";

  return (
    <li
      ref={registerRef}
      className={`process-step${stateClass}`}
      data-phase={phase}
    >
      {showPhase ? (
        <div className="process-phase-divider" aria-hidden="true">
          <span className="process-phase-divider__pill">{phaseLabel[phase]}</span>
        </div>
      ) : null}
      <div className="process-step__row">
        <div className="process-step__rail" aria-hidden="true" />
        <div className="process-step__marker">
          <span className="process-step__icon">
            <ProcessStepIcon stepId={id} />
          </span>
          <span className="process-step__num">{number}</span>
        </div>
        <article className="process-step__body">
          <h3>{title}</h3>
          <p>{description}</p>
        </article>
      </div>
    </li>
  );
}

export function IncludeSection() {
  const { reducedMotion } = useMotionPreference();
  const { flowRef, registerStep, activeIndex } = useProcessTimeline(
    processSteps.length,
    reducedMotion
  );

  const activeStep = processSteps[activeIndex];
  const activePhaseIndex = useMemo(
    () => processPhases.findIndex((p) => p.id === activeStep.phase),
    [activeStep.phase]
  );

  let lastPhase: ProcessPhaseId | null = null;

  return (
    <Section id="proceso" className="section-process" labelledBy="process-title">
      <SectionHead
        index="03"
        title="No solo entregamos código."
        lead="Un proceso completo para convertir complejidad en una solución clara."
        titleId="process-title"
      />

      <div className="process-layout reveal">
        <aside className="process-stage" aria-live="polite">
          <p className="process-stage__eyebrow">
            Fase {activePhaseIndex + 1} · {phaseLabel[activeStep.phase]}
          </p>
          <p className="process-stage__counter">
            <span className="process-stage__counter-current">{activeStep.number}</span>
            <span className="process-stage__counter-total">
              / {String(processSteps.length).padStart(2, "0")}
            </span>
          </p>
          <h3 className="process-stage__title">{activeStep.title}</h3>
          <p className="process-stage__lead">{activeStep.description}</p>

          <ol className="process-stage__phases" aria-label="Fases del proceso">
            {processPhases.map((phase, i) => (
              <li
                key={phase.id}
                className={
                  i < activePhaseIndex
                    ? "is-done"
                    : i === activePhaseIndex
                      ? "is-active"
                      : ""
                }
              >
                <span className="process-stage__phase-dot" aria-hidden="true" />
                <span>{phase.label}</span>
              </li>
            ))}
          </ol>
        </aside>

        <div className="process-flow" ref={flowRef}>
          <ol className="process-timeline">
            {processSteps.map((step, index) => {
              const showPhase = step.phase !== lastPhase;
              lastPhase = step.phase;
              return (
                <ProcessStepItem
                  key={step.id}
                  {...step}
                  showPhase={showPhase}
                  isActive={index === activeIndex}
                  isPast={index < activeIndex}
                  registerRef={(node) => registerStep(index, node)}
                />
              );
            })}
          </ol>
        </div>
      </div>
    </Section>
  );
}
