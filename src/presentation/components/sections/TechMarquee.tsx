import { techMarqueeFeatured, techMarqueeItems } from "@domain/content/techMarquee";
import { useMotionPreference } from "@app/providers/MotionProvider";

export interface TechMarqueeProps {
  eyebrow?: string;
  items?: readonly string[];
  className?: string;
}

export function TechMarquee({
  eyebrow = "Tecnologías que usamos",
  items,
  className = "",
}: TechMarqueeProps) {
  const isServices = className.includes("tech-marquee--services");
  const list = items ?? (isServices ? techMarqueeFeatured : techMarqueeItems);
  const { reducedMotion } = useMotionPreference();
  const loop = [...list, ...list];

  const rootClass = [
    "tech-marquee",
    "reveal",
    reducedMotion ? "is-static" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClass} aria-label="Tecnologías y lenguajes">
      <p className="tech-marquee__eyebrow">{eyebrow}</p>
      <div className="tech-marquee__viewport">
        {reducedMotion ? (
          <ul className="tech-marquee__static-list">
            {list.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        ) : (
          <div className="tech-marquee__track" aria-hidden="true">
            {loop.map((name, i) => (
              <span key={`${name}-${i}`} className="tech-marquee__item">
                {name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
