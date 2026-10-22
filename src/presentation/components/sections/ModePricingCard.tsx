import type { CSSProperties } from "react";
import type { WorkMode } from "@domain/models/types";

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M5.5 9.2L7.8 11.5L12.5 6.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export interface ModePricingCardProps {
  mode: WorkMode;
  index: number;
}

export function ModePricingCard({ mode, index }: ModePricingCardProps) {
  const number = String(index + 1).padStart(2, "0");
  const featured = mode.featured === true;

  return (
    <article
      className={`mode-plan${featured ? " mode-plan--featured" : ""}`}
      style={{ "--plan-i": index } as CSSProperties}
      data-mode={mode.id}
    >
      <div className="mode-plan__shell">
        <div className="mode-plan__tab" aria-hidden="true">
          <span className="mode-plan__tab-text">{mode.title}</span>
        </div>

        <div className="mode-plan__body">
          {featured ? (
            <span className="mode-plan__badge">Recomendada</span>
          ) : null}

          <header className="mode-plan__head">
            <p className="mode-plan__eyebrow sr-only">{mode.title}</p>
            <p className="mode-plan__number" aria-hidden="true">
              {number}
            </p>
            <p className="mode-plan__subtitle">{mode.subtitle}</p>
            <p className="mode-plan__desc">{mode.description}</p>
          </header>

          <div className="mode-plan__divider" aria-hidden="true" />

          <ul
            className="mode-plan__features"
            aria-label={`Incluye: ${mode.flow.join(", ")}`}
          >
            {mode.flow.map((step) => (
              <li key={step}>
                <span className="mode-plan__check">
                  <CheckIcon />
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ul>

          <a className="mode-plan__cta" href="#contacto">
            Consultar modalidad
          </a>
        </div>
      </div>
    </article>
  );
}
