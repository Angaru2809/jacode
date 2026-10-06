import { useWorkMode } from "@application/hooks/useWorkMode";
import type { WorkModeId } from "@domain/models/types";
import { Section, SectionHead } from "@presentation/components/ui/Section";

export function ModesSection() {
  const { activeId, active, modes, select } = useWorkMode();

  return (
    <Section id="modalidades" className="section-modes" labelledBy="modes-title">
      <SectionHead
        index="05"
        title="Nos adaptamos a tu proyecto."
        titleId="modes-title"
      />

      <div className="mode-selector" role="tablist" aria-label="Formas de trabajo">
        {modes.map((mode) => (
          <button
            key={mode.id}
            type="button"
            role="tab"
            id={`tab-${mode.id}`}
            className={`mode-tab${activeId === mode.id ? " is-active" : ""}`}
            aria-selected={activeId === mode.id}
            aria-controls={`panel-${mode.id}`}
            tabIndex={activeId === mode.id ? 0 : -1}
            onClick={() => select(mode.id as WorkModeId)}
            onKeyDown={(e) => {
              const idx = modes.findIndex((m) => m.id === activeId);
              if (e.key === "ArrowRight") {
                e.preventDefault();
                select(modes[(idx + 1) % modes.length].id);
              }
              if (e.key === "ArrowLeft") {
                e.preventDefault();
                select(modes[(idx - 1 + modes.length) % modes.length].id);
              }
            }}
          >
            {mode.title}
          </button>
        ))}
      </div>

      <div
        className="mode-panel is-active"
        role="tabpanel"
        id={`panel-${active.id}`}
        aria-labelledby={`tab-${active.id}`}
      >
        <h3>{active.title}</h3>
        <p>{active.description}</p>
        <div className="mode-flow" aria-label={`Flujo: ${active.flow.join(", ")}`}>
          {active.flow.map((step, i) => (
            <span key={step} className="mode-flow-item">
              {i > 0 ? <i aria-hidden="true" /> : null}
              <span className="mode-flow-step">{step}</span>
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
