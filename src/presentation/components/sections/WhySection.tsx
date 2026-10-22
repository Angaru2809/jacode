import { whyItems } from "@domain/content/process";
import { Section, SectionHead } from "@presentation/components/ui/Section";
import { WhyFeatureCard } from "@presentation/components/sections/WhyFeatureCard";

export function WhySection() {
  return (
    <Section id="por-que" className="section-why" labelledBy="why-title">
      <SectionHead index="07" title="¿Por qué JACODE?" titleId="why-title" />
      <div className="why-feature-grid">
        {whyItems.map((item, index) => (
          <WhyFeatureCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </Section>
  );
}
