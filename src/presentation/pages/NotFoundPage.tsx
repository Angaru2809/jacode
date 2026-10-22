import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { useMotionPreference } from "@app/providers/MotionProvider";
import { brand } from "@domain/content/brand";

function BackArrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M11 4 6 9l5 5M6 9h8"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function NotFoundPage() {
  const { reducedMotion } = useMotionPreference();

  return (
    <main
      className={`jacode-404${reducedMotion ? " is-static" : ""}`}
      aria-labelledby="not-found-title"
    >
      <div className="jacode-404__ambient" aria-hidden="true">
        <span className="jacode-404__orb jacode-404__orb--a" />
        <span className="jacode-404__orb jacode-404__orb--b" />
      </div>

      <div className="jacode-404__layout">
        <div className="jacode-404__copy">
          <p className="jacode-404__tag">ERROR 404</p>
          <p className="jacode-404__code" aria-hidden="true">
            404
          </p>
          <h1 id="not-found-title" className="jacode-404__title">
            <span className="jacode-404__title-line">Parece que estás</span>
            <span className="jacode-404__title-accent">perdido.</span>
          </h1>
          <p className="jacode-404__lead">
            Esta ruta no existe o ya no está disponible. No te preocupes, te ayudamos a
            volver al camino correcto.
          </p>
          <Link to="/" className="jacode-404__cta">
            <BackArrow />
            <span>Volver al inicio</span>
          </Link>
          <p className="jacode-404__cta-hint">Haz clic para regresar a la ruta principal</p>
        </div>

        <div className="jacode-404__visual" aria-hidden="true">
          <svg className="jacode-404__paths" viewBox="0 0 420 320" fill="none">
            <defs>
              <linearGradient id="jacode404-path" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff008c" stopOpacity="0.2" />
                <stop offset="45%" stopColor="#ff008c" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#ff008c" stopOpacity="0.35" />
              </linearGradient>
            </defs>
            <path
              className="jacode-404__path jacode-404__path--broken"
              d="M40 260 C120 260, 140 180, 200 160 S 280 120, 340 100"
            />
            <path
              className="jacode-404__path jacode-404__path--fork"
              d="M200 160 L200 80"
            />
            <path
              className="jacode-404__path jacode-404__path--return"
              d="M200 160 C240 200, 300 240, 380 260"
            />
            <circle className="jacode-404__portal" cx="380" cy="260" r="6" />
          </svg>

          <div className="jacode-404__particles">
            {Array.from({ length: 8 }, (_, i) => (
              <span key={i} className="jacode-404__particle" style={{ "--p-i": i } as CSSProperties} />
            ))}
          </div>

          <div className="jacode-404__mascot-stage">
            <img
              className="jacode-404__mascot"
              src={brand.notFoundMascotSrc}
              alt=""
              width={340}
              height={340}
              decoding="async"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
