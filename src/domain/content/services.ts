import type { ServiceItem } from "@domain/models/types";
import { homeSectionIndex } from "@domain/content/homeSections";

export const servicesSectionCopy = {
  index: homeSectionIndex.services,
  titleLine1: "¿Qué podemos desarrollar",
  titleLine2: "para tu",
  titleAccent: "negocio?",
  lead:
    "Explora nuestras soluciones, descubre qué podemos desarrollar para tu negocio y encuentra la opción ideal para tu proyecto.",
  hint: "Selecciona un servicio para conocer su alcance y cómo puede ayudarte.",
} as const;

export const services: ServiceItem[] = [
  {
    id: "software",
    number: "01",
    title: "Desarrollo de software",
    shortLabel: "Software",
    description:
      "Creamos sistemas a medida para resolver necesidades específicas de tu operación.",
    pieceClass: "piece-01",
    coverImage: "/assets/services/dev-software.jpg",
    icon: "terminal",
  },
  {
    id: "web",
    number: "02",
    title: "Desarrollo web",
    shortLabel: "Web",
    description:
      "Diseñamos y desarrollamos sitios web que presentan tu negocio y facilitan que tus clientes encuentren lo que necesitan.",
    pieceClass: "piece-02",
    coverImage: "/assets/services/dev-web.jpg",
    icon: "browser",
  },
  {
    id: "mobile",
    number: "03",
    title: "Aplicaciones móviles",
    shortLabel: "Móvil",
    description:
      "Desarrollamos aplicaciones para ofrecer servicios y funcionalidades desde el celular.",
    pieceClass: "piece-03",
    coverImage: "/assets/services/movil.jpg",
    icon: "mobile",
  },
  {
    id: "ai",
    number: "04",
    title: "Inteligencia artificial",
    shortLabel: "IA",
    description:
      "Identificamos oportunidades para aplicar IA a tareas y procesos concretos de tu negocio.",
    pieceClass: "piece-04",
    coverImage: "/assets/services/ia.jpg",
    icon: "ai",
  },
  {
    id: "automation",
    number: "05",
    title: "Automatización",
    shortLabel: "Automatizar",
    description:
      "Automatizamos tareas repetitivas para reducir trabajo manual y errores.",
    pieceClass: "piece-05",
    coverImage: "/assets/services/automatizaciones.jpg",
    icon: "automation",
  },
  {
    id: "integration",
    number: "06",
    title: "Integración de sistemas",
    shortLabel: "Integración",
    description:
      "Conectamos tus sistemas para que compartan información y funcionen de forma coordinada.",
    pieceClass: "piece-06",
    coverImage: "/assets/services/api.jpg",
    icon: "integration",
  },
];
