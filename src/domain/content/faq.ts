export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const contactSectionCopy = {
  titlePlain: "Cuéntanos qué",
  titleAccent: "necesitas.",
  lead: "Te ayudamos a definir el siguiente paso con claridad.",
  faqTitle: "Preguntas frecuentes",
} as const;

export const contactServiceOptions = [
  { value: "", label: "Servicio que necesitas" },
  { value: "software", label: "Software a medida" },
  { value: "web", label: "Desarrollo web" },
  { value: "mobile", label: "Apps móviles" },
  { value: "ai", label: "IA y automatización" },
  { value: "integration", label: "Integraciones / APIs" },
  { value: "other", label: "Otro / aún lo estoy definiendo" },
] as const;

export const contactFormCopy = {
  title: "Cuéntanos tu proyecto",
  submitLabel: "Enviar solicitud",
  consentLabel:
    "Autorizo el tratamiento de mis datos personales conforme a la Ley 1581 de 2012 y el régimen de protección de datos aplicable en Colombia.",
} as const;

export const faqIntro = {
  kicker: contactSectionCopy.faqTitle,
  title: contactSectionCopy.faqTitle,
  lead: "",
} as const;

export const faqItems: FaqItem[] = [
  {
    id: "ip",
    question: "¿Quién es dueño del código fuente y la propiedad intelectual?",
    answer:
      "El cliente es dueño del producto acordado en contrato. Entregamos repositorios, documentación y accesos según el alcance. Componentes de terceros y licencias se declaran en la propuesta.",
  },
  {
    id: "budget",
    question: "¿Cómo se calculan tiempos y presupuestos?",
    answer:
      "Partimos de una sesión de diagnóstico: entendemos el problema, priorizamos entregables y definimos modalidad (proyecto, evolutivo o por fases). La cotización incluye alcance, hitos, tiempos orientativos y supuestos explícitos.",
  },
  {
    id: "changes",
    question: "¿Qué pasa si los requerimientos cambian durante el proyecto?",
    answer:
      "Los cambios son normales. Gestionamos ajustes mediante backlog priorizado: evaluamos impacto en tiempo y costo, acordamos contigo y documentamos antes de desarrollar.",
  },
  {
    id: "support",
    question: "¿Cómo garantizan estabilidad y soporte tras el lanzamiento?",
    answer:
      "Incluimos pruebas, despliegue controlado y ventana de soporte inicial según el paquete. Después puedes continuar en modalidad evolutiva para mejoras, monitoreo e integraciones.",
  },
  {
    id: "integrate",
    question: "¿Pueden integrarse con nuestros sistemas actuales?",
    answer:
      "Sí. Trabajamos con APIs, bases de datos, ERPs, CRMs y herramientas internas. También construimos desde cero cuando conviene; la arquitectura se elige según tu contexto, no al revés.",
  },
];
