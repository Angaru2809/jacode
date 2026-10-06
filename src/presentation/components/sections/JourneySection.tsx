import { useInView } from "@application/hooks/useInView";
import { useJourneyStage } from "@application/hooks/useJourneyStage";
import { useMotionPreference } from "@app/providers/MotionProvider";
import { JacodeCube } from "@presentation/components/cube/JacodeCube";
import { Section, SectionHead } from "@presentation/components/ui/Section";

export function JourneySection() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.35 });
  const { reducedMotion } = useMotionPreference();
  const { index, stages, select } = useJourneyStage(
    inView && !reducedMotion,
    2800
  );

  return (
    <Section id="proceso" className="section-journey" labelledBy="journey-title">
      <SectionHead
        index="06"
        title="Nuestro proceso"
        lead="Como un cubo que se reordena hasta encontrar la solución."
        titleId="journey-title"
      />
      <div className="journey" ref={ref}>
        <div className="journey-visual">
          <JacodeCube
            size={130}
            interactive={false}
            autoRotate
            stageIndex={index}
            className="mini"
          />
        </div>
        <ol className="journey-steps" aria-label="Etapas del proceso">
          {stages.map((stage, i) => (
            <li key={stage.id}>
              <button
                type="button"
                className={i === index ? "is-active" : undefined}
                aria-current={i === index ? "step" : undefined}
                onClick={() => select(i)}
              >
                <span>{stage.number}</span> {stage.label}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
