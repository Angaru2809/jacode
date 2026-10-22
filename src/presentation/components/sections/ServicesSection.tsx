import { brand } from "@domain/content/brand";
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
      <header className="services-intro reveal reveal-stagger">
        <span
          className="section-index services-intro__index reveal-stagger__item"
          aria-hidden="true"
        >
          02
        </span>
        <h2 id="services-title" className="services-intro__title reveal-stagger__item">
          <span className="services-intro__title-line">Convertimos ideas</span>
          <span className="services-intro__title-line services-intro__title-line--second">
            en{" "}
            <span className="services-intro__title-accent">tecnología.</span>
          </span>
        </h2>
        <p className="services-intro__lead reveal-stagger__item">
          {brand.servicesLeadLines.map((line) => (
            <span key={line} className="services-intro__lead-line">
              {line}
            </span>
          ))}
        </p>
      </header>

      <p className="services-hint reveal">Selecciona un servicio para ver el detalle.</p>
      <div className="services-showcase reveal">
        <ServiceBlades onActiveChange={onHoverService} />
        <TechMarquee className="tech-marquee--services" eyebrow="Stack que usamos" />
      </div>
    </section>
  );
}
