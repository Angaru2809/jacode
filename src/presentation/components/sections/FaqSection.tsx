import { useCallback, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { brand } from "@domain/content/brand";
import { faqIntro, faqItems } from "@domain/content/faq";
import { Section } from "@presentation/components/ui/Section";
import { ScrollSplitTitle } from "@presentation/components/ui/ScrollSplitTitle";

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null);

  const toggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <Section
      id="cuenta-idea"
      className="section-faq jacode-late"
      labelledBy="faq-title"
    >
      <div className="faq-studio reveal">
        <header className="faq-studio__head">
          <span className="section-index" aria-hidden="true">
            05
          </span>
          <ScrollSplitTitle
            id="faq-title"
            plain={faqIntro.title}
            accent={faqIntro.accent}
            className="faq-studio__title"
          />
          <p className="faq-studio__lead">{faqIntro.lead}</p>
        </header>

        <div className="faq-studio__layout">
          <aside className="faq-studio__cta-panel">
            <p className="faq-studio__cta-kicker">Primer paso</p>
            <h3 className="faq-studio__cta-title">Conversemos tu reto</h3>
            <p className="faq-studio__cta-text">
              Cuanto más claro el problema, mejor la solución. Escríbenos o agenda una
              cotización con la plantilla del sitio.
            </p>
            <div className="faq-studio__cta-actions">
              <a className="faq-studio__btn faq-studio__btn--primary" href="#contacto">
                Ir al contacto
              </a>
              <Link className="faq-studio__btn faq-studio__btn--ghost" to="/cotizacion">
                Plantilla de cotización
              </Link>
            </div>
            <p className="faq-studio__cta-mail">
              <a href={`mailto:${brand.contactEmail}`}>{brand.contactEmail}</a>
            </p>
          </aside>

          <div className="faq-studio__list" role="region" aria-label="Preguntas frecuentes">
            {faqItems.map((item, i) => {
              const isOpen = openId === item.id;
              return (
                <article
                  key={item.id}
                  className={`faq-item${isOpen ? " is-open" : ""}`}
                  style={{ "--faq-i": i } as CSSProperties}
                >
                  <h3 className="faq-item__heading">
                    <button
                      type="button"
                      className="faq-item__trigger"
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${item.id}`}
                      id={`faq-trigger-${item.id}`}
                      onClick={() => toggle(item.id)}
                    >
                      <span className="faq-item__q">{item.question}</span>
                      <span className="faq-item__icon" aria-hidden="true" />
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${item.id}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${item.id}`}
                    className="faq-item__panel-wrap"
                    aria-hidden={!isOpen}
                  >
                    <div className="faq-item__panel">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
