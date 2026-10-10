import { useEffect } from "react";
import {
  MODULE_COUNT,
  useCubeEngine,
  type UseCubeEngineOptions,
} from "@application/index";
import {
  moduleTone,
  moduleToneAmbient,
  moduleToneConcept,
} from "@domain/cube/geometry";
import { storyLabels } from "@domain/content/brand";
import { useMotionPreference } from "@app/providers/MotionProvider";

const FACES = ["front", "back", "right", "left", "top", "bottom"] as const;

export type JacodeCubeVariant = "default" | "ambient" | "concept";

interface JacodeCubeProps extends UseCubeEngineOptions {
  variant?: JacodeCubeVariant;
  conceptIndex?: number;
  showHint?: boolean;
  showStoryStatus?: boolean;
  hint?: string;
  onPieceClick?: (index: number) => void;
  onReady?: (api: { reorganize: () => void; highlight: (i: number | null) => void }) => void;
  highlightIndex?: number | null;
  className?: string;
  labelledBy?: string;
}

export function JacodeCube({
  size = 180,
  autoRotate = true,
  interactive = true,
  playIntroStory = false,
  variant = "default",
  stageIndex,
  showHint = false,
  showStoryStatus = false,
  hint = "Arrastra para rotar · Flechas o Enter para reorganizar",
  onPieceClick,
  onReady,
  highlightIndex = null,
  conceptIndex = 0,
  className = "",
  labelledBy,
}: JacodeCubeProps) {
  const { reducedMotion } = useMotionPreference();
  const isAmbient = variant === "ambient";
  const isConcept = variant === "concept";
  const engine = useCubeEngine({
    size,
    autoRotate,
    interactive,
    playIntroStory: isAmbient || isConcept ? false : playIntroStory,
    playAmbientPulse: isAmbient,
    playConceptFocus: isConcept,
    conceptIndex,
    reducedMotion,
    stageIndex,
  });
  const toneFor = (i: number) => {
    if (isConcept) return moduleToneConcept(i, conceptIndex);
    if (isAmbient) return moduleToneAmbient(i);
    return moduleTone(i);
  };

  useEffect(() => {
    onReady?.({ reorganize: engine.reorganize, highlight: engine.highlight });
  }, [onReady, engine.reorganize, engine.highlight]);

  useEffect(() => {
    if (isConcept) return;
    engine.highlight(highlightIndex);
  }, [highlightIndex, engine, isConcept]);

  return (
    <div
      className={`cube-stage${isAmbient ? " cube-stage--ambient" : ""}${isConcept ? " cube-stage--concept" : ""} ${className}`.trim()}
      tabIndex={interactive ? 0 : undefined}
      role={interactive ? "application" : undefined}
      aria-roledescription={interactive ? "Cubo interactivo 3D" : undefined}
      aria-labelledby={labelledBy}
      aria-label={
        interactive
          ? "Cubo JACODE. Usa flechas para rotar, Enter para reorganizar, o arrastra con el ratón."
          : "Cubo JACODE"
      }
    >
      <div className="cube-orbit">
        <div
          className="jacode-cube"
          ref={engine.rootRef}
          style={{ width: size, height: size }}
        >
          {Array.from({ length: MODULE_COUNT }, (_, i) => (
            <div
              key={i}
              className={`cube-module is-${toneFor(i)}`}
              data-index={i}
              onClick={() => {
                if (!interactive) return;
                engine.highlight(i);
                onPieceClick?.(i);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.stopPropagation();
                  engine.highlight(i);
                  onPieceClick?.(i);
                }
              }}
              role={interactive ? "button" : undefined}
              tabIndex={interactive ? -1 : undefined}
              aria-label={interactive ? `Pieza ${i + 1}` : undefined}
            >
              {FACES.map((face) => (
                <div key={face} className={`face ${face}`} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {showStoryStatus ? (
        <div className="story-phases" aria-live="polite">
          {(["scrambled", "intervening", "solution"] as const).map((phase, i) => {
            const active =
              engine.storyState === phase ||
              (phase === "intervening" && engine.storyState === "ordered");
            const label =
              phase === "intervening"
                ? storyLabels.intervening
                : storyLabels[phase];
            return (
              <span key={phase} className="story-phases__item">
                {i > 0 ? (
                  <span className="story-phases__sep" aria-hidden="true">
                    →
                  </span>
                ) : null}
                <span
                  className={`story-phases__label${active ? " is-active" : ""}`}
                >
                  {label}
                </span>
              </span>
            );
          })}
        </div>
      ) : null}

      {showHint ? (
        <p className="cube-hint" id={labelledBy}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}
