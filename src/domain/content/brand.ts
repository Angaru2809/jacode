import type { NavLink } from "@domain/models/types";
import { homeNavSections } from "@domain/content/homeSections";

export const brand = {
  name: "JACODE",
  tagline: "Tecnología · Innovación · Desarrollo",
  /** Frase de marca (bloque secundario bajo el H1 de conversión) */
  headlineIntro: ["Lo que imaginas", "puede evolucionar."],
  headlineAccent: "Lo hacemos realidad.",
  heroBadge: "JACODE · DESARROLLO DIGITAL",
  heroHeadlineLines: [
    { text: "Creamos soluciones digitales", tone: "plain" as const },
    { text: "e impulsamos tu negocio.", tone: "accent" as const },
  ],
  /** @deprecated use heroHeadlineLines */
  heroHeadlineLine1: "Creamos soluciones digitales",
  heroHeadlineLine2: "e impulsamos tu negocio.",
  heroTaglineLine1: "Lo que imaginas puede evolucionar.",
  heroTaglineAccent: "Lo hacemos realidad.",
  heroSubhead:
    "Desarrollamos páginas web, plataformas y software a medida para empresas y equipos que buscan resolver necesidades reales, mejorar sus procesos y llevar sus productos digitales más lejos.",
  /** @deprecated use heroHeadlineLine1 + heroHeadlineLine2 */
  heroHeadline: "Creamos soluciones digitales e impulsamos tu negocio.",
  /** @deprecated use heroTaglineLine1 + heroTaglineAccent */
  heroTagline: "Lo que imaginas puede evolucionar. Lo hacemos realidad.",
  heroLead:
    "Desarrollamos páginas web, plataformas y software a medida para resolver necesidades reales y ayudar a tu negocio a avanzar. Conectamos herramientas, automatizamos tareas y aplicamos inteligencia artificial cuando aporta valor.",
  /** @deprecated use heroLead — kept for references */
  heroAudience:
    "Desarrollamos páginas web, plataformas y software a medida para empresas que quieren lanzar nuevas ideas, mejorar sus procesos o hacer crecer sus productos digitales.",
  heroOffersLine:
    "Páginas web y plataformas · Software a medida · Apps y productos digitales · Integraciones y automatización",
  /** @deprecated use heroOffersLine */
  heroOffers: [
    "Páginas web y plataformas",
    "Software a medida",
    "Apps y productos digitales",
    "Integraciones y automatización",
  ] as const,
  lead:
    "Desarrollamos páginas web, plataformas y software a medida para empresas que quieren lanzar nuevas ideas, mejorar sus procesos o hacer crecer sus productos digitales.",
  /** CTA principal en hero, formulario y cierre. */
  primaryCtaLabel: "Hablemos de tu proyecto",
  primaryCtaHref: "#contacto",
  /** Etiqueta corta del botón de contacto en la barra superior. */
  navContactCtaLabel: "Hablemos",
  /** Acceso área de clientes (ajusta URL cuando el panel esté en producción). */
  clientPortalLabel: "Panel cliente",
  clientPortalHref: "https://clientes.jacode.com",
  /** @deprecated use primaryCtaLabel */
  heroCtaLabel: "Hablemos de tu proyecto",
  heroSecondaryCtaLabel: "Explorar servicios",
  secondaryLine: "De la idea al código. Del código a la solución.",
  definition:
    "JACODE desarrolla soluciones digitales a medida: webs, plataformas, software, automatizaciones e integraciones para empresas.",
  contactEmail: "info@jacode.com",
  whatsappPhone: "573001234567",
  instagramUrl: "https://instagram.com/jacode",
  linkedinUrl: "https://linkedin.com/company/jacode",
  tiktokUrl: "https://tiktok.com/@jacode",
  whatsappMessage:
    "Hola JACODE, quiero convertir una idea en una solución digital.",
  logoSrc: "/assets/brand/logo-jacode-black.png",
  logoSrcOnDark: "/assets/brand/logo-jacode-white.png",
  notFoundMascotSrc: "/assets/errors/404-mascot.png",
  colors: {
    magenta: "#FF006E",
    pitch: "#080808",
    white: "#FFFFFF",
  },
} as const;

/** Enlace de WhatsApp con mensaje prellenado. */
export function whatsappHref(message: string = brand.whatsappMessage): string {
  return `https://wa.me/${brand.whatsappPhone}?text=${encodeURIComponent(message)}`;
}

export const storyLabels: Record<string, string> = {
  scrambled: "Complejidad",
  intervening: "Organización",
  ordered: "Organización",
  solution: "Solución",
};

export const navLinks: NavLink[] = [
  ...homeNavSections.map(({ href, label }) => ({ href, label })),
  { href: brand.primaryCtaHref, label: brand.navContactCtaLabel, cta: true },
];
