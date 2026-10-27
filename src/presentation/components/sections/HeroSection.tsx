import { useRef } from "react";
import { useHeroCubeSize } from "@application/hooks/useHeroCubeSize";
import { brand } from "@domain/content/brand";
import { Button } from "@presentation/components/ui/Button";
import { JacodeCube } from "@presentation/components/cube/JacodeCube";
import { useMotionPreference } from "@app/providers/MotionProvider";

interface HeroSectionProps {
  cubeApiRef: React.MutableRefObject<{
    reorganize: () => void;
    highlight: (i: number | null) => void;
  } | null>;
}

export function HeroSection({ cubeApiRef }: HeroSectionProps) {
  const { reducedMotion } = useMotionPreference();
  const cubeSize = useHeroCubeSize();
  const statusId = useRef(`cube-status-${Math.random().toString(36).slice(2)}`);

  return (
    <section className="hero" id="hero" aria-labelledby="hero-title">
      <div className="hero-ambient" aria-hidden="true">
        <span className="hero-ambient__orb hero-ambient__orb--primary" />
        <span className="hero-ambient__orb hero-ambient__orb--secondary" />
      </div>
      <div className="hero__inner">
        <div className="hero-stage">
          <div className="hero-visual">
            <JacodeCube
              size={cubeSize}
              playIntroStory={!reducedMotion}
              autoRotate={!reducedMotion}
              interactive={!reducedMotion}
              tapToReorganize
              showHint={false}
              className="hero-cube"
              labelledBy={statusId.current}
              onReady={(api) => {
                cubeApiRef.current = api;
              }}
            />
          </div>

          <div className="hero-copy">
            <p className="hero-badge">
              <span className="hero-badge__dot" aria-hidden="true" />
              {brand.heroBadge}
            </p>
            <h1 className="hero-headline" id="hero-title">
              <span className="hero-headline__promise">
                {brand.headlineIntro.join(" ")}
              </span>
              <span className="hero-headline__accent">{brand.headlineAccent}</span>
            </h1>

            <p className="hero-audience">{brand.heroAudience}</p>
            <p className="hero-lead">{brand.lead}</p>

            <ul className="hero-offers" aria-label="Servicios principales">
              {brand.heroOffers.map((offer) => (
                <li key={offer}>{offer}</li>
              ))}
            </ul>

            <span id={statusId.current} className="sr-only">
              Cubo en animación automática. Haz clic en el cubo para reorganizarlo.
            </span>

            <div className="hero-actions">
              <Button
                variant="primary"
                size="lg"
                className="hero-cta interaction-halo"
                href="#contacto"
                showArrow
              >
                {brand.heroCtaLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
