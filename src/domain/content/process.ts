import type {
  DeliverableItem,
  JourneyStage,
  ProcessStep,
  WhyItem,
  WorkMode,
} from "@domain/models/types";

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Descubrimiento",
    description: "Entendemos la necesidad y definimos el problema.",
  },
  {
    number: "02",
    title: "Planeación",
    description: "Definimos alcance, funcionalidades, arquitectura y prioridades.",
  },
  {
    number: "03",
    title: "Diseño",
    description: "Diseñamos la experiencia y la interfaz del producto.",
  },
  {
    number: "04",
    title: "Desarrollo",
    description: "Construimos la solución utilizando las tecnologías adecuadas.",
  },
  {
    number: "05",
    title: "Pruebas",
    description: "Validamos funcionamiento, experiencia y calidad.",
  },
  {
    number: "06",
    title: "Implementación",
    description: "Ponemos la solución en funcionamiento.",
  },
  {
    number: "07",
    title: "Entrega",
    description: "Entregamos documentación, accesos y conocimiento necesario.",
  },
];

export const deliverables: DeliverableItem[] = [
  { id: "uiux", label: "Diseño UI/UX" },
  { id: "proto", label: "Prototipo" },
  { id: "source", label: "Código fuente" },
  { id: "app", label: "Aplicación o plataforma funcional" },
  { id: "db", label: "Base de datos" },
  { id: "api", label: "Integraciones / API" },
  { id: "docs", label: "Documentación técnica" },
  { id: "manual", label: "Manual de usuario" },
  { id: "qa", label: "Pruebas" },
  { id: "deploy", label: "Despliegue" },
  { id: "training", label: "Capacitación" },
  { id: "support", label: "Soporte inicial" },
];

export const workModes: WorkMode[] = [
  {
    id: "proyecto",
    title: "Proyecto",
    description: "Para soluciones con alcance y entregables definidos.",
    flow: ["Alcance", "Desarrollo", "Pruebas", "Entrega"],
  },
  {
    id: "evolutivo",
    title: "Evolutivo",
    description: "Para productos que necesitan crecer continuamente.",
    flow: ["Idea", "MVP", "Mejoras", "Nuevas funcionalidades"],
  },
  {
    id: "fases",
    title: "Por fases",
    description: "Para proyectos grandes que necesitan construirse progresivamente.",
    flow: ["Fase 01", "Fase 02", "Fase 03", "Fase 04"],
  },
];

export const journeyStages: JourneyStage[] = [
  { id: "discover", number: "01", label: "Descubrimos" },
  { id: "design", number: "02", label: "Diseñamos" },
  { id: "build", number: "03", label: "Desarrollamos" },
  { id: "test", number: "04", label: "Probamos" },
  { id: "ship", number: "05", label: "Implementamos" },
  { id: "evolve", number: "06", label: "Evolucionamos" },
];

export const whyItems: WhyItem[] = [
  {
    id: "complexity",
    title: "Complejidad",
    description: "Entendemos problemas tecnológicos complejos.",
  },
  {
    id: "strategy",
    title: "Estrategia",
    description: "No desarrollamos por desarrollar; primero entendemos.",
  },
  {
    id: "tech",
    title: "Tecnología",
    description: "Elegimos las herramientas adecuadas para cada solución.",
  },
  {
    id: "results",
    title: "Resultados",
    description: "Nuestro objetivo es crear tecnología útil, funcional y escalable.",
  },
];
