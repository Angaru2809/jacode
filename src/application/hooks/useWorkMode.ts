import { useCallback, useState } from "react";
import type { WorkModeId } from "@domain/models/types";
import { workModes } from "@domain/content/process";

export function useWorkMode(initial: WorkModeId = "proyecto") {
  const [activeId, setActiveId] = useState<WorkModeId>(initial);
  const active = workModes.find((m) => m.id === activeId) ?? workModes[0];

  const select = useCallback((id: WorkModeId) => setActiveId(id), []);

  return { activeId, active, modes: workModes, select };
}
