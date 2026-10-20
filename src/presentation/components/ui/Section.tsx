interface SectionHeadProps {
  index: string;
  title: string;
  lead?: string;
  titleId?: string;
  theme?: "light" | "dark";
  reveal?: boolean;
}

export function SectionHead({
  index,
  title,
  lead,
  titleId,
  theme = "light",
  reveal = true,
}: SectionHeadProps) {
  const headClass = [
    "section-head",
    reveal ? "reveal reveal-stagger" : "",
    theme === "dark" ? "section-head--on-dark" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const indexClass =
    theme === "dark"
      ? "section-index section-index--on-dark"
      : "section-index";

  return (
    <header className={headClass}>
      <span className={`${indexClass} reveal-stagger__item`} aria-hidden="true">
        {index}
      </span>
      <h2 id={titleId} className="reveal-stagger__item">{title}</h2>
      {lead ? (
        <p className="section-lead reveal-stagger__item">{lead}</p>
      ) : null}
    </header>
  );
}

interface SectionProps {
  id: string;
  className?: string;
  labelledBy?: string;
  children: React.ReactNode;
}

export function Section({ id, className = "", labelledBy, children }: SectionProps) {
  return (
    <section
      id={id}
      className={`section ${className}`.trim()}
      aria-labelledby={labelledBy}
    >
      {children}
    </section>
  );
}
