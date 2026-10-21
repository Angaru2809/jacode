import type { CSSProperties, ReactElement } from "react";
import type { ConceptItem } from "@domain/models/types";

const ICONS: Record<string, () => ReactElement> = {
  idea: () => (
    <path
      d="M8 18v-1.5c0-2.2 1.8-4.5 4-4.5s4 2.3 4 4.5V18M12 6a3 3 0 0 1 3 3c0 1.2-.7 2.2-1.7 2.7L12 13l-1.3-1.3C9.7 11.2 9 10.2 9 9a3 3 0 0 1 3-3Z"
      stroke="currentColor"
      strokeWidth="1.4"
      fill="none"
    />
  ),
  diseno: () => (
    <path
      d="M5 16l3-9 4 4 3-5 4 10H5Z"
      stroke="currentColor"
      strokeWidth="1.4"
      fill="none"
      strokeLinejoin="round"
    />
  ),
  tecnologia: () => (
    <>
      <path d="M8 6 5 9l3 3 3-3-3-3Z" stroke="currentColor" strokeWidth="1.3" fill="none" />
      <path d="M13 11h5M13 14h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </>
  ),
  codigo: () => (
    <path d="M7 8 4 11l3 3M13 8l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  ),
  datos: () => (
    <>
      <path d="M6 14V8l6-3 6 3v6" stroke="currentColor" strokeWidth="1.3" fill="none" />
      <path d="M9 11v3M12 10v4M15 11v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </>
  ),
  ia: () => (
    <path
      d="M8 7c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4M6 17c.8-2.5 2.8-4 6-4s5.2 1.5 6 4"
      stroke="currentColor"
      strokeWidth="1.3"
      fill="none"
    />
  ),
  integracion: () => (
    <path
      d="M7 10h6M10 7v6M14 14l4-4M14 10l4 4"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  ),
  resultado: () => (
    <path
      d="M7 11.5 9.5 14 15 8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
};

interface EnfoqueOrbitVizProps {
  concepts: ConceptItem[];
  activeId: string;
  activeIndex: number;
  onSelect: (id: string) => void;
  reducedMotion: boolean;
}

export function EnfoqueOrbitViz({
  concepts,
  activeId,
  activeIndex,
  onSelect,
  reducedMotion,
}: EnfoqueOrbitVizProps) {
  const orbitSpin = activeIndex * -45;

  return (
    <div
      className={`enfoque-orbit${reducedMotion ? " is-static" : ""}`}
      style={{ "--orbit-spin": `${orbitSpin}deg` } as CSSProperties}
      aria-hidden="true"
    >
      <div className="enfoque-orbit__scene">
        <div className="enfoque-orbit__floor" />
        <svg className="enfoque-orbit__links" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          {concepts.map((c, i) => {
            const a = (i / concepts.length) * Math.PI * 2 - Math.PI / 2;
            const x = 50 + 42 * Math.cos(a);
            const y = 50 + 38 * Math.sin(a);
            const active = c.id === activeId;
            return (
              <line
                key={c.id}
                x1="50"
                y1="50"
                x2={x}
                y2={y}
                className={`enfoque-orbit__link${active ? " is-active" : ""}`}
              />
            );
          })}
        </svg>

        <div className="enfoque-orbit__core">
          <div className="enfoque-orbit__core-glow" />
          <div className="enfoque-cube-3d">
            <div className="enfoque-cube-3d__shape">
              <div className="enfoque-cube-3d__face enfoque-cube-3d__face--front" />
              <div className="enfoque-cube-3d__face enfoque-cube-3d__face--back" />
              <div className="enfoque-cube-3d__face enfoque-cube-3d__face--right" />
              <div className="enfoque-cube-3d__face enfoque-cube-3d__face--left" />
              <div className="enfoque-cube-3d__face enfoque-cube-3d__face--top" />
              <div className="enfoque-cube-3d__face enfoque-cube-3d__face--bottom" />
            </div>
          </div>
        </div>

        <div className="enfoque-orbit__ring">
          {concepts.map((c, i) => {
            const active = c.id === activeId;
            const Icon = ICONS[c.id];
            return (
              <button
                key={c.id}
                type="button"
                className={`enfoque-orbit__node${active ? " is-active" : ""}`}
                style={{ "--node-i": i } as React.CSSProperties}
                onClick={() => onSelect(c.id)}
                tabIndex={-1}
              >
                <span className="enfoque-orbit__node-box">
                  <span className="enfoque-orbit__node-top" />
                  <span className="enfoque-orbit__node-face">
                    <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden>
                      {Icon?.()}
                    </svg>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
