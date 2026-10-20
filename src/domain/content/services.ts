import type { ServiceItem } from "@domain/models/types";

export const services: ServiceItem[] = [
  {
    id: "software",
    number: "01",
    title: "Desarrollo de software",
    shortLabel: "Software",
    description: "Sistemas y plataformas diseñadas para necesidades específicas.",
    pieceClass: "piece-01",
    coverImage: "/assets/services/dev-software.jpg",
  },
  {
    id: "web",
    number: "02",
    title: "Desarrollo web",
    shortLabel: "Web",
    description: "Páginas corporativas, plataformas web y e-commerce.",
    pieceClass: "piece-02",
    coverImage: "/assets/services/dev-web.jpg",
  },
  {
    id: "mobile",
    number: "03",
    title: "Aplicaciones móviles",
    shortLabel: "Móvil",
    description: "Aplicaciones modernas para Android y iOS.",
    pieceClass: "piece-03",
    coverImage: "/assets/services/movil.jpg",
  },
  {
    id: "ai",
    number: "04",
    title: "Inteligencia artificial",
    shortLabel: "IA",
    description:
      "Asistentes, automatización, análisis inteligente y soluciones con IA.",
    pieceClass: "piece-04",
    coverImage: "/assets/services/ia.jpg",
  },
  {
    id: "automation",
    number: "05",
    title: "Automatización",
    shortLabel: "Automatizar",
    description: "Digitalización y optimización de procesos empresariales.",
    pieceClass: "piece-05",
    coverImage: "/assets/services/automatizaciones.jpg",
  },
  {
    id: "integration",
    number: "06",
    title: "Integración de sistemas",
    shortLabel: "Integración",
    description: "APIs, ERP, CRM, bases de datos y conexión entre plataformas.",
    pieceClass: "piece-06",
    coverImage: "/assets/services/api.jpg",
  },
];
