import { brand } from "@domain/content/brand";
import { WhatsAppIcon } from "@presentation/components/ui/SocialIcons";

export function WhatsAppFab() {
  const text = encodeURIComponent(brand.whatsappMessage);
  const href = `https://wa.me/${brand.whatsappPhone}?text=${text}`;

  return (
    <a
      className="whatsapp-fab interaction-halo"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
    >
      <WhatsAppIcon title="WhatsApp" />
      <span className="whatsapp-fab__label">Escríbenos</span>
    </a>
  );
}
