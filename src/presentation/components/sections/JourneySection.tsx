import { useMemo } from "react";
import { useInView } from "@application/hooks/useInView";
import { useJourneyStage } from "@application/hooks/useJourneyStage";
import { useMotionPreference } from "@app/providers/MotionProvider";
import { JacodeCube } from "@presentation/components/cube/JacodeCube";
import { Section, SectionHead } from "@presentation/components/ui/Section";
import { JourneyStageCard } from "@presentation/components/sections/JourneyStageCard";

export function JourneySection() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.28 });
  const { reducedMotion } = useMotionPreference();
  const { index, stages, select, stage } = useJourneyStage(
    inView && !reducedMotion,
    3800
  );

  const leftStages = useMemo(() => stages.slice(0, 3), [stages]);
  const rightStages = useMemo(() => stages.slice(3, 6), [stages]);

  return (
    <Section id="recorrido" className="section-journey" labelledBy="journey-title">
      <SectionHead
        index="07"
        title="El proceso en movimiento"
        lead="Como un cubo que se reordena hasta encontrar la solución."
        titleId="journey-title"
      />
      <div className="journey-stage reveal" ref={ref}>
        <div className="journey-stage__col journey-stage__col--left" aria-label="Etapas 1 a 3">
          {leftStages.map((stage, i) => (
            <JourneyStageCard
              key={stage.id}
              stage={stage}
              active={index === i}
              side="left"
              onSelect={() => select(i)}
            />
          ))}
        </div>

        <div
          className="journey-stage__cube"
          data-journey-active={stage.id}
        >
          <div className="journey-stage__cube-glow" aria-hidden="true" />
          <JacodeCube
            size={240}
            interactive={false}
            autoRotate={!reducedMotion}
            journeyStageId={stage.id}
            className="journey-cube"
          />
          <p className="journey-stage__caption" aria-live="polite">
            <span className="journey-stage__caption-num">{stage.number}</span>
            {stage.label}
          </p>
          <p className="journey-stage__motion-hint">{stage.motionHint}</p>
        </div>

        <div className="journey-stage__col journey-stage__col--right" aria-label="Etapas 4 a 6">
          {rightStages.map((stage, i) => (
            <JourneyStageCard
              key={stage.id}
              stage={stage}
              active={index === i + 3}
              side="right"
              onSelect={() => select(i + 3)}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
