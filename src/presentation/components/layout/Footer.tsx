import { Link } from "react-router-dom";
import { brand } from "@domain/content/brand";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img
            className="footer-brand__logo"
            src={brand.logoSrc}
            alt={brand.name}
            width={148}
            height={40}
            decoding="async"
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
