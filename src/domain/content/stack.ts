export type StackLayerId = "frontend" | "backend" | "integrations" | "cms";

export type StackIconKind = "react" | "java" | "node" | "wordpress";

export interface StackLayer {
  id: StackLayerId;
  label: string;
  title: string;
  description: string;
  items: readonly string[];
  icon: StackIconKind;
}

export const stackLayers: StackLayer[] = [
  {
    id: "frontend",
    label: "Frontend",
    title: "Interfaces que convierten",
    description:
      "Experiencias rápidas, accesibles y consistentes, listas para crecer con tu producto.",
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "Angular",
      "React",
      "Bootstrap",
      "Vite",
    ],
    icon: "react",
  },
  {
    id: "backend",
    label: "Backend",
    title: "Backend con criterio",
    description:
      "Lógica de negocio, datos y APIs que sostienen operaciones reales con estabilidad.",
    items: ["PHP", "Laravel", "Java", "Node.js", "Spring", "PostgreSQL"],
    icon: "java",
  },
  {
    id: "integrations",
    label: "Integraciones",
    title: "Servicios conectados",
    description:
      "Automatizaciones, nube y flujos cuando necesitas velocidad de entrega y trazabilidad.",
    items: ["AWS", "Git", "IA aplicada", "APIs", "Docker", "Power Automate", "GraphQL"],
    icon: "node",
  },
  {
    id: "cms",
    label: "CMS",
    title: "Sitios que venden",
    description:
      "Landings y tiendas cuando el negocio pide contenido, conversión y SEO técnico.",
    items: ["WordPress", "CMS", "Shopify", "SEO técnico"],
    icon: "wordpress",
  },
];

export const stackSectionCopy = {
  title: "Herramientas con criterio.",
  lead:
    "Elegimos por operación, equipo, necesidad y mantenimiento a largo plazo — no por moda.",
  ctaLabel: "Hablemos de tu stack",
  ctaHref: "#contacto",
} as const;
