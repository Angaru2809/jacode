import { useCallback, type CSSProperties } from "react";
import { useConceptSelection } from "@application/hooks/useConceptSelection";
import { useInView } from "@application/hooks/useInView";
import { useMotionPreference } from "@app/providers/MotionProvider";
import { EnfoqueOrbitViz } from "@presentation/components/enfoque/EnfoqueOrbitViz";
import { Section } from "@presentation/components/ui/Section";
import { LateSectionHead } from "@presentation/components/ui/LateSectionHead";

const displayTitle: Record<string, string> = {
  idea: "Idea",
  diseno: "Diseño",
  tecnologia: "Tecnología",
  codigo: "Código",
  datos: "Datos",
  ia: "IA",
  integracion: "Integración",
  resultado: "Resultado",
};

export function ApproachSection() {
  const { active, selectById, concepts } = useConceptSelection();
  const { reducedMotion } = useMotionPreference();
  const [stageRef, inView] = useInView<HTMLDivElement>({ threshold: 0.12 });

  const activeIndex = concepts.findIndex((c) => c.id === active.id);

  const selectConcept = useCallback(
    (id: string) => selectById(id),
    [selectById]
  );

  return (
    <Section
      id="enfoque"
      className="section-approach jacode-late"
      labelledBy="approach-title"
    >
      <div className="enfoque-band">
        <div className="enfoque-split">
          <div className="enfoque-split__copy">
            <LateSectionHead
              index="06"
              plain="Cada problema tiene piezas."
              accent="Nosotros construimos la solución."
              lead="Estrategia y tecnología conectadas en el recorrido de la idea hasta el resultado."
              titleId="approach-title"
            />
          </div>

          <div
            ref={stageRef}
            className={`enfoque-showcase reveal${inView ? " is-in" : ""}`}
            style={{ "--enfoque-stage": activeIndex } as CSSProperties}
          >
          <div className="enfoque-studio">
            <div className="enfoque-studio__viz">
              <EnfoqueOrbitViz
                concepts={concepts}
                activeId={active.id}
                activeIndex={activeIndex}
                onSelect={selectConcept}
                reducedMotion={reducedMotion}
              />
            </div>

            <div className="enfoque-studio__steps">
              <div
                className="enfoque-studio__panel"
                role="tablist"
                aria-label="Etapas del enfoque"
              >
                {concepts.map((c, i) => {
                  const isActive = c.id === active.id;
                  const title = displayTitle[c.id] ?? c.title;
                  return (
                    <article
                      key={c.id}
                      className={`enfoque-studio__item${isActive ? " is-active" : ""}`}
                    >
                      <button
                        type="button"
                        role="tab"
                        id={`enfoque-tab-${c.id}`}
                        aria-selected={isActive}
                        aria-expanded={isActive}
                        aria-controls={`enfoque-panel-${c.id}`}
                        className="enfoque-studio__trigger"
                        onClick={() => selectConcept(c.id)}
                      >
                        <span
                          className={`enfoque-studio__radio${isActive ? " is-on" : ""}`}
                          aria-hidden="true"
                        />
                        <span className="enfoque-studio__row">
                          <span className="enfoque-studio__num">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="enfoque-studio__name">{title}</span>
                        </span>
                        <span className="enfoque-studio__chevron" aria-hidden="true" />
                      </button>
                      <div
                        id={`enfoque-panel-${c.id}`}
                        role="tabpanel"
                        aria-labelledby={`enfoque-tab-${c.id}`}
                        className="enfoque-studio__body-wrap"
                        aria-hidden={!isActive}
                      >
                        <div className="enfoque-studio__body">
                          <p>{c.text}</p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
