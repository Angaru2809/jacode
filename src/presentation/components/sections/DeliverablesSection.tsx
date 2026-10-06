import { useInView } from "@application/hooks/useInView";
import { useAssembleDeliverables } from "@application/hooks/useAssembleDeliverables";
import { useMotionPreference } from "@app/providers/MotionProvider";
import { Section, SectionHead } from "@presentation/components/ui/Section";

export function DeliverablesSection() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const { reducedMotion } = useMotionPreference();
  const { activeCount, items } = useAssembleDeliverables(inView, reducedMotion);

  return (
    <Section
      id="entregables"
      className="section-deliverables"
      labelledBy="deliverables-title"
    >
      <SectionHead
        index="04"
        title="Cada entregable es una pieza."
        lead="Juntas forman la solución completa."
        titleId="deliverables-title"
      />
      <div className="deliverables-layout" ref={ref}>
        <div className="deliverables-cube-wrap" aria-hidden="true">
          <div className="assemble-cube">
            {items.map((item, i) => (
              <div
                key={item.id}
                className={`assemble-piece${i % 3 === 0 ? " is-dark" : ""}${
                  i < activeCount ? " is-in" : ""
                }`}
              />
            ))}
          </div>
        </div>
        <ul className="deliverables-list">
          {items.map((item, i) => (
            <li
              key={item.id}
              className={i < activeCount ? "is-active" : undefined}
            >
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
