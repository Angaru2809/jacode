import { stackValues } from "@domain/content/stack";
import { StackValueIcon } from "@presentation/components/ui/SocialIcons";

const stackSignals = [
  { glyph: "{ }", label: "Arquitectura limpia" },
  { glyph: "λ", label: "Lógica reusable" },
  { glyph: "▣", label: "Módulos desacoplados" },
  { glyph: "git", label: "Entrega continua" },
] as const;

export function StackSection() {
  return (
    <section
      id="stack"
      className="section section-stack"
      aria-labelledby="stack-title"
    >
      <header className="stack-head reveal">
        <div className="stack-head__bar">
          <p className="stack-eyebrow">
            <span aria-hidden="true">—</span> Nuestro stack
          </p>
          <ul className="stack-signals" aria-label="Principios de ingeniería">
            {stackSignals.map((item) => (
              <li key={item.label} className="stack-signals__item">
                <span className="stack-signals__glyph" aria-hidden="true">
                  {item.glyph}
                </span>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="stack-head__center">
          <h2 id="stack-title">Lo que nos define</h2>
          <p className="stack-head__sub">
            Tecnología elegida por criterio: construimos con las herramientas
            que mejor resuelven tu operación, no modas.
          </p>
        </div>
      </header>

      <div className="stack-grid" role="list">
        {stackValues.map((item) => (
          <article
            key={item.id}
            className={`stack-card reveal${item.featured ? " is-featured" : ""}`}
            role="listitem"
          >
            <div className="stack-card__icon" aria-hidden="true">
              <StackValueIcon kind={item.icon} />
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <ul className="stack-tags">
              {item.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
