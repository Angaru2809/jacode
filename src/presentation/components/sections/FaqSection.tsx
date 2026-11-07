import { contactSectionCopy, faqItems } from "@domain/content/faq";
import { Section } from "@presentation/components/ui/Section";
import { ContactLeadForm } from "@presentation/components/sections/ContactLeadForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection() {
  return (
    <Section id="faq" className="section-faq" labelledBy="contact-title">
      <div className="contact-studio reveal">
        <header className="contact-studio__intro">
          <span className="section-index contact-studio__index" aria-hidden="true">
            09
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

            {/* shadcn/ui Accordion (Radix): teclado, ARIA y animación de altura incluidos */}
            <Accordion
              type="single"
              collapsible
              defaultValue={faqItems[1]?.id}
              className="flex flex-col gap-2.5"
            >
              {faqItems.map((item, i) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="relative overflow-hidden rounded-[14px] border border-black/[0.07] bg-white/95 transition-[border-color,box-shadow] duration-500 ease-[var(--ease)] last:border-b before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:origin-top before:scale-y-0 before:bg-primary before:transition-transform before:duration-500 hover:border-black/[0.12] data-[state=open]:border-primary/20 data-[state=open]:shadow-[0_12px_32px_rgba(255,0,110,0.06)] data-[state=open]:before:scale-y-100"
                >
                  <AccordionTrigger className="group grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-[14px] px-[1.15rem] py-[1.05rem] font-sans text-[0.9375rem] leading-snug font-semibold text-pitch hover:no-underline focus-visible:ring-primary/40 [&[data-state=open]>svg]:text-primary">
                    <span
                      aria-hidden="true"
                      className="font-display text-[0.72rem] font-bold tracking-[0.08em] text-[#9a9aa3] transition-colors group-data-[state=open]:text-primary"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pr-[1.15rem] pb-5 pl-4 font-sans text-sm leading-relaxed text-muted-foreground sm:pl-[2.75rem]">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </aside>
        </div>
      </div>
    </Section>
  );
}
