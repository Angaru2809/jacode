import { useMotionPreference } from "@app/providers/MotionProvider";

export function MotionFab() {
  const { reducedMotion, userPreferReduce, toggleReduceMotion } =
    useMotionPreference();

  return (
    <button
      type="button"
      className="motion-fab"
      onClick={toggleReduceMotion}
      aria-pressed={userPreferReduce || reducedMotion}
      title={reducedMotion ? "Activar animaciones" : "Desactivar animaciones"}
    >
      <span className="motion-fab__dot" aria-hidden="true" />
      Animaciones
      <span className="motion-fab__state">{reducedMotion ? "Off" : "On"}</span>
    </button>
  );
}
