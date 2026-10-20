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
    <div className="service-blades reveal" role="tablist" aria-label="Servicios">
      {services.map((service, i) => {
        const expanded = i === active;
        return (
          <article
            key={service.id}
            className={`service-blade${expanded ? " is-expanded" : ""}`}
            data-service={service.id}
            role="tab"
            aria-selected={expanded}
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
            <div className="service-blade__bg" aria-hidden="true">
              <img
                className="service-blade__photo"
                src={service.coverImage}
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="service-blade__scrim" aria-hidden="true" />

            <div className="service-blade__content">
              <span className="service-blade__num">{service.number}</span>
              {expanded ? (
                <>
                  <h3 className="service-blade__title">{service.title}</h3>
                  <p className="service-blade__desc">{service.description}</p>
                </>
              ) : (
                <span className="service-blade__pill">{service.shortLabel}</span>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
