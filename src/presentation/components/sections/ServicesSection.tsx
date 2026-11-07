import { servicesSectionCopy } from "@domain/content/services";
import { ServiceBlades } from "@presentation/components/sections/ServiceBlades";
import { TechMarquee } from "@presentation/components/sections/TechMarquee";

interface ServicesSectionProps {
  onHoverService?: (index: number | null) => void;
}

export function ServicesSection({ onHoverService }: ServicesSectionProps) {
  return (
    <section
      id="que-hacemos"
      className="section-services"
      aria-labelledby="services-title"
    >
      <div className="section-services__inner">
      <header className="services-intro reveal reveal-stagger">
        <span
          className="section-index services-intro__index reveal-stagger__item"
          aria-hidden="true"
        >
          {servicesSectionCopy.index}
        </span>
        <h2 id="services-title" className="services-intro__title reveal-stagger__item">
          <span className="services-intro__title-line">{servicesSectionCopy.titleLine1}</span>
          <span className="services-intro__title-line services-intro__title-line--second">
            {servicesSectionCopy.titleLine2}{" "}
            <span className="services-intro__title-accent">
              {servicesSectionCopy.titleAccent}
            </span>
          </span>
        </h2>
        <p className="services-intro__lead reveal-stagger__item">
          {servicesSectionCopy.lead}
        </p>
      </header>

      <p className="services-hint reveal">{servicesSectionCopy.hint}</p>
      <div className="services-showcase reveal">
        <ServiceBlades onActiveChange={onHoverService} />
        <TechMarquee
          className="tech-marquee--services"
          eyebrow="Stack que usamos"
          revealOnScroll={false}
        />
      </div>
      </div>
    </section>
  );
}
