import type { NavLink } from "@domain/models/types";

export const brand = {
  name: "JACODE",
  tagline: "Tecnología · Innovación · Desarrollo",
  headline: ["Lo que imaginas puede evolucionar.", "Lo hacemos realidad."],
  heroBadge: "Soluciones digitales",
  lead:
    "Desarrollamos soluciones digitales que convierten ideas, procesos y problemas reales en tecnología funcional.",
  secondaryLine: "De la idea al código. Del código a la solución.",
  definition:
    "JACODE es una empresa de innovación tecnológica que transforma ideas en soluciones digitales mediante software, desarrollo e inteligencia artificial.",
  contactEmail: "hola@jacode.co",
  /** Número en formato internacional sin + (ej. 573001234567) */
  whatsappPhone: "573001234567",
  instagramUrl: "https://instagram.com/jacode",
  whatsappMessage:
    "Hola JACODE, quiero convertir una idea en una solución digital.",
  logoSrc: "/assets/logo-jacode.png",
  colors: {
    magenta: "#FF006E",
    pitch: "#080808",
    white: "#FFFFFF",
  },
} as const;

export const storyLabels: Record<string, string> = {
  scrambled: "Complejidad",
  intervening: "Organización",
  ordered: "Organización",
  solution: "Solución",
};

export const navLinks: NavLink[] = [
  { href: "#que-hacemos", label: "Qué hacemos" },
  { href: "#enfoque", label: "Enfoque" },
  { href: "#proceso", label: "Proceso" },
  { href: "#modalidades", label: "Modalidades" },
  { href: "#contacto", label: "Hablar con JACODE", cta: true },
];
