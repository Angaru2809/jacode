type VisualId = "complexity" | "strategy" | "tech" | "results";

interface WhyFeatureIllustrationProps {
  id: VisualId;
  animate?: boolean;
}

type CubieColors = { top: string; left: string; right: string };

function IsoCubie({
  x,
  y,
  colors,
  className,
  scale = 1,
}: {
  x: number;
  y: number;
  colors: CubieColors;
  className?: string;
  scale?: number;
}) {
  const s = scale;
  return (
    <g className={className} transform={`translate(${x} ${y}) scale(${s})`}>
      <polygon points="0,14 12,7 24,14 12,21" fill={colors.top} />
      <polygon points="0,14 12,21 12,35 0,28" fill={colors.left} />
      <polygon points="12,7 24,14 24,28 12,35" fill={colors.right} />
      <polygon
        points="0,14 12,7 24,14 12,21"
        fill="none"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="0.6"
      />
    </g>
  );
}

const MAGENTA: CubieColors = { top: "#ff2b8c", left: "#c40066", right: "#ff006e" };
const WHITE: CubieColors = { top: "#ffffff", left: "#e6e6ea", right: "#f2f2f4" };
const DARK: CubieColors = { top: "#2a2a2e", left: "#080808", right: "#121212" };
const CHARCOAL: CubieColors = { top: "#3a3a40", left: "#1a1a1e", right: "#2a2a2e" };

