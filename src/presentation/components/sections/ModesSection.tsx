import { homeSectionIndex } from "@domain/content/homeSections";
import { Section } from "@presentation/components/ui/Section";
import { ModePricingGrid } from "@presentation/components/sections/ModeFolderGrid";

export function ModesSection() {
  return (
    <Section id="modalidades" className="section-modes" labelledBy="modes-title">
      <header className="modes-intro reveal reveal-stagger">
        <span
          className="section-index modes-intro__index reveal-stagger__item"
          aria-hidden="true"
        >
          {homeSectionIndex.modes}
        </span>
        <h2 id="modes-title" className="modes-intro__title reveal-stagger__item">
          <span className="modes-intro__title-line">
            Nos adaptamos a tu{" "}
            <span className="modes-intro__title-accent">proyecto.</span>
          </span>
        </h2>
        <p className="modes-intro__lead reveal-stagger__item">
          Soluciones flexibles para empresas y equipos que necesitan crear, conectar y hacer
          evolucionar su tecnología.
        </p>
      </header>

      <ModePricingGrid />
    </Section>
  );
}
