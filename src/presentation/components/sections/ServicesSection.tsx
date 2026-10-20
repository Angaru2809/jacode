import { brand } from "@domain/content/brand";
import { ServiceBlades } from "@presentation/components/sections/ServiceBlades";

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
      <header className="services-intro reveal">
        <div className="services-intro__head">
          <span className="section-index" aria-hidden="true">
            01
          </span>
          <h2 id="services-title" className="services-intro__title">
            <span className="services-intro__title-line">Convertimos ideas</span>
            <span className="services-intro__title-accent"> en tecnología.</span>
          </h2>
        </div>
        <p className="services-intro__lead">{brand.lead}</p>
      </header>

      <p className="services-hint reveal">Selecciona un servicio para ver el detalle.</p>
      <ServiceBlades onActiveChange={onHoverService} />
    </section>
  );
}
