import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost";
type Size = "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  children: ReactNode;
  showEnter?: boolean;
  showArrow?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  showEnter,
  showArrow,
  className = "",
  ...rest
}: ButtonProps) {
  const classes = [
    "btn",
    `btn-${variant}`,
    size === "lg" ? "btn-lg" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {children}
      {showEnter ? <span className="btn-enter" aria-hidden="true" /> : null}
      {showArrow ? <span className="btn-arrow">→</span> : null}
    </>
  );

  if (href) {
    return (
      <a className={classes} href={href} {...(rest as object)}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
