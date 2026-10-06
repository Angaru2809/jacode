import type { ServiceItem } from "@domain/models/types";

export const services: ServiceItem[] = [
  {
    id: "software",
    number: "01",
    title: "Desarrollo de software",
    description: "Sistemas y plataformas diseñadas para necesidades específicas.",
    pieceClass: "piece-01",
  },
  {
    id: "web",
    number: "02",
    title: "Desarrollo web",
    description: "Páginas corporativas, plataformas web y e-commerce.",
    pieceClass: "piece-02",
  },
  {
    id: "mobile",
    number: "03",
    title: "Aplicaciones móviles",
    description: "Aplicaciones modernas para Android y iOS.",
    pieceClass: "piece-03",
  },
  {
    id: "ai",
    number: "04",
    title: "Inteligencia artificial",
    description:
      "Asistentes, automatización, análisis inteligente y soluciones con IA.",
    pieceClass: "piece-04",
  },
  {
    id: "automation",
    number: "05",
    title: "Automatización",
    description: "Digitalización y optimización de procesos empresariales.",
    pieceClass: "piece-05",
  },
  {
    id: "integration",
    number: "06",
    title: "Integración de sistemas",
    description: "APIs, ERP, CRM, bases de datos y conexión entre plataformas.",
    pieceClass: "piece-06",
  },
];
