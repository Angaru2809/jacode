interface SectionHeadProps {
  index: string;
  title: string;
  lead?: string;
  titleId?: string;
}

export function SectionHead({ index, title, lead, titleId }: SectionHeadProps) {
  return (
    <header className="section-head reveal">
      <span className="section-index" aria-hidden="true">
        {index}
      </span>
      <h2 id={titleId}>{title}</h2>
      {lead ? <p className="section-lead">{lead}</p> : null}
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
