import { useCallback, useMemo, useState, type CSSProperties } from "react";
import { deliverables } from "@domain/content/process";
import { deliverablesByGroup } from "@domain/content/deliverableGroups";
import type { DeliverableItem } from "@domain/models/types";
import { useInView } from "@application/hooks/useInView";
import { useScrollProgress } from "@application/hooks/useScrollProgress";
import { useMotionPreference } from "@app/providers/MotionProvider";
import { Section } from "@presentation/components/ui/Section";
import { ScrollSplitTitle } from "@presentation/components/ui/ScrollSplitTitle";

const groups = deliverablesByGroup();

/** Grupos que se abren juntos al enfocar una tarjeta (solo clic, sin hover). */
const EXPAND_BUNDLES: Record<string, string[]> = {
  experience: ["experience"],
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
  const [gridRef, gridInView] = useInView<HTMLDivElement>({ threshold: 0.08, rootMargin: "0px 0px -4% 0px" });
  const { reducedMotion } = useMotionPreference();
  const motionEnabled = !reducedMotion;
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
      <div className="deliverables-bento-shell">
        <header className="deliverables-bento__head deliverables-bento__head--vault reveal">
          <span className="section-index" aria-hidden="true">
            05
          </span>
          <ScrollSplitTitle
            id="deliverables-title"
            plain="Cada entregable es una pieza."
            accent="Juntas forman la solución."
            className="deliverables-bento__title-vault"
          />
          <p className="deliverables-bento__lead deliverables-bento__lead--vault">
            Explora el vault: experiencia, producto, calidad y paquete completo — el alcance
            final se acuerda contigo.
          </p>
        </header>

        <div className="deliverables-vault">
          <nav className="deliverables-vault__rail" aria-label="Paquetes de entregables">
            <p className="deliverables-vault__rail-label">Vault / entregables</p>
            {bentoCards.map((card) => {
              const isActive = focusId === card.id || (focusId === null && expandedIds.has(card.id));
              const isOn = expandedIds.has(card.id) || focusId === card.id;
              return (
                <button
                  key={`rail-${card.id}`}
                  type="button"
                  className={`deliverables-vault__rail-btn${isOn ? " is-active" : ""}`}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => onCardActivate(card.id)}
                >
                  <span className="deliverables-vault__rail-num">{card.step}</span>
                  <span className="deliverables-vault__rail-title">{card.title}</span>
                </button>
              );
            })}
          </nav>

          <div className="deliverables-vault__stage">
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
                  `deliverables-bento__card--${card.id}`,
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
        </div>
      </div>
    </Section>
  );
}
