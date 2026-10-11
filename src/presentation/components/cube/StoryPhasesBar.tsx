import { storyLabels } from "@domain/content/brand";
import type { StoryState } from "@domain/models/types";

const PHASES = ["scrambled", "intervening", "solution"] as const;
type StoryPhase = (typeof PHASES)[number];

function phaseLabel(phase: StoryPhase): string {
  return phase === "intervening" ? storyLabels.intervening : storyLabels[phase];
}

function isPhaseActive(storyState: StoryState, phase: StoryPhase): boolean {
  return (
    storyState === phase ||
    (phase === "intervening" &&
      (storyState === "ordered" || storyState === "aligning"))
  );
}

interface StoryPhasesBarProps {
  storyState: StoryState;
  className?: string;
  interactive?: boolean;
  onSelectPhase?: (phase: StoryPhase) => void;
}

export function StoryPhasesBar({
  storyState,
  className = "",
  interactive = false,
  onSelectPhase,
}: StoryPhasesBarProps) {
  return (
    <div
      className={`story-phases${className ? ` ${className}` : ""}`}
      aria-live="polite"
      role={interactive ? "group" : undefined}
      aria-label={interactive ? "Fases del cubo" : undefined}
    >
      {PHASES.map((phase, i) => {
        const active = isPhaseActive(storyState, phase);
        const label = phaseLabel(phase);
        return (
          <span key={phase} className="story-phases__item">
            {i > 0 ? (
              <span className="story-phases__sep" aria-hidden="true">
                →
              </span>
            ) : null}
            {interactive && onSelectPhase ? (
              <button
                type="button"
                className={`story-phases__label${active ? " is-active" : ""}`}
                aria-pressed={active}
                onClick={() => onSelectPhase(phase)}
              >
                {label}
              </button>
            ) : (
              <span
                className={`story-phases__label${active ? " is-active" : ""}`}
              >
                {label}
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

export type { StoryPhase };
