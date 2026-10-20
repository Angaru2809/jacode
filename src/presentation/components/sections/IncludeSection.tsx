import { processSteps } from "@domain/content/process";
import type { ProcessPhaseId } from "@domain/models/types";
import { useInView } from "@application/hooks/useInView";
import { Section, SectionHead } from "@presentation/components/ui/Section";
import { ProcessStepIcon } from "@presentation/components/sections/ProcessStepIcon";

const phaseLabel: Record<ProcessPhaseId, string> = {
  discover: "Fase 1 · Descubrir",
  plan: "Fase 2 · Planear",
  build: "Fase 3 · Construir",
  ship: "Fase 4 · Entregar",
};

function ProcessStepItem({
  id,
  number,
  title,
  description,
  phase,
  showPhase,
}: {
  id: string;
  number: string;
  title: string;
  description: string;
  phase: ProcessPhaseId;
  showPhase: boolean;
}) {
  const [ref, inView] = useInView<HTMLLIElement>({ threshold: 0.15 });

  return (
    <li
      ref={ref}
      className={`process-step${inView ? " is-visible" : ""}`}
      data-phase={phase}
    >
      {showPhase ? (
        <div className="process-phase-divider" aria-hidden="true">
          <span>{phaseLabel[phase]}</span>
        </div>
      ) : null}
      <div className="process-step__row">
        <div className="process-step__marker" aria-hidden="true">
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
  let lastPhase: ProcessPhaseId | null = null;

  return (
    <Section id="proceso" className="section-process" labelledBy="process-title">
      <SectionHead
        index="03"
        title="No solo entregamos código."
        lead="Un proceso completo para convertir complejidad en una solución clara."
        titleId="process-title"
      />

      <div className="process-flow reveal">
        <ol className="process-timeline">
          {processSteps.map((step) => {
            const showPhase = step.phase !== lastPhase;
            lastPhase = step.phase;
            return (
              <ProcessStepItem key={step.id} {...step} showPhase={showPhase} />
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
