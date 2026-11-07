import type {
  DeliverableItem,
  JourneyStage,
  ProcessPhase,
  ProcessStep,
  WhyItem,
  WorkMode,
} from "@domain/models/types";
import { homeSectionIndex } from "@domain/content/homeSections";

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
    highlights: [
      "Workshops y entrevistas con stakeholders",
      "Mapa de problema, usuarios y restricciones",
    ],
  },
  {
    id: "planning",
    number: "02",
    phase: "plan",
    title: "Planeación",
    description:
      "Priorizamos alcance, hitos y riesgos para que sepas qué se construye primero y por qué.",
    highlights: ["Backlog priorizado y hitos", "Estimación y riesgos visibles"],
  },
  {
    id: "design",
    number: "03",
    phase: "plan",
    title: "Diseño",
    description:
      "Prototipamos flujos e interfaz contigo antes de comprometer desarrollo costoso.",
    highlights: ["Flujos y wireframes acordados", "UI alineada a marca y conversión"],
  },
  {
    id: "development",
    number: "04",
    phase: "build",
    title: "Desarrollo",
    description:
      "Implementamos con arquitectura clara, revisiones frecuentes y código listo para evolucionar.",
    highlights: ["Entregas iterativas revisables", "Código documentado y versionado"],
  },
  {
    id: "testing",
    number: "05",
    phase: "build",
    title: "Pruebas",
    description:
      "Comprobamos casos reales, datos y experiencia de uso antes de abrir a producción.",
    highlights: ["Pruebas funcionales y de regresión", "Validación con datos reales"],
  },
  {
    id: "implementation",
    number: "06",
    phase: "ship",
    title: "Implementación",
    description:
      "Desplegamos, conectamos entornos y dejamos la solución operando con monitoreo básico.",
    highlights: ["Despliegue y variables de entorno", "Monitoreo y alertas básicas"],
  },
  {
    id: "delivery",
    number: "07",
    phase: "ship",
    title: "Entrega",
    description:
      "Transferimos accesos, documentación y conocimiento para que tu equipo pueda operar y crecer.",
    highlights: ["Handoff técnico y manual de uso", "Soporte inicial acordado"],
  },
];

export const alcanceSectionCopy = {
  index: "04",
  titleLine1: "No solo entregamos",
  titleAccent: "código.",
  lead:
    "Un proceso completo para convertir complejidad en una solución clara.",
} as const;

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

export const processMethodCopy = {
  index: homeSectionIndex.process,
  titlePlain: "Así afrontamos cada proyecto.",
  titleAccent: "Seis estaciones, un solo recorrido.",
  intro: "De la primera idea a una solución que evoluciona.",
  panelCta: "Empecemos por el diagnóstico",
  panelCtaHref: "#contacto",
} as const;

export const journeyStages: JourneyStage[] = [
  {
    id: "discover",
    number: "01",
    label: "Descubrimos",
    phaseLabel: "Descubrir",
    terminalCommand: "discover",
    description:
      "Escuchamos tu contexto, aclaramos la necesidad y acordamos qué significa el éxito para tu negocio; priorizamos alcance, hitos y riesgos.",
    motionHint: "MAPEO DE CONTEXTO Y PRIORIDADES.",
    brandLetter: "J",
    pillars: ["CONTEXTO", "PRIORIDADES"],
    inThisStep: [
      "Sesión de diagnóstico",
      "Mapa de problema, clientes y restricciones",
    ],
    deliverables: ["Diagnóstico", "Propuesta de alcance", "Plan de hitos"],
  },
  {
    id: "design",
    number: "02",
    label: "Diseñamos",
    phaseLabel: "Diseñar",
    terminalCommand: "design",
    description:
      "Prototipamos flujos e interfaz contigo antes de comprometer desarrollo costoso.",
    motionHint: "PROTOTIPO Y VALIDACIÓN DE EXPERIENCIA.",
    brandLetter: "A",
    pillars: ["FLUJOS", "MARCA"],
    inThisStep: [
      "Flujos y wireframes acordados",
      "UI alineada a tu marca y pensada para vender",
    ],
    deliverables: ["Diseño UI/UX", "Prototipo"],
  },
  {
    id: "build",
    number: "03",
    label: "Desarrollamos",
    phaseLabel: "Construir",
    terminalCommand: "build",
    description:
      "Implementamos con arquitectura clara, revisiones frecuentes y código listo para evolucionar.",
    motionHint: "ITERACIÓN Y ARQUITECTURA CLARA.",
    brandLetter: "C",
    pillars: ["CÓDIGO", "REVISIONES"],
    inThisStep: [
      "Entregas iterativas revisables",
      "Código documentado y versionado",
    ],
    deliverables: [
      "Código fuente",
      "Aplicación funcional",
      "Base de datos",
      "Integraciones",
    ],
  },
  {
    id: "test",
    number: "04",
    label: "Probamos",
    phaseLabel: "Construir",
    terminalCommand: "test",
    description:
      "Comprobamos casos reales, datos y experiencia de uso antes de abrir al público.",
    motionHint: "CALIDAD ANTES DEL LANZAMIENTO.",
    brandLetter: "O",
    pillars: ["QA", "DATOS REALES"],
    inThisStep: [
      "Pruebas funcionales y de regresión",
      "Validación con datos reales",
    ],
    deliverables: ["Reporte de pruebas"],
  },
  {
    id: "ship",
    number: "05",
    label: "Desplegamos",
    phaseLabel: "Entregar",
    terminalCommand: "deploy",
    description:
      "Publicamos, conectamos entornos y dejamos la solución operando con monitoreo básico.",
    motionHint: "PRODUCCIÓN ESTABLE Y MONITOREO.",
    brandLetter: "D",
    pillars: ["DEPLOY", "MONITOREO"],
    inThisStep: [
      "Dominio, hosting y despliegue",
      "Monitoreo y alertas básicas",
    ],
    deliverables: ["Solución en producción", "Accesos configurados"],
  },
  {
    id: "evolve",
    number: "06",
    label: "Entregamos",
    phaseLabel: "Entregar",
    terminalCommand: "deliver",
    description:
      "Transferimos accesos, documentación y conocimiento para que tu equipo pueda operar y crecer.",
    motionHint: "HANDOFF Y EVOLUCIÓN FUTURA.",
    brandLetter: "E",
    pillars: ["DOCUMENTACIÓN", "SOPORTE"],
    inThisStep: ["Manual de uso y capacitación", "Soporte inicial acordado"],
    deliverables: [
      "Documentación",
      "Manual de usuario",
      "Capacitación",
      "Soporte inicial",
    ],
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
