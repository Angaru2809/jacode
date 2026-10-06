import { useCallback, useEffect, useRef } from "react";
import { Header } from "@presentation/components/layout/Header";
import { Footer } from "@presentation/components/layout/Footer";
import { SkipLink } from "@presentation/components/a11y/SkipLink";
import { HeroSection } from "@presentation/components/sections/HeroSection";
import { ServicesSection } from "@presentation/components/sections/ServicesSection";
import { ApproachSection } from "@presentation/components/sections/ApproachSection";
import { IncludeSection } from "@presentation/components/sections/IncludeSection";
import { DeliverablesSection } from "@presentation/components/sections/DeliverablesSection";
import { ModesSection } from "@presentation/components/sections/ModesSection";
import { JourneySection } from "@presentation/components/sections/JourneySection";
import { WhySection } from "@presentation/components/sections/WhySection";
import { CtaSection } from "@presentation/components/sections/CtaSection";
import { useMotionPreference } from "@app/providers/MotionProvider";

type CubeApi = {
  reorganize: () => void;
  highlight: (i: number | null) => void;
};

export function HomePage() {
  const cubeApiRef = useRef<CubeApi | null>(null);
  const { reducedMotion } = useMotionPreference();

  useEffect(() => {
    if (reducedMotion) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"));
      return;
    }
    const nodes = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [reducedMotion]);

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
      <Header />
      <main id="contenido">
        <HeroSection onExplore={onExplore} cubeApiRef={cubeApiRef} />
        <ServicesSection
          onHoverService={(i) => cubeApiRef.current?.highlight(i)}
        />
        <ApproachSection />
        <IncludeSection />
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
