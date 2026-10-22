import { useCallback, useRef, useState, type CSSProperties } from "react";
import { journeyStages } from "@domain/content/process";
import { useMotionPreference } from "@app/providers/MotionProvider";
import { Section } from "@presentation/components/ui/Section";
import { ScrollSplitTitle } from "@presentation/components/ui/ScrollSplitTitle";

const STAGE_TONE: Record<string, string> = {
  discover: "#8b5cf6",
  design: "#e6007a",
  build: "#22d3ee",
  test: "#34d399",
  ship: "#fbbf24",
  evolve: "#ff006e",
};

function StationIcon({ id }: { id: string }) {
  switch (id) {
    case "discover":
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M16 16 20 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "design":
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <rect x="4" y="5" width="16" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8 9h8M8 12h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "build":
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <path
            d="M8 9 4 11l4 2 4-2-4-2Zm8 0 4 2-4 2-4-2 4-2Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M12 11v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "test":
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <path
            d="M12 4 5 7v5c0 4 3 6.5 7 8 4-1.5 7-4 7-8V7l-7-3Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="m9 12 2 2 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "ship":
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <path d="M12 5v11M8 12h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path
            d="M6 16h12l-1.5 3H7.5L6 16Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <path d="M6 16V8l6-3 6 3v8" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M9 13v3M12 12v4M15 13v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
  }
}

export function ProcessSection() {
  const { reducedMotion } = useMotionPreference();
  const [activeIndex, setActiveIndex] = useState(0);
  const [motionDir, setMotionDir] = useState<"forward" | "back">("forward");
  const prevIndex = useRef(0);
  const stage = journeyStages[activeIndex];
  const tone = STAGE_TONE[stage.id] ?? "#e6007a";

  const select = useCallback((index: number) => {
    setMotionDir(index >= prevIndex.current ? "forward" : "back");
    prevIndex.current = index;
    setActiveIndex(index);
  }, []);

  return (
    <Section
      id="metodologia"
      className="section-process-method jacode-late"
      labelledBy="method-title"
    >
      <div className="process-method reveal">
        <header className="process-method__head">
          <span className="section-index" aria-hidden="true">
            04
          </span>
          <ScrollSplitTitle
            id="method-title"
            plain="Así afrontamos cada proyecto."
            accent="Seis estaciones, un solo recorrido."
            className="process-method__title"
          />
          <p className="process-method__lead">
            El proceso formal explica el qué; aquí el cómo se siente en la práctica — estaciones
            conectadas, mismo equipo, producto vivo al final.
          </p>
        </header>

        <div
          className="process-studio"
          style={
            {
              "--studio-active": activeIndex,
              "--studio-count": journeyStages.length,
              "--studio-tone": tone,
            } as CSSProperties
          }
        >
          <div
            className="process-studio__console"
            role="tablist"
            aria-label="Estaciones JACODE"
          >
            <span className="process-studio__glide" aria-hidden="true" />
            {journeyStages.map((s, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  id={`studio-tab-${s.id}`}
                  aria-selected={isActive}
                  aria-controls={`studio-panel-${s.id}`}
                  className={`process-studio__tab${isActive ? " is-active" : ""}`}
                  onClick={() => select(i)}
                >
                  <span className="process-studio__tab-icon">
                    <StationIcon id={s.id} />
                  </span>
                  <span className="process-studio__tab-copy">
                    <span className="process-studio__tab-num">{s.number}</span>
                    <span className="process-studio__tab-label">{s.label}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="process-studio__viewport">
            <article
              key={stage.id}
              id={`studio-panel-${stage.id}`}
              role="tabpanel"
              aria-labelledby={`studio-tab-${stage.id}`}
              className={`process-studio__card${
                reducedMotion ? "" : ` is-enter-${motionDir}`
              }`}
              aria-live="polite"
            >
              <div className="process-studio__card-glow" aria-hidden="true" />
              <div className="process-studio__card-grid" aria-hidden="true" />
              <p className="process-studio__terminal" aria-hidden="true">
                <span className="process-studio__terminal-prompt">jacode ~</span>
                <span className="process-studio__terminal-cmd">{`stage --run ${stage.id}`}</span>
                <span className="process-studio__terminal-cursor" />
              </p>

              <div className="process-studio__card-body">
                <div className="process-studio__card-meta">
                  {stage.brandLetter ? (
                    <span className="process-studio__letter">{stage.brandLetter}</span>
                  ) : (
                    <span className="process-studio__letter process-studio__letter--ghost">·</span>
                  )}
                  <p className="process-studio__hint">{stage.motionHint}</p>
                </div>
                <h3 className="process-studio__card-title">{stage.label}</h3>
                <p className="process-studio__card-text">{stage.description}</p>
                <ul className="process-studio__pillars">
                  {stage.pillars.map((pillar, pi) => (
                    <li key={pillar} style={{ "--pill-i": pi } as CSSProperties}>
                      {pillar}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </div>
      </div>
    </Section>
  );
}
