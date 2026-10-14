import type { JourneyStage } from "@domain/models/types";

interface JourneyStageCardProps {
  stage: JourneyStage;
  active: boolean;
  side: "left" | "right";
  onSelect: () => void;
}

export function JourneyStageCard({
  stage,
  active,
  side,
  onSelect,
}: JourneyStageCardProps) {
  return (
    <button
      type="button"
      className={`journey-card journey-card--${side}${active ? " is-active" : ""}`}
      aria-current={active ? "step" : undefined}
      onClick={onSelect}
    >
      <span className="journey-card__num">{stage.number}</span>
      <span className="journey-card__label">{stage.label}</span>
      <span className="journey-card__desc">{stage.description}</span>
      <span className="journey-card__shine" aria-hidden="true" />
    </button>
  );
}
