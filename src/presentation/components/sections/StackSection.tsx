import { stackLayers, stackSectionCopy } from "@domain/content/stack";
import { Button } from "@presentation/components/ui/Button";
import { StackLayerIcon } from "@presentation/components/sections/StackLayerIcon";

function StackLayerMore({ label }: { label: string }) {
  return (
    <a
      className="stack-layer__more"
      href="#contacto"
      aria-label={`Hablemos sobre ${label}`}
    >
      <span className="stack-layer__more-icon" aria-hidden="true">
        <svg viewBox="0 0 16 16" width={14} height={14}>
          <path
            d="M4 12L12 4M12 4H6M12 4V10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </a>
  );
}

export function StackSection() {
  return (
    <section id="stack" className="stack-section" aria-labelledby="stack-title">
      <div className="stack-section__decor" aria-hidden="true">
        <span className="stack-section__blob stack-section__blob--tl" />
        <span className="stack-section__blob stack-section__blob--br" />
        <span className="stack-section__arc stack-section__arc--tl" />
        <span className="stack-section__arc stack-section__arc--br" />
      </div>

      <div className="stack-section__inner">
        <header className="stack-intro reveal reveal-stagger">
          <div className="stack-intro__index-row reveal-stagger__item" aria-hidden="true">
            <span className="stack-intro__index-line" />
            <span className="section-index stack-intro__index">{stackSectionCopy.index}</span>
            <span className="stack-intro__index-line" />
          </div>
          <h2 id="stack-title" className="stack-intro__title reveal-stagger__item">
            <span className="stack-intro__title-line">{stackSectionCopy.titleLine1}</span>
            <span className="stack-intro__title-line stack-intro__title-line--second">
              <span className="stack-intro__title-accent">
                {stackSectionCopy.titleAccent}
              </span>
            </span>
          </h2>
          <p className="stack-intro__lead reveal-stagger__item">
            {stackSectionCopy.lead}
          </p>
        </header>

        <div className="stack-deck reveal" role="list">
          {stackLayers.map((layer) => (
            <article
              key={layer.id}
              id={`stack-layer-${layer.id}`}
              className="stack-layer"
              data-layer={layer.id}
              role="listitem"
            >
              <header className="stack-layer__head">
                <div className="stack-layer__icon" aria-hidden="true">
                  <StackLayerIcon layerId={layer.id} size={22} />
                </div>
                <StackLayerMore label={layer.label} />
              </header>

              <div className="stack-layer__body">
                <p className="stack-layer__label">{layer.label}</p>
                <h3 className="stack-layer__title">{layer.title}</h3>
                <p className="stack-layer__desc">{layer.description}</p>
              </div>

              <footer className="stack-layer__foot">
                <ul
                  className="stack-layer__tags"
                  aria-label={`Tecnologías: ${layer.label}`}
                >
                  {layer.items.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </footer>
            </article>
          ))}
        </div>

        <p className="stack-cta reveal">
          <Button href={stackSectionCopy.ctaHref} variant="primary" size="md" showArrow>
            {stackSectionCopy.ctaLabel}
          </Button>
        </p>
      </div>
    </section>
  );
}
