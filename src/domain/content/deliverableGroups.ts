import { deliverables } from "@domain/content/process";
import type { DeliverableItem } from "@domain/models/types";

export interface DeliverableGroup {
  id: string;
  label: string;
  hint: string;
  ids: string[];
}

export const deliverableGroups: DeliverableGroup[] = [
  {
    id: "experience",
    label: "Experiencia",
    hint: "Definición visual y validación temprana",
    ids: ["uiux", "proto"],
  },
  {
    id: "product",
    label: "Producto",
    hint: "Lo que corre en producción",
    ids: ["source", "app", "db", "api"],
  },
  {
    id: "quality",
    label: "Calidad y operación",
    hint: "Confianza al entregar y operar",
    ids: ["docs", "manual", "qa", "deploy", "training", "support"],
  },
];

export function deliverablesByGroup(): {
  group: DeliverableGroup;
  items: DeliverableItem[];
}[] {
  const map = new Map(deliverables.map((d) => [d.id, d]));
  return deliverableGroups.map((group) => ({
    group,
    items: group.ids
      .map((id) => map.get(id))
      .filter((d): d is DeliverableItem => Boolean(d)),
  }));
}
