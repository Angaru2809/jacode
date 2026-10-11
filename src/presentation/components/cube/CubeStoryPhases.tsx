import { storyLabels } from "@domain/content/brand";
import type { StoryState } from "@domain/models/types";

export type HeroStoryPhase = "scrambled" | "intervening" | "solution";

const PHASES: HeroStoryPhase[] = ["scrambled", "intervening", "solution"];

interface CubeStoryPhasesProps {
  storyState: StoryState;
  className?: string;
  id?: string;
  onSelectPhase: (phase: HeroStoryPhase) => void;
}

function isPhaseActive(storyState: StoryState, phase: HeroStoryPhase): boolean {
  if (phase === "intervening") {
    return storyState === "intervening" || storyState === "ordered";
  }
  return storyState === phase;
}

export function CubeStoryPhases({
  storyState,
  className = "",
  id,
  onSelectPhase,
}: CubeStoryPhasesProps) {
  return (
    <div
      className={`story-phases${className ? ` ${className}` : ""}`}
      id={id}
      role="group"
      aria-label="Fases del cubo"
    >
      {PHASES.map((phase, i) => {
        const active = isPhaseActive(storyState, phase);
        const label =
          phase === "intervening" ? storyLabels.intervening : storyLabels[phase];
        return (
          <span key={phase} className="story-phases__item">
            {i > 0 ? (
              <span className="story-phases__sep" aria-hidden="true">
                →
              </span>
            ) : null}
            <button
              type="button"
              className={`story-phases__label${active ? " is-active" : ""}`}
              aria-pressed={active}
              onClick={() => onSelectPhase(phase)}
            >
              {label}
            </button>
          </span>
        );
      })}
    </div>
  );
}
