import { useRef } from "react";
import { brand } from "@domain/content/brand";
import { Button } from "@presentation/components/ui/Button";
import { JacodeCube } from "@presentation/components/cube/JacodeCube";
import { useMotionPreference } from "@app/providers/MotionProvider";

interface HeroSectionProps {
  onExplore: () => void;
  cubeApiRef: React.MutableRefObject<{
    reorganize: () => void;
    highlight: (i: number | null) => void;
  } | null>;
}

export function HeroSection({ onExplore, cubeApiRef }: HeroSectionProps) {
  const { reducedMotion } = useMotionPreference();
  const statusId = useRef(`cube-status-${Math.random().toString(36).slice(2)}`);

  return (
    <section className="hero" id="hero" aria-labelledby="hero-title">
      <div className="hero__inner">
        <div className="hero-stage">
          <JacodeCube
            size={440}
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

          <div className="hero-copy">
            <p className="hero-badge">
              <span className="hero-badge__dot" aria-hidden="true" />
              {brand.heroBadge}
            </p>
            <h1 className="hero-headline" id="hero-title">
              <span className="hero-headline__intro">
                {brand.headlineIntro.map((line) => (
                  <span key={line} className="hero-headline__line">
                    {line}
                  </span>
                ))}
              </span>
              <span className="hero-headline__accent">{brand.headlineAccent}</span>
            </h1>
            <span id={statusId.current} className="sr-only">
              Cubo en animación automática. Haz clic en el cubo para reorganizarlo.
            </span>

            <div className="hero-actions">
              <Button
                variant="primary"
                size="lg"
                className="hero-cta interaction-halo"
                href="#que-hacemos"
                showArrow
                onClick={(e) => {
                  e.preventDefault();
                  onExplore();
                }}
              >
                Descubre cómo lo hacemos
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
