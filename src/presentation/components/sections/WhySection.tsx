import { whyItems } from "@domain/content/process";
import { Section, SectionHead } from "@presentation/components/ui/Section";

export function WhySection() {
  return (
    <Section id="por-que" className="section-why" labelledBy="why-title">
      <SectionHead index="07" title="¿Por qué JACODE?" titleId="why-title" />
      <div className="why-grid">
        {whyItems.map((item) => (
          <article key={item.id} className="why-item reveal">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
