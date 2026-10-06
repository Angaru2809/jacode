import { useCallback, useState } from "react";
import type { ConceptItem } from "@domain/models/types";
import { concepts } from "@domain/content/concepts";

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
    const concept = concepts[index % concepts.length];
    setActive(concept);
    setModuleIndex(index % concepts.length);
  }, []);

  return { active, moduleIndex, selectById, selectByModule, concepts };
}
