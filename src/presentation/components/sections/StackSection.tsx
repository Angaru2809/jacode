import type { CSSProperties } from "react";
import { stackLayers } from "@domain/content/stack";
import { SectionHead } from "@presentation/components/ui/Section";
import { StackValueIcon } from "@presentation/components/ui/SocialIcons";

export function StackSection() {
  return (
    <section
      id="stack"
      className="section-stack-full"
      aria-labelledby="stack-title"
    >
      <div className="stack-band">
        <div className="stack-band__inner">
          <SectionHead
            index="02"
            title="Herramientas con criterio."
            lead="Elegimos por operación, equipo y mantenimiento a largo plazo — no por moda."
            titleId="stack-title"
            theme="dark"
          />

          <div className="stack-grid reveal reveal-stagger">
            {stackLayers.map((layer, index) => (
              <article
                key={layer.id}
                className="stack-card reveal-stagger__item"
                style={{ "--stagger-i": index } as CSSProperties}
              >
                <div className="stack-card__icon" aria-hidden="true">
                  <StackValueIcon kind={layer.icon} />
                </div>
                <p className="stack-card__category">{layer.label}</p>
                <h3>{layer.title}</h3>
                <p>{layer.description}</p>
                <ul
                  className="stack-tags"
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
