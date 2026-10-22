/** Domain models — pure types, no UI or framework deps */

export type StoryState =
  | "scrambled"
  | "aligning"
  | "intervening"
  | "ordered"
  | "solution";

export type WorkModeId = "proyecto" | "evolutivo" | "fases";

export type ServiceIconKind =
  | "terminal"
  | "browser"
  | "mobile"
  | "ai"
  | "automation"
  | "integration";

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortLabel: string;
  description: string;
  pieceClass: string;
  coverImage: string;
  icon: ServiceIconKind;
}

export interface ConceptItem {
  id: string;
  title: string;
  text: string;
}

export type ProcessPhaseId = "discover" | "plan" | "build" | "ship";

export interface ProcessPhase {
  id: ProcessPhaseId;
  label: string;
  summary: string;
}

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  phase: ProcessPhaseId;
}

export interface DeliverableItem {
  id: string;
  label: string;
  /** Ruta / chip retro en la tarjeta */
  slug: string;
}

export interface WorkMode {
  id: WorkModeId;
  title: string;
  /** Línea bajo el título (ej. alcance, ritmo) */
  subtitle: string;
  description: string;
  flow: string[];
  /** Tarjeta central destacada */
  featured?: boolean;
}

export type JourneyStepId =
  | "discover"
  | "design"
  | "build"
  | "test"
  | "ship"
  | "evolve";

export interface JourneyStage {
  id: JourneyStepId;
  number: string;
  label: string;
  description: string;
  /** Breve metáfora del movimiento del cubo en esta etapa */
  motionHint: string;
  /** Letra de JACODE que se enciende en el cubo */
  brandLetter: string | null;
  /** Capas de trabajo en esta estación (sin repetir otras secciones) */
  pillars: string[];
}

export interface WhyItem {
  id: string;
  title: string;
  description: string;
  tag: string;
  accent: string;
}

export interface ClientNeedSignal {
  id: string;
  label: string;
}

export interface ClientNeed {
  id: string;
  title: string;
  hint: string;
  help: string;
  signals: ClientNeedSignal[];
  watermark: string;
}

export interface NavLink {
  href: string;
  label: string;
  cta?: boolean;
}

export interface CubePose {
  x: number;
  y: number;
  z: number;
  rx?: number;
  ry?: number;
  rz?: number;
}
