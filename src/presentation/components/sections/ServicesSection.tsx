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
        <div className="services-intro__head reveal-stagger__item">
          <span className="section-index" aria-hidden="true">
            01
          </span>
          <h2 id="services-title" className="services-intro__title">
            <span className="services-intro__title-line">Convertimos ideas</span>
            <span className="services-intro__title-accent"> en tecnología.</span>
          </h2>
        </div>
        <p className="services-intro__lead reveal-stagger__item">
          {brand.servicesLeadLines.map((line) => (
            <span key={line} className="services-intro__lead-line">
              {line}
            </span>
          ))}
        </p>
      </header>

      <p className="services-hint reveal">Selecciona un servicio para ver el detalle.</p>
      <ServiceBlades onActiveChange={onHoverService} />
      <TechMarquee />
    </section>
  );
}
