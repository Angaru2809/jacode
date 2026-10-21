import { useCallback, useMemo, useRef, useState, type CSSProperties } from "react";
import { deliverables } from "@domain/content/process";
import { deliverablesByGroup } from "@domain/content/deliverableGroups";
import type { DeliverableItem } from "@domain/models/types";
import { useInView } from "@application/hooks/useInView";
import { useScrollProgress } from "@application/hooks/useScrollProgress";
import { useMotionPreference } from "@app/providers/MotionProvider";
import { Section } from "@presentation/components/ui/Section";

const groups = deliverablesByGroup();

/** Grupos que se abren juntos al enfocar una tarjeta (solo clic, sin hover). */
const EXPAND_BUNDLES: Record<string, string[]> = {
  experience: ["experience", "product", "quality"],
  product: ["product", "complete"],
  quality: ["experience", "product", "quality"],
  complete: ["product", "complete"],
};

type BentoCard = {
  id: string;
  step: string;
  title: string;
  hint: string;
  items: DeliverableItem[];
  tone: "dark" | "light" | "accent";
  watermark: string;
};

export function DeliverablesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [gridRef, gridInView] = useInView<HTMLDivElement>({ threshold: 0.08, rootMargin: "0px 0px -4% 0px" });
  const { reducedMotion } = useMotionPreference();
  const motionEnabled = !reducedMotion;
  const sectionEnter = useScrollProgress(sectionRef, motionEnabled);
  const gridScroll = useScrollProgress(gridRef, motionEnabled);
  const [focusId, setFocusId] = useState<string | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set());

  const bentoCards = useMemo((): BentoCard[] => {
    const pillars = groups.map(({ group, items }, i) => ({
      id: group.id,
      step: String(i + 1).padStart(2, "0"),
      title: group.label,
      hint: group.hint,
      items,
      tone: (i % 2 === 0 ? "dark" : "light") as "dark" | "light",
      watermark: group.label,
    }));
    return [
      ...pillars,
      {
        id: "complete",
        step: "04",
        title: "Solución completa",
        hint: "Las piezas encajan según el alcance acordado.",
        items: deliverables,
        tone: "accent" as const,
        watermark: "JACODE",
      },
    ];
  }, []);

  const onCardActivate = useCallback(
    (id: string) => {
      if (focusId === id && expandedIds.has(id)) {
        setFocusId(null);
        setExpandedIds(new Set());
        return;
      }

      if (expandedIds.has(id)) {
        setFocusId(id);
        return;
      }

      const bundle = EXPAND_BUNDLES[id] ?? [id];
      setFocusId(id);
      setExpandedIds(new Set(bundle));
    },
    [expandedIds, focusId]
  );

  const motionOn = gridInView && !reducedMotion;
  const showCards = gridInView || reducedMotion;

  return (
    <Section
      id="entregables"
      className="section-deliverables jacode-late"
      labelledBy="deliverables-title"
    >
      <div
        ref={sectionRef}
        className="deliverables-bento-shell"
        style={
          {
            "--section-enter": reducedMotion ? 1 : sectionEnter,
          } as CSSProperties
        }
      >
        <header className="deliverables-bento__head">
          <span className="deliverables-bento__index" aria-hidden="true">
            05
          </span>
          <div className="deliverables-bento__title-row">
            <h2 id="deliverables-title" className="deliverables-bento__title-left">
              Cada entregable es una pieza.
            </h2>
            <p className="deliverables-bento__title-right">
              Juntas forman la solución completa.
            </p>
          </div>
          <p className="deliverables-bento__lead">
            Experiencia, producto y operación — el alcance final se acuerda contigo.
          </p>
        </header>

        <div
          ref={gridRef}
          className={`deliverables-bento${motionOn ? " is-scroll-live" : ""}${
            expandedIds.size > 0 ? " has-expanded" : ""
          }`}
          style={
            {
              "--deliverables-scroll": reducedMotion ? 0 : gridScroll,
            } as CSSProperties
          }
        >
          {bentoCards.map((card, i) => {
            const isExpanded = expandedIds.has(card.id);
            const isFocused = focusId === card.id;
            return (
              <article
                key={card.id}
                className={[
                  "deliverables-bento__card",
                  `deliverables-bento__card--${card.tone}`,
                  showCards ? "is-in" : "",
                  isExpanded ? "is-expanded" : "",
                  isFocused ? "is-focused" : "",
                  expandedIds.size > 0 && !isExpanded ? "is-companion" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={{ "--bento-i": i } as CSSProperties}
              >
                <button
                  type="button"
                  className="deliverables-bento__hit"
                  aria-expanded={isExpanded}
                  aria-pressed={isFocused}
                  onClick={() => onCardActivate(card.id)}
                >
                  <div className="deliverables-bento__metric">
                    <span className="deliverables-bento__stat">{card.step}</span>
                  </div>
                  <h3 className="deliverables-bento__title">{card.title}</h3>
                  <p className="deliverables-bento__hint">{card.hint}</p>
                </button>

                <ul className="deliverables-bento__tiles" aria-label={`Incluye: ${card.title}`}>
                  {card.items.map((item) => (
                    <li key={item.id} className="deliverables-bento__tile">
                      <span className="deliverables-bento__tile-code">{item.slug}</span>
                      <span className="deliverables-bento__tile-label">{item.label}</span>
                    </li>
                  ))}
                </ul>

                <span className="deliverables-bento__watermark" aria-hidden="true">
                  {card.watermark}
                </span>
              </article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
