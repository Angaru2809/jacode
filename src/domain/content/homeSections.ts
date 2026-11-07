/** Índices visuales de capítulos en Home (01–06, sin saltos). */
export const homeSectionIndex = {
  situations: "01",
  services: "02",
  stack: "03",
  process: "04",
  modes: "05",
  impulsamos: "06",
} as const;

/**
 * Capítulos enlazados en el menú (01–06). Contacto va al CTA «Hablemos»; cierre (#cierre) sin ítem.
 */
export const homeNavSections = [
  { href: "#situaciones", label: "Situaciones", index: homeSectionIndex.situations },
  { href: "#que-hacemos", label: "Qué hacemos", index: homeSectionIndex.services },
  { href: "#stack", label: "Tecnología", index: homeSectionIndex.stack },
  { href: "#proceso", label: "Proceso", index: homeSectionIndex.process },
  { href: "#modalidades", label: "Modalidades", index: homeSectionIndex.modes },
  { href: "#impulsamos", label: "Hazlo visible", index: homeSectionIndex.impulsamos },
] as const;
