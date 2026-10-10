import { useMotionPreference } from "@app/providers/MotionProvider";

export function MotionFab() {
  const { reducedMotion, userPreferReduce, toggleReduceMotion } =
    useMotionPreference();

  const on = !(userPreferReduce || reducedMotion);

  return (
    <button
      type="button"
      className="motion-pill motion-pill--vertical interaction-halo"
      onClick={toggleReduceMotion}
      aria-pressed={!on}
      title={on ? "Desactivar animaciones" : "Activar animaciones"}
    >
      <span className="motion-pill__text" aria-hidden="true">
        Animaciones {on ? "ON" : "OFF"}
      </span>
      <span
        className={`motion-pill__dot${on ? " is-on" : ""}`}
        aria-hidden="true"
      />
      <span className="sr-only">
        Animaciones {on ? "activadas" : "desactivadas"}
      </span>
    </button>
  );
}
