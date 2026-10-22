import { useCallback, useState, type CSSProperties } from "react";
import { faqIntro, faqItems } from "@domain/content/faq";
import { Section } from "@presentation/components/ui/Section";
import { ContactLeadForm } from "@presentation/components/sections/ContactLeadForm";

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(faqItems[1]?.id ?? null);

  const toggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <Section id="faq" className="section-faq" labelledBy="faq-title">
      <div className="faq-studio reveal">
        <header className="faq-studio__head">
          <span className="section-index" aria-hidden="true">
            07
          </span>
          <p className="faq-studio__kicker">{faqIntro.kicker}</p>
          <h2 id="faq-title" className="faq-studio__title">
            {faqIntro.title}
          </h2>
          <p className="faq-studio__lead">{faqIntro.lead}</p>
        </header>

        <div className="faq-studio__layout">
          <div id="contacto" className="faq-studio__form-panel scroll-target">
            <ContactLeadForm />
          </div>

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
