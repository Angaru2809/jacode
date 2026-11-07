import { whatsappHref } from "@domain/content/brand";
import { WhatsAppIcon } from "@presentation/components/ui/SocialIcons";

export function WhatsAppFab() {
  return (
    <a
      className="whatsapp-fab interaction-halo"
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
    >
      <WhatsAppIcon title="" />
      <span className="whatsapp-fab__label">Escríbenos</span>
    </a>
  );
}
