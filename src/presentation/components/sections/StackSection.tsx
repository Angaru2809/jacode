import { useCallback, useState } from "react";
import { stackValues } from "@domain/content/stack";
import { StackValueIcon } from "@presentation/components/ui/SocialIcons";

export function StackSection() {
  const [active, setActive] = useState(0);
  const item = stackValues[active];

  const activate = useCallback((index: number) => {
    setActive(index);
  }, []);

  return (
    <section
      id="stack"
      className="section-stack-full"
      aria-labelledby="stack-title"
    >
      <div className="stack-band">
        <header className="stack-head reveal">
          <span className="section-index section-index--on-dark" aria-hidden="true">
            02
          </span>
          <div className="stack-head__intro">
            <p className="stack-eyebrow">
              <span aria-hidden="true">—</span> Nuestro stack
            </p>
            <h2 id="stack-title">Lo que nos define</h2>
            <p className="stack-head__sub">
              Tecnología elegida por criterio: construimos con las herramientas
              que mejor resuelven tu operación, no modas.
            </p>
          </div>
        </header>

        <div
          className="stack-showcase reveal"
          onMouseLeave={() => setActive(0)}
        >
          <div className="stack-showcase__preview" aria-hidden="true">
            {stackValues.map((entry, i) => (
              <article
                key={entry.id}
                className={`stack-preview ${entry.previewClass}${
                  i === active ? " is-active" : ""
                }`}
              >
                <div className="stack-preview__icon">
                  <StackValueIcon kind={entry.icon} />
                </div>
                <p className="stack-preview__desc">{entry.description}</p>
                <ul className="stack-preview__tags">
                  {entry.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <ul className="stack-list" role="list">
            {stackValues.map((entry, i) => (
              <li key={entry.id} className="stack-list__item">
                <button
                  type="button"
                  className={`stack-list__row${i === active ? " is-active" : ""}`}
                  onMouseEnter={() => activate(i)}
                  onFocus={() => activate(i)}
                  onClick={() => activate(i)}
                  aria-current={i === active ? "true" : undefined}
                >
                  <span className="stack-list__title">{entry.title}</span>
                  <span className="stack-list__category">{entry.category}</span>
                </button>
              </li>
            ))}
          </ul>

          <p className="stack-showcase__live sr-only" aria-live="polite">
            {item.title}. {item.description}
          </p>
        </div>
      </div>
    </section>
  );
}
