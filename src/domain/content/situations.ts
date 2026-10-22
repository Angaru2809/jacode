import type { ServiceIconKind } from "@domain/models/types";

export type SituationTileTone = "light" | "dark" | "accent";

export type SituationFlipBack =
  | { type: "quote"; quote: string }
  | { type: "image"; image: string; imageAlt: string; label?: string };

export interface SituationItem {
  id: string;
  title: string;
  description: string;
  icon: ServiceIconKind;
  tone: SituationTileTone;
  /** Imagen en la cara frontal (opcional) */
  coverImage?: string;
  flipBack: SituationFlipBack;
}

export const situationsIntro = {
  eyebrow: "Situaciones",
  titleLine1: "Cuatro contextos.",
  titleLine2: "Un plan claro.",
  leadBefore: "Identificamos en qué punto está tu negocio y ",
  leadHighlight: "qué solución digital",
  leadAfter: " necesitas — antes de entrar al detalle de cada servicio.",
  cta: "Ver qué hacemos",
  ctaHref: "#que-hacemos",
} as const;

export const situations: SituationItem[] = [
  {
    id: "launch",
    title: "Lanzar",
    description:
      "Web, MVP o producto nuevo con alcance definido y entregables que puedas mostrar pronto.",
    icon: "browser",
    tone: "light",
    coverImage: "/assets/services/dev-web.jpg",
    flipBack: {
      type: "quote",
      quote: "De la idea al lanzamiento, con entregables que el negocio puede ver y usar.",
    },
  },
  {
    id: "modernize",
    title: "Modernizar",
    description:
      "Sistemas lentos o difíciles de mantener. Evolución sin frenar la operación diaria.",
    icon: "terminal",
    tone: "dark",
    flipBack: {
      type: "image",
      image: "/assets/services/dev-software.jpg",
      imageAlt: "Modernización de plataformas y software empresarial",
      label: "Evolución continua",
    },
  },
  {
    id: "automate",
    title: "Automatizar",
    description:
      "Procesos manuales y reportes repetitivos. Automatización e IA con valor medible.",
    icon: "automation",
    tone: "light",
    flipBack: {
      type: "image",
      image: "/assets/services/automatizaciones.jpg",
      imageAlt: "Automatización de procesos empresariales",
      label: "Menos tareas manuales",
    },
  },
  {
    id: "integrate",
    title: "Integrar",
    description:
      "ERP, CRM, APIs y datos desconectados. Un solo flujo entre herramientas y equipos.",
    icon: "integration",
    tone: "accent",
    flipBack: {
      type: "image",
      image: "/assets/services/api.jpg",
      imageAlt: "Integración de APIs y sistemas",
      label: "Todo conectado",
    },
  },
];
