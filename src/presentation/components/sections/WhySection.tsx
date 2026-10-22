import { WhyBlades } from "@presentation/components/sections/WhyBlades";

export function WhySection() {
  return (
<<<<<<< HEAD
    <section id="por-que" className="section-why" aria-labelledby="why-title">
      <div className="why-layout reveal">
        <div className="why-layout__copy">
          <span className="section-index why-layout__index" aria-hidden="true">
            06
          </span>
          <h2 id="why-title" className="why-layout__title">
            Por qué elegir <span className="why-layout__title-accent">JACODE</span>
          </h2>
          <p className="why-layout__lead">
            Cuéntanos qué quieres crear y recibe una propuesta inicial con alcance, próximos
            pasos y tiempos estimados.
          </p>
          <p className="why-layout__hint">Selecciona un pilar para ver el detalle.</p>
        </div>

        <div className="why-layout__showcase">
          <WhyBlades />
        </div>
=======
    <Section id="por-que" className="section-why" labelledBy="why-title">
      <SectionHead index="08" title="¿Por qué JACODE?" titleId="why-title" />
      <div className="why-feature-grid">
        {whyItems.map((item, index) => (
          <WhyFeatureCard key={item.id} item={item} index={index} />
        ))}
>>>>>>> 9189bf2eda5722fcbc51f384992109c7512e286a
      </div>
    </section>
  );
}
