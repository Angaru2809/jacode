import { Link } from "react-router-dom";
import { brand } from "@domain/content/brand";
import { Button } from "@presentation/components/ui/Button";
import { JacodeCube } from "@presentation/components/cube/JacodeCube";
import { InstagramIcon, WhatsAppIcon } from "@presentation/components/ui/SocialIcons";

function whatsappHref() {
  const text = encodeURIComponent(brand.whatsappMessage);
  return `https://wa.me/${brand.whatsappPhone}?text=${text}`;
}

export function CtaSection() {
  return (
    <section className="section section-cta" id="contacto" aria-labelledby="cta-title">
      <div className="cta-inner">
        <JacodeCube
          size={175}
          variant="ambient"
          autoRotate
          interactive={false}
          showHint={false}
          className="cta-cube"
        />
        <h2 id="cta-title">¿Qué problema quieres convertir en una solución?</h2>
        <p className="cta-sub">Cuéntanos tu idea.</p>
        <Button
          variant="primary"
          size="lg"
          className="interaction-halo"
          href={whatsappHref()}
          showArrow
        >
          Hablar con JACODE
        </Button>
        <div className="cta-social">
          <a
            href={brand.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-social__link interaction-halo"
          >
            <InstagramIcon />
            Instagram
          </a>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-social__link cta-social__link--wa interaction-halo"
          >
            <WhatsAppIcon />
            WhatsApp
          </a>
        </div>
        <Link className="cta-secondary" to="/cotizacion">
          Ver plantilla de cotización
        </Link>
        <p className="cta-email">
          <span className="cta-email__label">Email</span>
          <a href={`mailto:${brand.contactEmail}`}>{brand.contactEmail}</a>
        </p>
      </div>
    </section>
  );
}
