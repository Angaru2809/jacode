import { useConceptSelection } from "@application/hooks/useConceptSelection";
import { JacodeCube } from "@presentation/components/cube/JacodeCube";
import { Section, SectionHead } from "@presentation/components/ui/Section";

export function ApproachSection() {
  const { active, moduleIndex, selectById, selectByModule, concepts } =
    useConceptSelection();

  return (
    <Section id="enfoque" className="section-approach" labelledBy="approach-title">
      <SectionHead
        index="02"
        title="Cada problema tiene piezas. Nosotros construimos la solución."
        titleId="approach-title"
      />
      <div className="approach-layout">
        <JacodeCube
          size={160}
          interactive
          showHint
          hint="Haz clic en una pieza o elige un concepto"
          highlightIndex={moduleIndex}
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
