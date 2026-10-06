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
          size={180}
          playIntroStory
          interactive
          showHint
          showStoryStatus
          labelledBy={statusId.current}
          onReady={(api) => {
            cubeApiRef.current = api;
          }}
        />

        <div className="hero-copy">
          <p className="eyebrow">{brand.tagline}</p>
          <h1 className="brand-title" id="hero-title">
            <span className="brand-word">{brand.name}</span>
          </h1>
          <p className="hero-headline">
            {brand.headline[0]}
            <br />
            {brand.headline[1]}
          </p>
          <p className="hero-lead">{brand.lead}</p>
          <div className="hero-actions">
            <Button
              variant="primary"
              href="#que-hacemos"
              showEnter
              onClick={(e) => {
                e.preventDefault();
                onExplore();
              }}
            >
              Conoce lo que hacemos
            </Button>
            <Button variant="ghost" href="#contacto">
              Cuéntanos tu idea
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
