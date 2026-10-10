import { useConceptSelection } from "@application/hooks/useConceptSelection";
import { JacodeCube } from "@presentation/components/cube/JacodeCube";
import { Section } from "@presentation/components/ui/Section";

export function ApproachSection() {
  const { active, moduleIndex, selectById, selectByModule, concepts } =
    useConceptSelection();

  return (
    <Section id="enfoque" className="section-approach" labelledBy="approach-title">
      <header className="approach-head reveal">
        <span className="section-index" aria-hidden="true">
          02
        </span>
        <div className="approach-head__lines">
          <p className="approach-head__line" id="approach-title">
            Cada problema tiene piezas.
          </p>
          <p className="approach-head__line approach-head__line--accent">
            Nosotros construimos la solución.
          </p>
        </div>
      </header>

      <div className="approach-layout reveal">
        <JacodeCube
          size={220}
          variant="concept"
          conceptIndex={moduleIndex}
          interactive
          autoRotate
          showHint
          hint="Arma el cubo: cada concepto fija una capa del producto"
          onPieceClick={selectByModule}
          className="approach-cube"
        />
        <div className="concept-panel" aria-live="polite">
          <span className="concept-label">Pieza activa</span>
          <h3 id="concept-title">{active.title}</h3>
          <p>{active.text}</p>
          <ul className="concept-list" role="list">
            {concepts.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  className={c.id === active.id ? "is-active" : undefined}
                  aria-pressed={c.id === active.id}
                  onClick={() => selectById(c.id)}
                >
                  {c.title.charAt(0) + c.title.slice(1).toLowerCase()}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
