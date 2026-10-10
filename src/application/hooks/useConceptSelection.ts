import { useCallback, useState } from "react";
import type { ConceptItem } from "@domain/models/types";
import { concepts } from "@domain/content/concepts";
import { conceptIndexForCubie } from "@domain/cube/geometry";

export function useConceptSelection(initialId = "idea") {
  const initial =
    concepts.find((c) => c.id === initialId) ?? concepts[0];
  const [active, setActive] = useState<ConceptItem>(initial);
  const [moduleIndex, setModuleIndex] = useState(0);

  const selectById = useCallback((id: string) => {
    const concept = concepts.find((c) => c.id === id);
    if (!concept) return;
    const index = concepts.findIndex((c) => c.id === id);
    setActive(concept);
    setModuleIndex(index);
  }, []);

  const selectByModule = useCallback((index: number) => {
    const conceptIdx = conceptIndexForCubie(index);
    const concept = concepts[conceptIdx] ?? concepts[0];
    setActive(concept);
    setModuleIndex(conceptIdx);
  }, []);

  return { active, moduleIndex, selectById, selectByModule, concepts };
}
