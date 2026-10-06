import { Link } from "react-router-dom";
import { brand } from "@domain/content/brand";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img
            src={brand.logoSrc}
            alt={brand.name}
            width={140}
            height={42}
          />
          <p>{brand.tagline}</p>
        </div>
        <p className="footer-tagline">{brand.secondaryLine}</p>
        <div className="footer-meta">
          <Link to="/cotizacion">Plantilla de cotización</Link>
          <span>© {year} {brand.name}</span>
        </div>
      </div>
    </footer>
  );
}
