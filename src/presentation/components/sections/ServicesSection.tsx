import { services } from "@domain/content/services";
import { brand } from "@domain/content/brand";
import { Section, SectionHead } from "@presentation/components/ui/Section";

interface ServicesSectionProps {
  onHoverService?: (index: number | null) => void;
}

export function ServicesSection({ onHoverService }: ServicesSectionProps) {
  return (
    <Section id="que-hacemos" className="section-services" labelledBy="services-title">
      <SectionHead
        index="01"
        title="Convertimos ideas en tecnología."
        lead={brand.secondaryLine}
        titleId="services-title"
      />
      <div className="services-grid" role="list">
        {services.map((service, i) => (
          <article
            key={service.id}
            className="service-card reveal"
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
    </Section>
  );
}
