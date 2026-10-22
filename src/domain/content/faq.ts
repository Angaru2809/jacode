export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqIntro = {
  title: "¿Qué problema quieres convertir en una solución?",
  accent: "Cuéntanos tu idea.",
  lead:
    "Antes de hablar de stack o plazos, alineamos el reto. Estas respuestas suelen aclarar cómo trabajamos contigo.",
} as const;

export const faqItems: FaqItem[] = [
  {
    id: "start",
    question: "¿Necesito tener todo definido antes de contactarlos?",
    answer:
      "No. Basta con una necesidad clara o una hipótesis de producto. En descubrimiento ayudamos a convertir la idea en alcance, prioridades y entregables medibles.",
  },
  {
    id: "scope",
    question: "¿Qué tipo de proyectos desarrollan?",
    answer:
      "Software a medida, plataformas web, apps móviles, integraciones, automatización e IA aplicada. El stack y la modalidad se eligen según el problema, no al revés.",
  },
  {
    id: "time",
    question: "¿Cuánto tarda un proyecto?",
    answer:
      "Depende del alcance acordado. Trabajamos por fases con hitos visibles: prototipo, MVP o solución completa. En la cotización verás tiempos orientativos por entrega.",
  },
  {
    id: "deliver",
    question: "¿Qué recibo al final?",
    answer:
      "Código, documentación, despliegue y capacitación según el paquete. En la sección de entregables puedes ver las piezas típicas; el alcance final se define contigo.",
  },
  {
    id: "support",
    question: "¿Pueden evolucionar el producto después del lanzamiento?",
    answer:
      "Sí. Muchos clientes continúan en modalidad evolutiva: mejoras, nuevas funciones, integraciones y optimización con datos reales.",
  },
];
