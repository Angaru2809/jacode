import { services } from "@domain/content/services";
import { brand } from "@domain/content/brand";

interface ServicesSectionProps {
  onHoverService?: (index: number | null) => void;
}

export function ServicesSection({ onHoverService }: ServicesSectionProps) {
  return (
    <section
      id="que-hacemos"
      className="section section-services"
      aria-labelledby="services-title"
    >
      <header className="services-intro reveal">
        <div className="services-intro__left">
          <span className="section-index" aria-hidden="true">
            01
          </span>
          <h2 id="services-title">Convertimos ideas en tecnología.</h2>
          <p className="services-intro__tagline">{brand.secondaryLine}</p>
        </div>
        <p className="services-intro__lead">{brand.lead}</p>
      </header>

      <div className="services-grid" role="list">
        {services.map((service, i) => (
          <article
            key={service.id}
            className="service-card reveal interaction-halo"
            role="listitem"
            tabIndex={0}
            onMouseEnter={() => onHoverService?.(i)}
            onMouseLeave={() => onHoverService?.(null)}
            onFocus={() => onHoverService?.(i)}
            onBlur={() => onHoverService?.(null)}
          >
            <div className={`piece-icon ${service.pieceClass}`} aria-hidden="true" />
            <span className="service-num">{service.number}</span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
