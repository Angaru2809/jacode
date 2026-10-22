import type { ClientNeed } from "@domain/models/types";

export const clientNeeds: ClientNeed[] = [
  {
    id: "manual",
    title: "Procesos manuales",
    hint: "Mucho tiempo en tareas repetitivas que podrían fluir solas.",
    help: "Mapeamos el flujo, quitamos fricción y diseñamos herramientas que tu equipo sí usa.",
    watermark: "Flujo",
    signals: [
      { id: "s1", label: "Excel o papel como sistema principal" },
      { id: "s2", label: "Misma información copiada en varios lugares" },
      { id: "s3", label: "Errores por digitación o pasos olvidados" },
    ],
  },
  {
    id: "digital",
    title: "Solución digital a medida",
    hint: "Necesitas un producto propio, no un parche sobre lo que ya tienes.",
    help: "Definimos alcance, experiencia y arquitectura antes de construir algo que escale contigo.",
    watermark: "Producto",
    signals: [
      { id: "s1", label: "Portal, app o plataforma que aún no existe" },
      { id: "s2", label: "Herramientas genéricas que no encajan al negocio" },
      { id: "s3", label: "Crecimiento bloqueado por sistemas limitados" },
    ],
  },
  {
    id: "connect",
    title: "Sistemas desconectados",
    hint: "Datos en silos: nada se actualiza solo ni se ve completo.",
    help: "Conectamos APIs, bases de datos y servicios para que la información viaje con trazabilidad.",
    watermark: "Integración",
    signals: [
      { id: "s1", label: "ERP, CRM o ecommerce que no se hablan" },
      { id: "s2", label: "Reportes armados a mano cada semana" },
      { id: "s3", label: "Doble captura entre áreas o proveedores" },
    ],
  },
  {
    id: "automate",
    title: "Automatización e IA",
    hint: "Quieres decidir con datos y liberar tiempo de lo repetitivo.",
    help: "Automatizamos lo predecible e integramos IA donde aporta valor real, no por moda.",
    watermark: "Escala",
    signals: [
      { id: "s1", label: "Tareas que siguen el mismo patrón cada día" },
      { id: "s2", label: "Decisiones lentas por falta de información clara" },
      { id: "s3", label: "Interés en IA sin un caso de uso concreto" },
    ],
  },
];
