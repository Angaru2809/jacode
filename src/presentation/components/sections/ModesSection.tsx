import { Section } from "@presentation/components/ui/Section";
import { ModePricingGrid } from "@presentation/components/sections/ModeFolderGrid";

export function ModesSection() {
  return (
    <Section id="modalidades" className="section-modes" labelledBy="modes-title">
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

      <ModePricingGrid />
    </Section>
  );
}
