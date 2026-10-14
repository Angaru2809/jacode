import type { CSSProperties, ReactNode } from "react";

const VARIANTS = ["magenta", "light", "dark"] as const;
export type FolderTabVariant = (typeof VARIANTS)[number];

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M4 14L14 4M14 4H6M14 4V12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export interface FolderTabCardProps {
  index: number;
  title: string;
  description: string;
  variant?: FolderTabVariant;
  footer?: ReactNode;
}

export function FolderTabCard({
  index,
  title,
  description,
  variant,
  footer,
}: FolderTabCardProps) {
  const number = String(index + 1).padStart(2, "0");
  const tone = variant ?? VARIANTS[index % VARIANTS.length];

  return (
    <article
      className={`folder-card folder-card--${tone} reveal`}
      style={{ "--folder-stagger": index } as CSSProperties}
    >
      <div className="folder-card__visual" aria-hidden="true">
        <span className="folder-card__watermark">{number}</span>
      </div>
      <div className="folder-card__sheet">
        <div className="folder-card__tab" aria-hidden="true" />
        <div className="folder-card__content">
          <div className="folder-card__meta">
            <span className="folder-card__index">{number}</span>
            <span className="folder-card__arrow">
              <ArrowIcon />
            </span>
          </div>
          <h3>{title}</h3>
          <p>{description}</p>
          {footer ? <div className="folder-card__footer">{footer}</div> : null}
        </div>
      </div>
    </article>
  );
}
