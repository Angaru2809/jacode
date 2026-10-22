import { useState } from "react";
import { Link } from "react-router-dom";
import { useMotionPreference } from "@app/providers/MotionProvider";
import { brand } from "@domain/content/brand";
import { Button } from "@presentation/components/ui/Button";
import { JacodeCube } from "@presentation/components/cube/JacodeCube";
import {
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  TikTokIcon,
  WhatsAppIcon,
} from "@presentation/components/ui/SocialIcons";

function whatsappHref() {
  const text = encodeURIComponent(brand.whatsappMessage);
  return `https://wa.me/${brand.whatsappPhone}?text=${text}`;
}

const socialLinks = [
  { id: "linkedin", href: brand.linkedinUrl, label: "LinkedIn", Icon: LinkedInIcon },
  { id: "instagram", href: brand.instagramUrl, label: "Instagram", Icon: InstagramIcon },
  { id: "whatsapp", href: whatsappHref(), label: "WhatsApp", Icon: WhatsAppIcon },
  { id: "tiktok", href: brand.tiktokUrl, label: "TikTok", Icon: TikTokIcon },
] as const;

export function CtaSection() {
  const { reducedMotion } = useMotionPreference();
  const [retroHover, setRetroHover] = useState(false);
  const retroOn = retroHover && !reducedMotion;

  return (
    <section className="section section-cta" id="cierre" aria-labelledby="cta-title">
      <div className="cta-inner">
        <div
          className={`cta-cube-shell${retroOn ? " is-retro" : ""}`}
          onMouseEnter={() => setRetroHover(true)}
          onMouseLeave={() => setRetroHover(false)}
          onFocusCapture={() => setRetroHover(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
              setRetroHover(false);
            }
          }}
        >
          <JacodeCube
            size={175}
            variant="ambient"
            autoRotate
            interactive={!reducedMotion}
            retroSpinActive={retroOn}
            showHint={false}
            className={`cta-cube${retroOn ? " is-retro" : ""}`}
          />
        </div>

        <h2 id="cta-title" className="cta-headline">
          ¿Qué <span className="cta-headline__accent">problema</span> quieres convertir en
          una <span className="cta-headline__accent">solución</span>?
        </h2>
        <p className="cta-sub">Cuéntanos tu idea.</p>

        <div className="cta-primary-wrap">
          <Button
            variant="primary"
            size="md"
            className="cta-primary-btn interaction-halo"
            href={whatsappHref()}
            showArrow
          >
            Hablar con JACODE
          </Button>
        </div>

        <div className="cta-social-grid" role="list" aria-label="Redes sociales">
          {socialLinks.map(({ id, href, label, Icon }) => (
            <a
              key={id}
              role="listitem"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`cta-social-icon cta-social-icon--${id}`}
              aria-label={label}
            >
              <Icon title="" />
            </a>
          ))}
        </div>

        <p className="cta-email-row">
          <MailIcon className="cta-email-row__icon" title="" />
          <span className="cta-email-row__sep" aria-hidden="true" />
          <a href={`mailto:${brand.contactEmail}`}>{brand.contactEmail}</a>
        </p>

        <Link className="cta-secondary" to="/cotizacion">
          Ver plantilla de cotización
        </Link>
      </div>
    </section>
  );
}
