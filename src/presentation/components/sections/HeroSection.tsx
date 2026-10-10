import { useRef } from "react";
import { brand } from "@domain/content/brand";
import { Button } from "@presentation/components/ui/Button";
import { JacodeCube } from "@presentation/components/cube/JacodeCube";

interface HeroSectionProps {
  onExplore: () => void;
  cubeApiRef: React.MutableRefObject<{
    reorganize: () => void;
    highlight: (i: number | null) => void;
  } | null>;
}

export function HeroSection({ onExplore, cubeApiRef }: HeroSectionProps) {
  const statusId = useRef(`cube-hint-${Math.random().toString(36).slice(2)}`);

  return (
    <section className="hero" id="hero" aria-labelledby="hero-title">
      <div className="hero-stage">
        <JacodeCube
          size={210}
          playIntroStory
          interactive
          showHint
          showStoryStatus
          hint="Arrastra para rotar · Estructura 3D interactiva"
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
            <span className="hero-headline__line">{brand.headline[0]}</span>
            <span className="hero-headline__accent">{brand.headline[1]}</span>
          </h1>
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
      <div className="scroll-cue" aria-hidden="true">
        <span>Explorar</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
