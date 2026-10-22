import { Section } from "@presentation/components/ui/Section";
import { ModePricingGrid } from "@presentation/components/sections/ModeFolderGrid";

export function ModesSection() {
  return (
    <Section id="modalidades" className="section-modes" labelledBy="modes-title">
<<<<<<< HEAD
      <header className="section-head reveal reveal-stagger">
        <span className="section-index reveal-stagger__item" aria-hidden="true">
          05
        </span>
        <h2 id="modes-title" className="reveal-stagger__item">
          Nos adaptamos a tu{" "}
          <span className="section-modes__title-accent">proyecto.</span>
        </h2>
        <p className="section-lead reveal-stagger__item">
          Soluciones flexibles para empresas y equipos que necesitan crear, conectar y hacer
          evolucionar su tecnología.
        </p>
      </header>
=======
      <SectionHead
        index="07"
        title="Nos adaptamos a tu proyecto."
        lead="Elige la modalidad que mejor encaja con tu ritmo y tu alcance."
        titleId="modes-title"
      />
>>>>>>> 9189bf2eda5722fcbc51f384992109c7512e286a

      <ModePricingGrid />
    </Section>
  );
}
