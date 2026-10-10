export interface StackValueItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: "react" | "java" | "node" | "wordpress";
  featured?: boolean;
}

export const stackValues: StackValueItem[] = [
  {
    id: "react",
    title: "Interfaces que convierten",
    description:
      "Frontends rápidos, accesibles y listos para escalar con componentes reutilizables y diseño consistente.",
    tags: ["React", "TypeScript", "Vite"],
    icon: "react",
  },
  {
    id: "java",
    title: "Backend con criterio",
    description:
      "Lógica de negocio, integraciones y sistemas que sostienen operaciones reales con estabilidad.",
    tags: ["Java", "Spring", "APIs REST"],
    icon: "java",
    featured: true,
  },
  {
    id: "node",
    title: "Servicios en tiempo real",
    description:
      "APIs, automatizaciones y flujos conectados cuando necesitas velocidad de entrega y flexibilidad.",
    tags: ["Node.js", "Express", "Integraciones"],
    icon: "node",
  },
  {
    id: "wordpress",
    title: "Sitios que venden",
    description:
      "Landings, corporativos y tiendas con WordPress cuando el negocio pide contenido y conversión.",
    tags: ["WordPress", "WooCommerce", "SEO técnico"],
    icon: "wordpress",
  },
];
