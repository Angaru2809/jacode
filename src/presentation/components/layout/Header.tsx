import { useEffect, useId, useState } from "react";
import { Link } from "react-router-dom";
import { brand, navLinks } from "@domain/content/brand";
import { useScrolled } from "@application/hooks/useScrolled";
import { useMotionPreference } from "@app/providers/MotionProvider";

export function Header() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const { reducedMotion, userPreferReduce, toggleReduceMotion } =
    useMotionPreference();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`} id="top">
      <div className="header-inner">
        <Link className="brand" to="/" aria-label={`${brand.name} — inicio`}>
          <img
            src={brand.logoSrc}
            alt={brand.name}
            className="brand-logo"
            width={160}
            height={48}
          />
        </Link>

        <nav
          id={menuId}
          className={`nav${open ? " is-open" : ""}`}
          aria-label="Principal"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={link.cta ? "nav-cta" : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            className="nav-motion"
            onClick={toggleReduceMotion}
            aria-pressed={userPreferReduce || reducedMotion}
            title="Reducir animaciones"
          >
            {reducedMotion ? "Animaciones: off" : "Animaciones: on"}
          </button>
        </nav>

        <button
          className="nav-toggle"
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
