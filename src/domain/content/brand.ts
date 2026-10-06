import type { NavLink } from "@domain/models/types";

export const brand = {
  name: "JACODE",
  tagline: "Tecnología · Innovación · Desarrollo",
  headline: ["Ordenamos la complejidad.", "Creamos soluciones."],
  lead:
    "Desarrollamos soluciones digitales que convierten ideas, procesos y problemas reales en tecnología funcional.",
  secondaryLine: "De la idea al código. Del código a la solución.",
  definition:
    "JACODE es una empresa de innovación tecnológica que transforma ideas en soluciones digitales mediante software, desarrollo e inteligencia artificial.",
  contactEmail: "hola@jacode.co",
  logoSrc: "/assets/logo-jacode.png",
  colors: {
    magenta: "#FF006E",
    pitch: "#080808",
    white: "#FFFFFF",
  },
} as const;

export const storyLabels: Record<string, string> = {
  scrambled: "Complejidad desordenada",
  intervening: "JACODE interviene",
  ordered: "Las piezas se organizan",
  solution: "Solución",
};

export const navLinks: NavLink[] = [
  { href: "#que-hacemos", label: "Qué hacemos" },
  { href: "#enfoque", label: "Enfoque" },
  { href: "#proceso", label: "Proceso" },
  { href: "#modalidades", label: "Modalidades" },
  { href: "#contacto", label: "Hablar con JACODE", cta: true },
];
