import { useCallback, useRef } from "react";
import { useScrollReveal } from "@application/hooks/useScrollReveal";
import { Header } from "@presentation/components/layout/Header";
import { Footer } from "@presentation/components/layout/Footer";
import { SkipLink } from "@presentation/components/a11y/SkipLink";
import { HeroSection } from "@presentation/components/sections/HeroSection";
import { ServicesSection } from "@presentation/components/sections/ServicesSection";
import { StackSection } from "@presentation/components/sections/StackSection";
import { ApproachSection } from "@presentation/components/sections/ApproachSection";
import { IncludeSection } from "@presentation/components/sections/IncludeSection";
import { DeliverablesSection } from "@presentation/components/sections/DeliverablesSection";
import { ModesSection } from "@presentation/components/sections/ModesSection";
import { JourneySection } from "@presentation/components/sections/JourneySection";
import { WhySection } from "@presentation/components/sections/WhySection";
import { CtaSection } from "@presentation/components/sections/CtaSection";
import { useMotionPreference } from "@app/providers/MotionProvider";
import { MotionFab } from "@presentation/components/experience/MotionFab";
import { WhatsAppFab } from "@presentation/components/experience/WhatsAppFab";

type CubeApi = {
  reorganize: () => void;
  highlight: (i: number | null) => void;
};

export function HomePage() {
  const cubeApiRef = useRef<CubeApi | null>(null);
  const { reducedMotion } = useMotionPreference();
  useScrollReveal(reducedMotion);

  const onExplore = useCallback(() => {
    cubeApiRef.current?.reorganize();
    window.setTimeout(
      () => {
        document
          .getElementById("que-hacemos")
          ?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
      },
      reducedMotion ? 0 : 900
    );
  }, [reducedMotion]);

  return (
    <>
      <SkipLink />
      <div className="noise" aria-hidden="true" />
      <div className="grid-bg" aria-hidden="true" />
      <MotionFab />
      <WhatsAppFab />
      <Header />
      <main id="contenido">
        <HeroSection onExplore={onExplore} cubeApiRef={cubeApiRef} />
        <ServicesSection
          onHoverService={(i) => cubeApiRef.current?.highlight(i)}
        />
        <StackSection />
        <IncludeSection />
        <ApproachSection />
        <DeliverablesSection />
        <ModesSection />
        <JourneySection />
        <WhySection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
