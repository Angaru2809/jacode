import { processPhases, processSteps } from "@domain/content/process";
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

      <div className="process-overview reveal" aria-label="Macro fases del proceso">
        <ol className="process-phase-track">
          {processPhases.map((phase, index) => (
            <li key={phase.id} className="process-phase-track__item">
              <span className="process-phase-track__index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="process-phase-track__label">{phase.label}</span>
              <span className="process-phase-track__summary">{phase.summary}</span>
            </li>
          ))}
        </ol>
        <p className="process-overview__meta">
          <span>7 pasos secuenciales</span>
          <span aria-hidden="true">·</span>
          <span>Visibilidad en cada etapa</span>
          <span aria-hidden="true">·</span>
          <span>Entrega con documentación</span>
        </p>
      </div>

      <div className="process-layout">
        <ol className="process-timeline">
          {processSteps.map((step) => {
            const showPhase = step.phase !== lastPhase;
            lastPhase = step.phase;
            return (
              <ProcessStepItem key={step.id} {...step} showPhase={showPhase} />
            );
          })}
        </ol>

        <aside className="process-aside reveal" aria-labelledby="process-aside-title">
          <p className="process-aside__eyebrow">Por qué importa el orden</p>
          <h3 id="process-aside-title">Menos sorpresas, más control</h3>
          <p>
            Cada fase tiene un objetivo claro antes de pasar a la siguiente: alineamos
            expectativas, reducimos retrabajo y mantienes visibilidad del avance.
          </p>
          <ul className="process-aside__list" role="list">
            <li>Decisiones documentadas en planeación y diseño</li>
            <li>Pruebas antes de salir a producción</li>
            <li>Handoff con accesos y conocimiento transferido</li>
          </ul>
        </aside>
      </div>
    </Section>
  );
}
