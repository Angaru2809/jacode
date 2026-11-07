import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { journeyStages, processMethodCopy } from "@domain/content/process";
import { useMotionPreference } from "@app/providers/MotionProvider";
import { Section } from "@presentation/components/ui/Section";
import { ScrollSplitTitle } from "@presentation/components/ui/ScrollSplitTitle";

const STAGE_TONE: Record<string, string> = {
  discover: "#ff006e",
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

const JACODE_LETTERS = ["J", "A", "C", "O", "D", "E"] as const;

function TerminalBrand({ activeLetter, tone }: { activeLetter: string; tone: string }) {
  return (
    <span className="process-studio__terminal-brand" aria-hidden="true">
      {JACODE_LETTERS.map((letter) => (
        <span
          key={letter}
          className={
            letter === activeLetter
              ? "process-studio__terminal-brand-char is-lit"
              : "process-studio__terminal-brand-char"
          }
          style={letter === activeLetter ? ({ "--lit-tone": tone } as CSSProperties) : undefined}
        >
          {letter}
        </span>
      ))}
    </span>
  );
}

function FileIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden className="process-studio__file-icon">
      <path
        d="M6 3h5.5L15 6.5V17H6V3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      <path d="M11.5 3v4H15" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" />
    </svg>
  );
}

function useTypedCommand(command: string, enabled: boolean) {
  const [typed, setTyped] = useState(command);

  useEffect(() => {
    if (!enabled) {
      setTyped(command);
      return;
    }
    setTyped("");
    let i = 0;
    const timer = window.setInterval(() => {
      i += 1;
      setTyped(command.slice(0, i));
      if (i >= command.length) window.clearInterval(timer);
    }, 26);
    return () => window.clearInterval(timer);
  }, [command, enabled]);

  return typed;
}

export function ProcessSection() {
  const { reducedMotion } = useMotionPreference();
  const [activeIndex, setActiveIndex] = useState(0);
  const [motionDir, setMotionDir] = useState<"forward" | "back">("forward");
  const prevIndex = useRef(0);

  const stage = journeyStages[activeIndex];
  const tone = STAGE_TONE[stage.id] ?? "#e6007a";
  const typedCmd = useTypedCommand(stage.terminalCommand, !reducedMotion);
  const progressPct = ((activeIndex + 1) / journeyStages.length) * 100;

  const goToStage = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(journeyStages.length - 1, index));
    setMotionDir(clamped >= prevIndex.current ? "forward" : "back");
    prevIndex.current = clamped;
    setActiveIndex(clamped);
  }, []);

  const onSectionKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goToStage(activeIndex + 1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToStage(activeIndex - 1);
      }
    },
    [activeIndex, goToStage]
  );

  return (
    <Section id="proceso" className="section-process-method jacode-late" labelledBy="method-title">
      <div
        className="process-method reveal"
        tabIndex={0}
        role="group"
        aria-label="Proceso JACODE en 6 pasos"
        onKeyDown={onSectionKeyDown}
      >
        <header className="process-method__head">
          <span className="section-index process-method__index" aria-hidden="true">
            {processMethodCopy.index}
          </span>
          <ScrollSplitTitle
            id="method-title"
            plain={processMethodCopy.titlePlain}
            accent={processMethodCopy.titleAccent}
            className="process-method__title"
          />
          <p className="process-method__intro">{processMethodCopy.intro}</p>
        </header>

        <div
          className="process-studio"
          style={
            {
              "--studio-active": activeIndex,
              "--studio-count": journeyStages.length,
              "--studio-tone": tone,
              "--studio-progress": progressPct,
            } as CSSProperties
          }
        >
          <div
            className="process-studio__console"
            role="tablist"
            aria-label="Etapas del proceso JACODE"
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
                  tabIndex={isActive ? 0 : -1}
                  className={`process-studio__tab${isActive ? " is-active" : ""}`}
                  onClick={() => goToStage(i)}
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

          <div className="process-studio__progress" aria-hidden="true">
            <span className="process-studio__progress-fill" />
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
              }`}
              aria-live="polite"
            >
              <div className="process-studio__card-noise" aria-hidden="true" />
              <div className="process-studio__card-grid" aria-hidden="true" />
              <p className="process-studio__terminal">
                <TerminalBrand activeLetter={stage.brandLetter ?? "J"} tone={tone} />
                <span className="process-studio__terminal-sep">~</span>
                <span className="process-studio__terminal-prompt">stage --run </span>
                <span className="process-studio__terminal-cmd">{typedCmd}</span>
                <span className="process-studio__terminal-cursor" aria-hidden="true" />
              </p>

              <div className="process-studio__card-layout">
                <div className="process-studio__col process-studio__col--main">
                  <div className="process-studio__card-meta">
                    <span className="process-studio__letter">{stage.brandLetter}</span>
                    <p className="process-studio__hint">{stage.motionHint}</p>
                  </div>
                  <p className="process-studio__phase">Fase {stage.phaseLabel}</p>
                  <h3 className="process-studio__card-title">{stage.label}</h3>
                  <p className="process-studio__card-text">{stage.description}</p>

                  <div className="process-studio__in-step">
                    <p className="process-studio__in-step-label">En este paso</p>
                    <ul>
                      {stage.inThisStep.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <ul className="process-studio__pillars" aria-label="Enfoques del paso">
                    {stage.pillars.map((pillar) => (
                      <li key={pillar}>
                        <span className="process-studio__pillar-chip">{pillar}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="process-studio__col process-studio__col--deliver">
                  <h4 className="process-studio__deliver-title">Lo que recibes</h4>
                  <ul className="process-studio__deliver-list">
                    {stage.deliverables.map((item) => (
                      <li key={item} className="process-studio__deliver-row">
                        <FileIcon />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a className="process-studio__panel-cta" href={processMethodCopy.panelCtaHref}>
                    {processMethodCopy.panelCta}
                  </a>
                </div>
              </div>

              <div className="process-studio__footer-nav">
                <button
                  type="button"
                  className="process-studio__nav-btn"
                  disabled={activeIndex === 0}
                  onClick={() => goToStage(activeIndex - 1)}
                >
                  ← Anterior
                </button>
                <button
                  type="button"
                  className="process-studio__nav-btn"
                  disabled={activeIndex === journeyStages.length - 1}
                  onClick={() => goToStage(activeIndex + 1)}
                >
                  Siguiente →
                </button>
              </div>
            </article>
          </div>
        </div>
      </div>
    </Section>
  );
}
