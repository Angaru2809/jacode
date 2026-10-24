import { useCallback, useState, type CSSProperties } from "react";
import { contactSectionCopy, faqItems } from "@domain/content/faq";
import { Section } from "@presentation/components/ui/Section";
import { ContactLeadForm } from "@presentation/components/sections/ContactLeadForm";

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(faqItems[1]?.id ?? null);

  const toggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <Section id="faq" className="section-faq" labelledBy="contact-title">
      <div className="contact-studio reveal">
        <header className="contact-studio__intro">
          <span className="section-index contact-studio__index" aria-hidden="true">
            07
          </span>
          <h2 id="contact-title" className="contact-studio__title">
            <span className="contact-studio__title-line">{contactSectionCopy.titlePlain}</span>
            <span className="contact-studio__title-line contact-studio__title-line--accent">
              {contactSectionCopy.titleAccent}
            </span>
          </h2>
          <p className="contact-studio__lead">{contactSectionCopy.lead}</p>
        </header>

        <div className="contact-studio__layout">
          <div id="contacto" className="contact-studio__glass scroll-target">
            <ContactLeadForm />
          </div>

          <aside className="contact-studio__faq" aria-labelledby="faq-aside-title">
            <header className="contact-faq__head">
              <h3 id="faq-aside-title" className="contact-faq__title">
                {contactSectionCopy.faqTitle}
              </h3>
            </header>

            <div className="contact-faq__list" role="region" aria-label="Preguntas frecuentes">
              {faqItems.map((item, i) => {
                const isOpen = openId === item.id;
                const num = String(i + 1).padStart(2, "0");
                return (
                  <article
                    key={item.id}
                    className={`contact-faq-item${isOpen ? " is-open" : ""}`}
                    style={{ "--faq-i": i } as CSSProperties}
                  >
                    <h4 className="contact-faq-item__heading">
                      <button
                        type="button"
                        className="contact-faq-item__trigger"
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${item.id}`}
                        id={`faq-trigger-${item.id}`}
                        onClick={() => toggle(item.id)}
                      >
                        <span className="contact-faq-item__num" aria-hidden="true">
                          {num}
                        </span>
                        <span className="contact-faq-item__q">{item.question}</span>
                        <span className="contact-faq-item__chev" aria-hidden="true" />
                      </button>
                    </h4>
                    <div
                      id={`faq-panel-${item.id}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${item.id}`}
                      className="contact-faq-item__panel-wrap"
                      aria-hidden={!isOpen}
                    >
                      <div className="contact-faq-item__panel">
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    </Section>
  );
}
