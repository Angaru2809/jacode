import type { CSSProperties } from "react";
import type { WhyItem } from "@domain/models/types";
import { useMotionPreference } from "@app/providers/MotionProvider";
import { WhyFeatureIllustration } from "@presentation/components/sections/WhyFeatureIllustration";

interface WhyFeatureCardProps {
  item: WhyItem;
  index: number;
}

export function WhyFeatureCard({ item, index }: WhyFeatureCardProps) {
  const { reducedMotion } = useMotionPreference();
  const number = String(index + 1).padStart(2, "0");

  return (
    <article
      className="why-feature-card reveal"
      style={
        {
          "--why-accent": item.accent,
          "--why-stagger": index,
        } as CSSProperties
      }
    >
      <div className="why-feature-card__copy">
        <div className="why-feature-card__head">
          <span className="why-feature-card__num">{number}</span>
          <span className="why-feature-card__tag">{item.tag}</span>
        </div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <span className="why-feature-card__rule" aria-hidden="true" />
      </div>
      <div className="why-feature-card__visual">
        <WhyFeatureIllustration
          id={item.id as "complexity" | "strategy" | "tech" | "results"}
          animate={!reducedMotion}
        />
      </div>
    </article>
  );
}
