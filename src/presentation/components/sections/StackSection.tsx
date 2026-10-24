import type { CSSProperties } from "react";
import { stackLayers, stackSectionCopy } from "@domain/content/stack";
import type { StackLayerId } from "@domain/content/stack";
import { Button } from "@presentation/components/ui/Button";

const PANEL_ACCENT: Record<StackLayerId, string> = {
  frontend: "#ff006e",
  backend: "#5b6eae",
  integrations: "#0d9488",
  cms: "#059669",
};

export function StackSection() {
  return (
    <section id="stack" className="stack-section" aria-labelledby="stack-title">
      <header className="stack-intro reveal reveal-stagger">
        <span className="section-index stack-intro__index reveal-stagger__item" aria-hidden="true">
          03
        </span>
        <h2 id="stack-title" className="stack-intro__title reveal-stagger__item">
          <span className="stack-intro__title-line">Herramientas con</span>
          <span className="stack-intro__title-line stack-intro__title-line--second">
            <span className="stack-intro__title-accent">criterio.</span>
          </span>
        </h2>
        <p className="stack-intro__lead reveal-stagger__item">{stackSectionCopy.lead}</p>
      </header>

      <div className="stack-showcase reveal">
        <div className="stack-ribbon" role="list">
          {stackLayers.map((layer, index) => (
            <article
              key={layer.id}
              id={`stack-layer-${layer.id}`}
              className="stack-panel"
              style={
                {
                  "--stagger-i": index,
                  "--panel-accent": PANEL_ACCENT[layer.id],
                } as CSSProperties
              }
              role="listitem"
            >
              <div className="stack-panel__body">
                <div className="stack-panel__main">
                  <p className="stack-panel__label">{layer.label}</p>
                  <h3 className="stack-panel__title">{layer.title}</h3>
                  <span className="stack-panel__rule" aria-hidden="true" />
                  <p className="stack-panel__desc">{layer.description}</p>
                </div>
                <ul
                  className="stack-panel__tags"
                  aria-label={`Tecnologías: ${layer.label}`}
                >
                  {layer.items.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>

      <p className="stack-cta reveal">
        <Button href={stackSectionCopy.ctaHref} variant="primary" size="md" showArrow>
          {stackSectionCopy.ctaLabel}
        </Button>
      </p>
    </section>
  );
}
