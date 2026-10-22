import type { CSSProperties } from "react";
import { stackLayers } from "@domain/content/stack";
import { SectionHead } from "@presentation/components/ui/Section";
import { StackValueIcon } from "@presentation/components/ui/SocialIcons";

export function StackSection() {
  return (
    <section
      id="stack"
      className="stack-section"
      aria-labelledby="stack-title"
    >
      <div className="stack-section__band stack-band">
        <div className="stack-section__inner">
          <SectionHead
            index="03"
            title="Herramientas con criterio."
            lead="Elegimos por operación, equipo y mantenimiento a largo plazo — no por moda."
            titleId="stack-title"
            theme="dark"
          />

          <div className="stack-section__grid reveal reveal-stagger">
            {stackLayers.map((layer, index) => (
              <article
                key={layer.id}
                className="stack-section__card reveal-stagger__item"
                style={{ "--stagger-i": index } as CSSProperties}
              >
                <div className="stack-section__card-icon" aria-hidden="true">
                  <StackValueIcon kind={layer.icon} />
                </div>
                <p className="stack-section__card-label">{layer.label}</p>
                <h3 className="stack-section__card-title">{layer.title}</h3>
                <p className="stack-section__card-desc">{layer.description}</p>
                <ul
                  className="stack-section__tags"
                  aria-label={`Tecnologías: ${layer.label}`}
                >
                  {layer.items.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
