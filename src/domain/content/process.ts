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
    description:
      "Escuchamos tu contexto, aclaramos la necesidad y acordamos qué éxito significa para el negocio.",
  },
  {
    id: "planning",
    number: "02",
    phase: "plan",
    title: "Planeación",
    description:
      "Priorizamos alcance, hitos y riesgos para que sepas qué se construye primero y por qué.",
  },
  {
    id: "design",
    number: "03",
    phase: "plan",
    title: "Diseño",
    description:
      "Prototipamos flujos e interfaz contigo antes de comprometer desarrollo costoso.",
  },
  {
    id: "development",
    number: "04",
    phase: "build",
    title: "Desarrollo",
    description:
      "Implementamos con arquitectura clara, revisiones frecuentes y código listo para evolucionar.",
  },
  {
    id: "testing",
    number: "05",
    phase: "build",
    title: "Pruebas",
    description:
      "Comprobamos casos reales, datos y experiencia de uso antes de abrir a producción.",
  },
  {
    id: "implementation",
    number: "06",
    phase: "ship",
    title: "Implementación",
    description:
      "Desplegamos, conectamos entornos y dejamos la solución operando con monitoreo básico.",
  },
  {
    id: "delivery",
    number: "07",
    phase: "ship",
    title: "Entrega",
    description:
      "Transferimos accesos, documentación y conocimiento para que tu equipo pueda operar y crecer.",
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
    subtitle: "Alcance cerrado · entregables acordados",
    description:
      "Para empresas que necesitan una solución definida, con objetivos claros desde el inicio.",
    flow: ["Alcance", "Desarrollo", "Pruebas", "Entrega"],
  },
  {
    id: "evolutivo",
    title: "Evolutivo",
    subtitle: "Producto vivo · mejora continua",
    description:
      "Para equipos que incorporan funcionalidades y avanzan con datos reales después del lanzamiento.",
    flow: ["Idea", "MVP", "Mejoras", "Nuevas funcionalidades"],
    featured: true,
  },
  {
    id: "fases",
    title: "Por fases",
    subtitle: "Grandes builds · entregas progresivas",
    description:
      "Para organizaciones que construyen de forma progresiva, controlando prioridades y hitos.",
    flow: ["Fase 01", "Fase 02", "Fase 03", "Fase 04"],
  },
];

export const journeyStages: JourneyStage[] = [
  {
    id: "discover",
    number: "01",
    label: "Descubrimos",
    description:
      "Workshops y preguntas concretas para ver el panorama completo antes de comprometer alcance.",
    motionHint: "Mapeo de contexto y prioridades.",
    brandLetter: "J",
    pillars: ["Contexto", "Prioridades"],
  },
  {
    id: "design",
    number: "02",
    label: "Diseñamos",
    description:
      "Flujos clicables y pantallas que validas con tu equipo; el producto se siente antes de programarlo.",
    motionHint: "Prototipo y validación con usuarios.",
    brandLetter: "A",
    pillars: ["Prototipo", "Validación"],
  },
  {
    id: "build",
    number: "03",
    label: "Desarrollamos",
    description:
      "Elegimos stack, arquitectura y ritmo de entrega. Código modular listo para crecer.",
    motionHint: "Iteración continua con calidad.",
    brandLetter: "C",
    pillars: ["Stack", "Código"],
  },
  {
    id: "test",
    number: "04",
    label: "Probamos",
    description:
      "Escenarios reales, permisos y datos de prueba — nada sale a producción sin pasar por aquí.",
    motionHint: "Control de calidad y datos.",
    brandLetter: "O",
    pillars: ["QA", "Seguridad"],
  },
  {
    id: "ship",
    number: "05",
    label: "Desplegamos",
    description:
      "Go-live acompañado: despliegue, conexiones y handoff para que operaciones no queden a ciegas.",
    motionHint: "Deploy estable y trazabilidad.",
    brandLetter: "D",
    pillars: ["Deploy", "Handoff"],
  },
  {
    id: "evolve",
    number: "06",
    label: "Entregamos",
    description:
      "Transferimos accesos, documentación y operación en producción; la evolución se planifica como etapas futuras.",
    motionHint: "Handoff claro y evolución futura.",
    brandLetter: "E",
    pillars: ["Entrega", "Evolución"],
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
