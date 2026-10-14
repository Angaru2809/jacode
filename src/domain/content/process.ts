import type {
  DeliverableItem,
  JourneyStage,
  ProcessPhase,
  ProcessStep,
  WhyItem,
  WorkMode,
} from "@domain/models/types";

export const processPhases: ProcessPhase[] = [
  {
    id: "discover",
    label: "Descubrir",
    summary: "Problema y contexto",
  },
  {
    id: "plan",
    label: "Planear",
    summary: "Alcance y experiencia",
  },
  {
    id: "build",
    label: "Construir",
    summary: "Código y calidad",
  },
  {
    id: "ship",
    label: "Entregar",
    summary: "Producción y handoff",
  },
];

export const processSteps: ProcessStep[] = [
  {
    id: "discovery",
    number: "01",
    phase: "discover",
    title: "Descubrimiento",
    description: "Entendemos la necesidad y definimos el problema.",
  },
  {
    id: "planning",
    number: "02",
    phase: "plan",
    title: "Planeación",
    description: "Definimos alcance, funcionalidades, arquitectura y prioridades.",
  },
  {
    id: "design",
    number: "03",
    phase: "plan",
    title: "Diseño",
    description: "Diseñamos la experiencia y la interfaz del producto.",
  },
  {
    id: "development",
    number: "04",
    phase: "build",
    title: "Desarrollo",
    description: "Construimos la solución utilizando las tecnologías adecuadas.",
  },
  {
    id: "testing",
    number: "05",
    phase: "build",
    title: "Pruebas",
    description: "Validamos funcionamiento, experiencia y calidad.",
  },
  {
    id: "implementation",
    number: "06",
    phase: "ship",
    title: "Implementación",
    description: "Ponemos la solución en funcionamiento.",
  },
  {
    id: "delivery",
    number: "07",
    phase: "ship",
    title: "Entrega",
    description: "Entregamos documentación, accesos y conocimiento necesario.",
  },
];

export const deliverables: DeliverableItem[] = [
  { id: "uiux", label: "Diseño UI/UX", slug: "design/ui" },
  { id: "proto", label: "Prototipo", slug: "design/proto" },
  { id: "source", label: "Código fuente", slug: "src/main" },
  { id: "app", label: "Aplicación o plataforma funcional", slug: "app/build" },
  { id: "db", label: "Base de datos", slug: "data/schema" },
  { id: "api", label: "Integraciones / API", slug: "api/routes" },
  { id: "docs", label: "Documentación técnica", slug: "docs/tech" },
  { id: "manual", label: "Manual de usuario", slug: "docs/user" },
  { id: "qa", label: "Pruebas", slug: "test/suite" },
  { id: "deploy", label: "Despliegue", slug: "ops/deploy" },
  { id: "training", label: "Capacitación", slug: "ops/training" },
  { id: "support", label: "Soporte inicial", slug: "ops/support" },
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
  {
    id: "discover",
    number: "01",
    label: "Descubrimos",
    description: "Alineamos problema, contexto y objetivos del negocio.",
    motionHint: "Piezas dispersas: exploramos la complejidad.",
    brandLetter: null,
  },
  {
    id: "design",
    number: "02",
    label: "Diseñamos",
    description: "Definimos experiencia, flujos e interfaz antes de codear.",
    motionHint: "La J de JACODE toma forma en el cubo.",
    brandLetter: "J",
  },
  {
    id: "build",
    number: "03",
    label: "Desarrollamos",
    description: "Construimos con el stack adecuado y entregables claros.",
    motionHint: "Encendemos la A: arquitectura en código.",
    brandLetter: "A",
  },
  {
    id: "test",
    number: "04",
    label: "Probamos",
    description: "Validamos calidad, rendimiento y experiencia real.",
    motionHint: "La C de control: probamos cada encaje.",
    brandLetter: "C",
  },
  {
    id: "ship",
    number: "05",
    label: "Implementamos",
    description: "Desplegamos en producción con control y trazabilidad.",
    motionHint: "La O operativa: solución en producción.",
    brandLetter: "O",
  },
  {
    id: "evolve",
    number: "06",
    label: "Evolucionamos",
    description: "Medimos, mejoramos y escalamos la solución en el tiempo.",
    motionHint: "La E de evolución: el cubo abre espacio.",
    brandLetter: "E",
  },
];

export const whyItems: WhyItem[] = [
  {
    id: "complexity",
    title: "Complejidad",
    description:
      "Entendemos problemas tecnológicos complejos y los traducimos en decisiones claras.",
    tag: "Análisis",
    accent: "#ff006e",
  },
  {
    id: "strategy",
    title: "Estrategia",
    description:
      "No desarrollamos por desarrollar: primero entendemos el negocio y el impacto.",
    tag: "Dirección",
    accent: "#ff006e",
  },
  {
    id: "tech",
    title: "Tecnología",
    description:
      "Elegimos las herramientas adecuadas para cada solución, sin modas ni atajos.",
    tag: "Ingeniería",
    accent: "#ff006e",
  },
  {
    id: "results",
    title: "Resultados",
    description:
      "Creamos tecnología útil, funcional y escalable que se sostiene en producción.",
    tag: "Impacto",
    accent: "#ff006e",
  },
];
