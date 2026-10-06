import { useEffect } from "react";
import {
  MODULE_COUNT,
  useCubeEngine,
  type UseCubeEngineOptions,
} from "@application/index";
import { isDarkModule } from "@domain/cube/geometry";
import { storyLabels } from "@domain/content/brand";
import { useMotionPreference } from "@app/providers/MotionProvider";

const FACES = ["front", "back", "right", "left", "top", "bottom"] as const;

interface JacodeCubeProps extends UseCubeEngineOptions {
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
  stageIndex,
  showHint = false,
  showStoryStatus = false,
  hint = "Arrastra para rotar · Flechas o Enter para reorganizar",
  onPieceClick,
  onReady,
  highlightIndex = null,
  className = "",
  labelledBy,
}: JacodeCubeProps) {
  const { reducedMotion } = useMotionPreference();
  const engine = useCubeEngine({
    size,
    autoRotate,
    interactive,
    playIntroStory,
    reducedMotion,
    stageIndex,
  });

  useEffect(() => {
    onReady?.({ reorganize: engine.reorganize, highlight: engine.highlight });
  }, [onReady, engine.reorganize, engine.highlight]);

  useEffect(() => {
    engine.highlight(highlightIndex);
  }, [highlightIndex, engine]);

  return (
    <div
      className={`cube-stage ${className}`.trim()}
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
              className={`cube-module${isDarkModule(i) ? " is-dark" : ""}`}
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

      {/* Nielsen #1 — visibility of system status */}
      {showStoryStatus ? (
        <p className="story-caption" aria-live="polite">
          {storyLabels[engine.storyState]}
        </p>
      ) : null}

      {showHint ? (
        <p className="cube-hint" id={labelledBy}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}
