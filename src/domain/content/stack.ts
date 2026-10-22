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
    items: ["HTML", "JavaScript", "Angular", "React"],
    icon: "react",
  },
  {
    id: "backend",
    label: "Backend",
    title: "Backend con criterio",
    description:
      "Lógica de negocio e integraciones que sostienen operaciones reales con estabilidad.",
    items: ["PHP", "Laravel", "Java", "Node.js"],
    icon: "java",
  },
  {
    id: "integrations",
    label: "Integraciones",
    title: "Servicios conectados",
    description:
      "APIs, automatizaciones y flujos cuando necesitas velocidad de entrega y flexibilidad.",
    items: ["Power Automate", "APIs", "Docker", "GraphQL"],
    icon: "node",
  },
  {
    id: "cms",
    label: "CMS",
    title: "Sitios que venden",
    description:
      "Landings y tiendas con WordPress cuando el negocio pide contenido y conversión.",
    items: ["WordPress", "CMS", "PHP", "SEO técnico"],
    icon: "wordpress",
  },
];

/** Complemento en una sola franja — evita saturar las tarjetas */
export const stackEcosystemTools = [
  "CSS",
  "TypeScript",
  "Bootstrap",
  "Vite",
  "Spring",
  "PostgreSQL",
  "IA aplicada",
  "AWS",
  "Git",
] as const;
