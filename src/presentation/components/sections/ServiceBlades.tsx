import { useCallback, useState } from "react";
import { services } from "@domain/content/services";

interface ServiceBladesProps {
  onActiveChange?: (index: number | null) => void;
}

export function ServiceBlades({ onActiveChange }: ServiceBladesProps) {
  const [active, setActive] = useState<number | null>(null);

  const activate = useCallback(
    (index: number) => {
      setActive((prev) => {
        const next = prev === index ? null : index;
        onActiveChange?.(next);
        return next;
      });
    },
    [onActiveChange]
  );

  return (
    <div className="service-blades" role="tablist" aria-label="Servicios">
      {services.map((service, i) => {
        const expanded = i === active;
        return (
          <article
            key={service.id}
            className={`service-blade${expanded ? " is-expanded" : ""}`}
            data-service={service.id}
            role="tab"
            aria-selected={expanded}
            aria-expanded={expanded}
            tabIndex={active === null || expanded ? 0 : -1}
            onClick={() => activate(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                activate(i);
              }
              if (e.key === "ArrowRight") {
                e.preventDefault();
                activate((i + 1) % services.length);
              }
              if (e.key === "ArrowLeft") {
                e.preventDefault();
                activate((i - 1 + services.length) % services.length);
              }
            }}
          >
            <div className="service-blade__media" aria-hidden={!expanded}>
              <img
                className="service-blade__photo"
                src={service.coverImage}
                alt=""
                loading="lazy"
                decoding="async"
              />
              <div className="service-blade__scrim" />
            </div>

            <div className="service-blade__stack">
              {expanded ? (
                <div className="service-blade__overlay">
                  <span className="service-blade__number" aria-hidden="true">
                    {service.number}
                  </span>
                  <h3 className="service-blade__title">{service.title}</h3>
                  <p className="service-blade__desc">{service.description}</p>
                  <a
                    className="service-blade__cta"
                    href="#contacto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Cuéntanos tu proyecto
                    <span aria-hidden="true"> →</span>
                  </a>
                </div>
              ) : (
                <div className="service-blade__chip">
                  <h3 className="service-blade__label">{service.shortLabel}</h3>
                </div>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
