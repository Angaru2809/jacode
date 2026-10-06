import { Link } from "react-router-dom";
import { brand } from "@domain/content/brand";
import { Button } from "@presentation/components/ui/Button";
import { JacodeCube } from "@presentation/components/cube/JacodeCube";

export function CtaSection() {
  return (
    <section className="section section-cta" id="contacto" aria-labelledby="cta-title">
      <div className="cta-inner">
        <JacodeCube
          size={110}
          interactive={false}
          autoRotate
          className="cta-cube"
        />
        <h2 id="cta-title">¿Qué problema quieres convertir en una solución?</h2>
        <p className="cta-sub">Cuéntanos tu idea.</p>
        <Button
          variant="primary"
          size="lg"
          href={`mailto:${brand.contactEmail}?subject=Quiero%20hablar%20con%20JACODE`}
          showArrow
        >
          Hablar con JACODE
        </Button>
        <Link className="cta-secondary" to="/cotizacion">
          Ver plantilla de cotización
        </Link>
      </div>
    </section>
  );
}
