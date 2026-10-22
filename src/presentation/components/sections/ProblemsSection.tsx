import { useCallback, useState, type CSSProperties } from "react";
import { clientNeeds } from "@domain/content/clientNeeds";
import { Section } from "@presentation/components/ui/Section";
import { ScrollSplitTitle } from "@presentation/components/ui/ScrollSplitTitle";

export function ProblemsSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <Section
      id="necesidades"
      className="section-problems jacode-late"
      labelledBy="problems-title"
    >
      <header className="problems-head reveal">
        <span className="section-index" aria-hidden="true">
          04
        </span>
        <ScrollSplitTitle
          id="problems-title"
          plain="¿Qué problema o necesidad tienes en mente?"
          accent="Reconoce tu situación — te ayudamos a resolverla."
          className="problems-head__title"
        />
      </header>

      <ul className="problems-grid reveal">
        {clientNeeds.map((need, i) => {
          const isOpen = openId === need.id;
          return (
            <li key={need.id}>
              <article
                className={`problems-card${isOpen ? " is-open" : ""}`}
                style={{ "--need-i": i } as CSSProperties}
              >
                <button
                  type="button"
                  className="problems-card__trigger"
                  aria-expanded={isOpen}
                  onClick={() => toggle(need.id)}
                >
                  <span className="problems-card__num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="problems-card__copy">
                    <span className="problems-card__title">{need.title}</span>
                    <span className="problems-card__hint">{need.hint}</span>
                  </span>
                  <span className="problems-card__chev" aria-hidden="true" />
                </button>
                <div className="problems-card__body">
                  <p className="problems-card__help">{need.help}</p>
                  <ul className="problems-card__signals">
                    {need.signals.map((s) => (
                      <li key={s.id}>{s.label}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
