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
import { useMotionPreference } from "@app/providers/MotionProvider";
import type { StoryState } from "@domain/models/types";

const FACES = ["front", "back", "right", "left", "top", "bottom"] as const;

export type JacodeCubeVariant = "default" | "ambient" | "concept";

interface JacodeCubeProps extends UseCubeEngineOptions {
  variant?: JacodeCubeVariant;
  conceptIndex?: number;
  showHint?: boolean;
  hint?: string;
  onPieceClick?: (index: number) => void;
  onReady?: (api: {
    reorganize: () => void;
    highlight: (i: number | null) => void;
    setStory: (state: StoryState) => void;
  }) => void;
  highlightIndex?: number | null;
  className?: string;
  labelledBy?: string;
  tapToReorganize?: boolean;
}

export function JacodeCube({
  size = 180,
  autoRotate = true,
  interactive = true,
  playIntroStory = false,
  variant = "default",
  stageIndex,
  showHint = false,
  hint = "Arrastra para rotar · Flechas o Enter para reorganizar",
  onPieceClick,
  onReady,
  highlightIndex = null,
  conceptIndex = 0,
  className = "",
  labelledBy,
  tapToReorganize = false,
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
    tapToReorganize,
  });
  const toneFor = (i: number) => {
    if (isConcept) return moduleToneConcept(i, conceptIndex);
    if (isAmbient) return moduleToneAmbient(i);
    return moduleTone(i);
  };

  useEffect(() => {
    onReady?.({
      reorganize: engine.reorganize,
      highlight: engine.highlight,
      setStory: engine.setStory,
    });
  }, [onReady, engine.reorganize, engine.highlight, engine.setStory]);

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
          ? tapToReorganize
            ? "Cubo JACODE. Animación automática; clic para reorganizar; arrastra para rotar."
            : "Cubo JACODE. Arrastra para rotar o usa las flechas del teclado."
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
                if (tapToReorganize && !onPieceClick) return;
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

      {showHint ? (
        <p className="cube-hint" id={labelledBy}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}
