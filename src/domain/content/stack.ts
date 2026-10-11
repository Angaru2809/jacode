export interface StackValueItem {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  icon: "react" | "java" | "node" | "wordpress";
  previewClass: string;
  featured?: boolean;
}

export const stackValues: StackValueItem[] = [
  {
    id: "react",
    title: "Interfaces que convierten",
    category: "Frontend",
    previewClass: "stack-preview--react",
    description:
      "Frontends rápidos, accesibles y listos para escalar con componentes reutilizables y diseño consistente.",
    tags: ["React", "TypeScript", "Vite"],
    icon: "react",
  },
  {
    id: "java",
    title: "Backend con criterio",
    category: "Backend",
    previewClass: "stack-preview--java",
    description:
      "Lógica de negocio, integraciones y sistemas que sostienen operaciones reales con estabilidad.",
    tags: ["Java", "Spring", "APIs REST"],
    icon: "java",
    featured: true,
  },
  {
    id: "node",
    title: "Servicios en tiempo real",
    category: "Integraciones",
    previewClass: "stack-preview--node",
    description:
      "APIs, automatizaciones y flujos conectados cuando necesitas velocidad de entrega y flexibilidad.",
    tags: ["Node.js", "Express", "Integraciones"],
    icon: "node",
  },
  {
    id: "wordpress",
    title: "Sitios que venden",
    category: "CMS",
    previewClass: "stack-preview--wordpress",
    description:
      "Landings, corporativos y tiendas con WordPress cuando el negocio pide contenido y conversión.",
    tags: ["WordPress", "WooCommerce", "SEO técnico"],
    icon: "wordpress",
  },
];
