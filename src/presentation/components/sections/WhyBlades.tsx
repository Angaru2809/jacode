import { useCallback, useState } from "react";
import { whyItems } from "@domain/content/process";
import { useMotionPreference } from "@app/providers/MotionProvider";
import { WhyFeatureIllustration } from "@presentation/components/sections/WhyFeatureIllustration";

type WhyVisualId = "complexity" | "strategy" | "tech" | "results";

export function WhyBlades() {
  const { reducedMotion } = useMotionPreference();
  const [active, setActive] = useState<number | null>(null);

  const activate = useCallback((index: number) => {
    setActive((prev) => (prev === index ? null : index));
  }, []);

  return (
    <div className="service-blades why-blades" role="tablist" aria-label="Por qué JACODE">
      {whyItems.map((item, i) => {
        const expanded = i === active;
        const number = String(i + 1).padStart(2, "0");
        return (
          <article
            key={item.id}
            className={`service-blade why-blade${expanded ? " is-expanded" : ""}`}
            data-why={item.id}
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
                activate((i + 1) % whyItems.length);
              }
              if (e.key === "ArrowLeft") {
                e.preventDefault();
                activate((i - 1 + whyItems.length) % whyItems.length);
              }
            }}
          >
            <div className="service-blade__media" aria-hidden={!expanded}>
              <div className="why-blade__art">
                <WhyFeatureIllustration
                  id={item.id as WhyVisualId}
                  animate={!reducedMotion && expanded}
                />
              </div>
              <div className="service-blade__scrim" />
            </div>

            <div className="service-blade__stack">
              {expanded ? (
                <div className="service-blade__overlay">
                  <span className="service-blade__number" aria-hidden="true">
                    {number} · {item.tag}
                  </span>
                  <h3 className="service-blade__title">{item.title}</h3>
                  <p className="service-blade__desc">{item.description}</p>
                  <a
                    className="service-blade__cta"
                    href="#contacto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Hablemos de tu proyecto
                    <span aria-hidden="true"> →</span>
                  </a>
                </div>
              ) : (
                <div className="service-blade__chip">
                  <h3 className="service-blade__label">{item.title}</h3>
                </div>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