export function WhyFeatureIllustration({ id, animate = true }: WhyFeatureIllustrationProps) {
  const uid = id;
  const sceneClass = `why-feature-scene why-feature-scene--${id}${animate ? " is-animated" : ""}`;

  switch (id) {
    case "complexity":
      return (
        <svg viewBox="0 0 220 180" className={`why-feature-art ${sceneClass}`} aria-hidden>
          <defs>
            <radialGradient id={`${uid}-core`} cx="50%" cy="55%" r="45%">
              <stop offset="0%" stopColor="#ff006e" stopOpacity="0.75" />
              <stop offset="55%" stopColor="#ff006e" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#ff006e" stopOpacity="0" />
            </radialGradient>
            <filter id={`${uid}-blur`} x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="8" />
            </filter>
          </defs>
          <ellipse
            className="why-scene__glow"
            cx="118"
            cy="92"
            rx="78"
            ry="52"
            fill={`url(#${uid}-core)`}
            filter={`url(#${uid}-blur)`}
          />
          <g className="why-scene__core">
            <IsoCubie x={98} y={68} colors={MAGENTA} scale={1.15} />
          </g>
          <g className="why-scene__piece why-scene__piece--1">
            <IsoCubie x={58} y={52} colors={WHITE} />
          </g>
          <g className="why-scene__piece why-scene__piece--2">
            <IsoCubie x={132} y={48} colors={DARK} />
          </g>
          <g className="why-scene__piece why-scene__piece--3">
            <IsoCubie x={44} y={88} colors={DARK} />
          </g>
          <g className="why-scene__piece why-scene__piece--4">
            <IsoCubie x={78} y={98} colors={MAGENTA} scale={0.85} />
          </g>
          <g className="why-scene__piece why-scene__piece--5">
            <IsoCubie x={118} y={102} colors={CHARCOAL} />
          </g>
          <g className="why-scene__piece why-scene__piece--6">
            <IsoCubie x={152} y={78} colors={WHITE} scale={0.9} />
          </g>
          <g className="why-scene__piece why-scene__piece--7">
            <IsoCubie x={168} y={108} colors={MAGENTA} scale={0.75} />
          </g>
          <g className="why-scene__piece why-scene__piece--8">
            <IsoCubie x={62} y={118} colors={WHITE} scale={0.7} />
          </g>
        </svg>
      );

    case "strategy": {
      const routePath = "M 44 128 L 94 98 L 144 68 L 184 38";
      return (
        <svg viewBox="0 0 220 180" className={`why-feature-art ${sceneClass}`} aria-hidden>
          <defs>
            <linearGradient id={`${uid}-path`} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff006e" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#ff2b8c" />
            </linearGradient>
            <filter id={`${uid}-dot-glow`}>
              <feGaussianBlur stdDeviation="2" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d={routePath}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="why-scene__route"
            d={routePath}
            fill="none"
            stroke={`url(#${uid}-path)`}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g className="why-scene__step why-scene__step--1">
            <ellipse cx="56" cy="134" rx="18" ry="6" fill="rgba(255,0,110,0.12)" />
            <IsoCubie x={32} y={108} colors={DARK} scale={0.92} />
          </g>
          <g className="why-scene__step why-scene__step--2">
            <ellipse cx="106" cy="104" rx="18" ry="6" fill="rgba(255,0,110,0.12)" />
            <IsoCubie x={82} y={78} colors={CHARCOAL} scale={0.92} />
          </g>
          <g className="why-scene__step why-scene__step--3">
            <ellipse cx="156" cy="74" rx="18" ry="6" fill="rgba(255,0,110,0.12)" />
            <IsoCubie x={132} y={48} colors={DARK} scale={0.92} />
          </g>
          <g className="why-scene__target">
            <circle className="why-scene__target-ring" cx="196" cy="50" r="24" fill="rgba(255,0,110,0.14)" />
            <circle cx="196" cy="50" r="15" fill="none" stroke="#ff006e" strokeWidth="2" />
            <IsoCubie x={184} y={34} colors={MAGENTA} scale={0.88} />
          </g>
          {animate ? (
            <circle className="why-scene__traveler" r="5" fill="#ffffff" filter={`url(#${uid}-dot-glow)`}>
              <animateMotion
                dur="5s"
                repeatCount="indefinite"
                calcMode="linear"
                path={routePath}
              />
            </circle>
          ) : null}
        </svg>
      );
    }

    case "tech":
      return (
        <svg viewBox="0 0 220 180" className={`why-feature-art ${sceneClass}`} aria-hidden>
          <defs>
            <radialGradient id={`${uid}-halo`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff006e" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#ff006e" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="112" cy="90" r="48" fill={`url(#${uid}-halo)`} className="why-scene__glow" />
          <g className="why-scene__hub">
            <IsoCubie x={98} y={72} colors={MAGENTA} scale={1.2} />
          </g>
          <g className="why-scene__orbit why-scene__orbit--1">
            <g transform="translate(38 42)">
              <rect x="0" y="0" width="36" height="36" rx="8" fill="#0a0a0a" stroke="rgba(255,0,110,0.4)" strokeWidth="1.2" />
              <text x="18" y="23" textAnchor="middle" fill="#fff" fontSize="13" fontFamily="monospace">
                {"{}"}
              </text>
            </g>
          </g>
          <g className="why-scene__orbit why-scene__orbit--2">
            <g transform="translate(158 38)">
              <rect x="0" y="0" width="36" height="36" rx="8" fill="#0a0a0a" stroke="rgba(255,0,110,0.4)" strokeWidth="1.2" />
              <path d="M10 22 Q18 12 26 22" fill="none" stroke="#fff" strokeWidth="1.5" />
              <path d="M12 18 L18 14 L24 18" fill="none" stroke="#ff006e" strokeWidth="1.2" />
            </g>
          </g>
          <g className="why-scene__orbit why-scene__orbit--3">
            <g transform="translate(32 118)">
              <rect x="0" y="0" width="36" height="36" rx="8" fill="#0a0a0a" stroke="rgba(255,0,110,0.4)" strokeWidth="1.2" />
              <rect x="10" y="12" width="16" height="14" rx="2" fill="none" stroke="#fff" strokeWidth="1.2" />
              <line x1="13" y1="16" x2="23" y2="16" stroke="#ff006e" strokeWidth="1" />
              <line x1="13" y1="20" x2="21" y2="20" stroke="#ff006e" strokeWidth="1" />
            </g>
          </g>
          <g className="why-scene__orbit why-scene__orbit--4">
            <g transform="translate(152 112)">
              <rect x="0" y="0" width="36" height="36" rx="8" fill="#0a0a0a" stroke="rgba(255,0,110,0.4)" strokeWidth="1.2" />
              <IsoCubie x={6} y={4} colors={WHITE} scale={0.55} />
            </g>
          </g>
        </svg>
      );

    case "results": {
      const trendPath = "M 48 118 L 82 96 L 118 104 L 152 68 L 192 48";
      return (
        <svg viewBox="0 0 220 180" className={`why-feature-art ${sceneClass}`} aria-hidden>
          <defs>
            <linearGradient id={`${uid}-bar`} x1="0" y1="100%" x2="0" y2="0%">
              <stop offset="0%" stopColor="#c40066" />
              <stop offset="100%" stopColor="#ff006e" />
            </linearGradient>
            <linearGradient id={`${uid}-trend`} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff006e" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#ff4d9a" />
            </linearGradient>
            <filter id={`${uid}-trend-glow`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <marker
              id={`${uid}-arrow`}
              markerWidth="10"
              markerHeight="10"
              refX="7"
              refY="5"
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill="#ff006e" />
            </marker>
          </defs>
          <ellipse
            className="why-scene__glow"
            cx="118"
            cy="118"
            rx="72"
            ry="40"
            fill="rgba(255,0,110,0.14)"
          />
          <ellipse cx="118" cy="152" rx="70" ry="8" fill="rgba(255,0,110,0.16)" />
          <line
            x1="36"
            y1="138"
            x2="200"
            y2="138"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <g className="why-scene__bars">
            <g className="why-scene__bar why-scene__bar--1" transform="translate(44 138)">
              <rect
                x="0"
                y="-40"
                width="26"
                height="40"
                rx="4"
                fill="#35353c"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1"
              />
            </g>
            <g className="why-scene__bar why-scene__bar--2" transform="translate(78 138)">
              <rect
                x="0"
                y="-54"
                width="26"
                height="54"
                rx="4"
                fill="#45454f"
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="1"
              />
            </g>
            <g className="why-scene__bar why-scene__bar--3" transform="translate(112 138)">
              <rect
                x="0"
                y="-46"
                width="26"
                height="46"
                rx="4"
                fill="#f0f0f4"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="1"
              />
            </g>
            <g className="why-scene__bar why-scene__bar--4" transform="translate(146 138)">
              <rect
                className="why-scene__bar-accent"
                x="0"
                y="-76"
                width="26"
                height="76"
                rx="4"
                fill={`url(#${uid}-bar)`}
                stroke="#ff4d9a"
                strokeWidth="1"
              />
            </g>
          </g>
          <path
            className="why-scene__trend why-scene__trend--ghost"
            d={trendPath}
            fill="none"
            stroke="rgba(255,0,110,0.25)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="why-scene__trend"
            d={trendPath}
            fill="none"
            stroke={`url(#${uid}-trend)`}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            markerEnd={`url(#${uid}-arrow)`}
            filter={`url(#${uid}-trend-glow)`}
          />
          <circle className="why-scene__peak" cx="152" cy="68" r="5" fill="#ffffff" />
        </svg>
      );
    }

    default:
      return null;
  }
}
