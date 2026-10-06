import { processSteps } from "@domain/content/process";
import { useInView } from "@application/hooks/useInView";
import { Section, SectionHead } from "@presentation/components/ui/Section";

function ProcessStepItem({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  const [ref, inView] = useInView<HTMLLIElement>({ threshold: 0.2 });

  return (
    <li
      ref={ref}
      className={`process-step${inView ? " is-visible" : ""}`}
    >
      <span className="step-num">{number}</span>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </li>
  );
}

export function IncludeSection() {
  return (
    <Section id="incluimos" className="section-include" labelledBy="include-title">
      <SectionHead
        index="03"
        title="No solo entregamos código."
        lead="Un proceso completo para convertir complejidad en una solución clara."
        titleId="include-title"
      />
      <ol className="process-steps">
        {processSteps.map((step) => (
          <ProcessStepItem key={step.number} {...step} />
        ))}
      </ol>
    </Section>
  );
}
