import { useEffect, useId, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { navLinks } from "@domain/content/brand";
import { useHeaderOnDark } from "@application/hooks/useHeaderOnDark";
import { useNavSectionActive } from "@application/hooks/useNavSectionActive";
import { useScrolled } from "@application/hooks/useScrolled";
import { BrandMark } from "@presentation/components/layout/BrandMark";

export function Header() {
  const scrolled = useScrolled();
  const onDark = useHeaderOnDark();
  const [open, setOpen] = useState(false);
  const menuId = useId();

  const primaryLinks = useMemo(
    () => navLinks.filter((link) => !link.cta),
    []
  );
  const ctaLink = useMemo(() => navLinks.find((link) => link.cta), []);

  const sectionHrefs = useMemo(
    () => primaryLinks.map((link) => link.href),
    [primaryLinks]
  );
  const activeHref = useNavSectionActive(sectionHrefs);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  const headerClass = [
    "site-header",
    scrolled ? "is-scrolled" : "",
    onDark ? "is-on-dark" : "",
    open ? "is-menu-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headerClass} id="top">
      <div className="header-bar">
        <div className="header-inner">
          <Link className="brand" to="/" aria-label="JACODE — inicio">
            <BrandMark />
          </Link>

          <div className="header-nav-cluster">
            <nav
              id={menuId}
              className={`nav${open ? " is-open" : ""}`}
              aria-label="Principal"
            >
              <div className="nav-bubble">
                {primaryLinks.map((link) => {
                  const isActive = activeHref === link.href;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      className={`nav-link${isActive ? " is-active" : ""}`}
                      aria-current={isActive ? "location" : undefined}
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </div>

              {ctaLink ? (
                <a
                  href={ctaLink.href}
                  className="nav-cta nav-cta--drawer"
                  onClick={() => setOpen(false)}
                >
                  <span className="nav-cta__label">{ctaLink.label}</span>
                </a>
              ) : null}
            </nav>
          </div>

          <div className="header-end">
            {ctaLink ? (
              <a
                href={ctaLink.href}
                className="nav-cta nav-cta--bar"
                onClick={() => setOpen(false)}
              >
                <span className="nav-cta__label">{ctaLink.label}</span>
              </a>
            ) : null}

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
        </div>
      </div>
    </header>
  );
}
