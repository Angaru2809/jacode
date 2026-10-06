/** Domain models — pure types, no UI or framework deps */

export type StoryState = "scrambled" | "intervening" | "ordered" | "solution";

export type WorkModeId = "proyecto" | "evolutivo" | "fases";

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  pieceClass: string;
}

export interface ConceptItem {
  id: string;
  title: string;
  text: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface DeliverableItem {
  id: string;
  label: string;
}

export interface WorkMode {
  id: WorkModeId;
  title: string;
  description: string;
  flow: string[];
}

export interface JourneyStage {
  id: string;
  number: string;
  label: string;
}

export interface WhyItem {
  id: string;
  title: string;
  description: string;
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
