import { useCallback, useRef, useState, type CSSProperties } from "react";
import { journeyStages } from "@domain/content/process";
import { useMotionPreference } from "@app/providers/MotionProvider";
import { Section } from "@presentation/components/ui/Section";
import { ScrollSplitTitle } from "@presentation/components/ui/ScrollSplitTitle";

const STAGE_TONE: Record<string, string> = {
  discover: "#e6007a",
  design: "#c026d3",
  build: "#22d3ee",
  test: "#34d399",
  ship: "#fbbf24",
  evolve: "#ff006e",
};

const JACODE_LETTERS = ["J", "A", "C", "O", "D", "E"] as const;

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

function TerminalBrand({ activeLetter, tone }: { activeLetter: string; tone: string }) {
  return (
    <span className="process-studio__terminal-brand" aria-hidden="true">
      {JACODE_LETTERS.map((letter) => (
        <span
          key={letter}
          className={
            letter === activeLetter ? "process-studio__terminal-brand-char is-lit" : "process-studio__terminal-brand-char"
          }
          style={letter === activeLetter ? ({ "--lit-tone": tone } as CSSProperties) : undefined}
        >
          {letter}
        </span>
      ))}
    </span>
  );
}

export function ProcessSection() {
  const { reducedMotion } = useMotionPreference();
  const [pinnedIndex, setPinnedIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [activePillar, setActivePillar] = useState<string | null>(null);
  const [motionDir, setMotionDir] = useState<"forward" | "back">("forward");
  const prevIndex = useRef(0);

  const activeIndex = hoverIndex ?? pinnedIndex;
  const stage = journeyStages[activeIndex];
  const tone = STAGE_TONE[stage.id] ?? "#e6007a";
  const brandLetter = stage.brandLetter ?? "J";

  const goToStage = useCallback((index: number) => {
    setMotionDir(index >= prevIndex.current ? "forward" : "back");
    prevIndex.current = index;
    setActivePillar(null);
  }, []);

  const onTabHover = useCallback(
    (index: number) => {
      goToStage(index);
      setHoverIndex(index);
    },
    [goToStage]
  );

  const onTabSelect = useCallback(
    (index: number) => {
      goToStage(index);
      setPinnedIndex(index);
      setHoverIndex(null);
    },
    [goToStage]
  );

  const clearHover = useCallback(() => {
    setHoverIndex(null);
  }, []);

  const onPillarClick = useCallback((pillar: string) => {
    setActivePillar((prev) => (prev === pillar ? null : pillar));
  }, []);

  return (
    <Section
      id="proceso"
      className="section-process-method jacode-late"
      labelledBy="method-title"
    >
      <div className="process-method reveal">
        <header className="process-method__head">
          <span className="section-index" aria-hidden="true">
            02
          </span>
          <ScrollSplitTitle
            id="method-title"
            plain="Así afrontamos cada proyecto."
            accent="Seis estaciones, un solo recorrido."
            className="process-method__title"
          />
          <p className="process-method__intro">
            De la primera idea a una solución que evoluciona.
          </p>
        </header>

        <div
          className={`process-studio${activePillar ? " has-pillar-flash" : ""}`}
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
            onMouseLeave={clearHover}
          >
            <span className="process-studio__glide" aria-hidden="true" />
            {journeyStages.map((s, i) => {
              const isActive = i === activeIndex;
              const tabTone = STAGE_TONE[s.id] ?? "#e6007a";
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  id={`studio-tab-${s.id}`}
                  aria-selected={isActive}
                  aria-controls={`studio-panel-${s.id}`}
                  className={`process-studio__tab${isActive ? " is-active" : ""}`}
                  style={{ "--tab-tone": tabTone } as CSSProperties}
                  onClick={() => onTabSelect(i)}
                  onMouseEnter={() => onTabHover(i)}
                  onFocus={() => onTabHover(i)}
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
              data-stage={stage.id}
              className={`process-studio__card${
                reducedMotion ? "" : ` is-enter-${motionDir}`
              }${activePillar ? " is-pillar-pulse" : ""}`}
              aria-live="polite"
            >
              <div className="process-studio__card-noise" aria-hidden="true" />
              <div className="process-studio__card-glow" aria-hidden="true" />
              <div className="process-studio__card-grid" aria-hidden="true" />
              <p className="process-studio__terminal" aria-hidden="true">
                <TerminalBrand activeLetter={brandLetter} tone={tone} />
                <span className="process-studio__terminal-sep">~</span>
                <span className="process-studio__terminal-cmd">{`stage --run ${stage.id}`}</span>
                <span className="process-studio__terminal-cursor" />
              </p>

              <div className="process-studio__card-body">
                <div className="process-studio__card-meta">
                  <span className="process-studio__letter">{brandLetter}</span>
                  <p className="process-studio__hint">{stage.motionHint}</p>
                </div>
                <h3 className="process-studio__card-title">{stage.label}</h3>
                <p className="process-studio__card-text">{stage.description}</p>
                <ul className="process-studio__pillars" aria-label={`Enfoque: ${stage.label}`}>
                  {stage.pillars.map((pillar, pi) => {
                    const isPillarOn = activePillar === pillar;
                    return (
                      <li key={pillar} style={{ "--pill-i": pi } as CSSProperties}>
                        <button
                          type="button"
                          className={`process-studio__pillar-btn${isPillarOn ? " is-active" : ""}`}
                          onClick={() => onPillarClick(pillar)}
                        >
                          {pillar}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </article>
          </div>
        </div>
      </div>
    </Section>
  );
}
