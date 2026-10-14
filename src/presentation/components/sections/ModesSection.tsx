import { workModes } from "@domain/content/process";
import { Section, SectionHead } from "@presentation/components/ui/Section";
import { FolderTabCard } from "@presentation/components/sections/FolderTabCard";

export function ModesSection() {
  return (
    <Section id="modalidades" className="section-modes" labelledBy="modes-title">
      <SectionHead
        index="06"
        title="Nos adaptamos a tu proyecto."
        lead="Elige la modalidad que mejor encaja con tu ritmo y tu alcance."
        titleId="modes-title"
      />

      <div className="mode-folder-grid">
        {workModes.map((mode, index) => (
          <FolderTabCard
            key={mode.id}
            index={index}
            title={mode.title}
            description={mode.description}
            footer={
              <ul className="folder-card__flow" aria-label={`Flujo: ${mode.flow.join(", ")}`}>
                {mode.flow.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            }
          />
        ))}
      </div>
    </Section>
  );
}
