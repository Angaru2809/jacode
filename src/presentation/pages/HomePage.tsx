import { useRef } from "react";
import { useScrollReveal } from "@application/hooks/useScrollReveal";
import { Header } from "@presentation/components/layout/Header";
import { Footer } from "@presentation/components/layout/Footer";
import { SkipLink } from "@presentation/components/a11y/SkipLink";
import { HeroSection } from "@presentation/components/sections/HeroSection";
import { SituationsSection } from "@presentation/components/sections/SituationsSection";
import { ServicesSection } from "@presentation/components/sections/ServicesSection";
import { StackSection } from "@presentation/components/sections/StackSection";
import { ProcessSection } from "@presentation/components/sections/ProcessSection";
import { ModesSection } from "@presentation/components/sections/ModesSection";
import { ImpulsamosSection } from "@presentation/components/sections/ImpulsamosSection";
import { FaqSection } from "@presentation/components/sections/FaqSection";
import { CtaSection } from "@presentation/components/sections/CtaSection";
import { useMotionPreference } from "@app/providers/MotionProvider";
import { WhatsAppFab } from "@presentation/components/experience/WhatsAppFab";
import { MobileCtaBar } from "@presentation/components/experience/MobileCtaBar";

type CubeApi = {
  reorganize: () => void;
  highlight: (i: number | null) => void;
};

export function HomePage() {
  const cubeApiRef = useRef<CubeApi | null>(null);
  const { reducedMotion } = useMotionPreference();
  useScrollReveal(reducedMotion);

  return (
    <>
      <SkipLink />
      <WhatsAppFab />
      <Header />
      <main id="contenido">
        <HeroSection cubeApiRef={cubeApiRef} />
        <SituationsSection />
        <ServicesSection
          onHoverService={(i) => cubeApiRef.current?.highlight(i)}
        />
        <StackSection />
        <ProcessSection />
        <ModesSection />
        <ImpulsamosSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
      <MobileCtaBar />
    </>
  );
}
