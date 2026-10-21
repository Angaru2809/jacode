import { ScrollSplitTitle } from "@presentation/components/ui/ScrollSplitTitle";

interface LateSectionHeadProps {
  index: string;
  plain: string;
  accent: string;
  lead?: string;
  titleId: string;
  theme?: "light" | "dark";
}

export function LateSectionHead({
  index,
  plain,
  accent,
  lead,
  titleId,
  theme = "light",
}: LateSectionHeadProps) {
  const headClass = [
    "jacode-late-head",
    "reveal",
    "reveal-stagger",
    theme === "dark" ? "jacode-late-head--on-dark" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headClass}>
      <span className="section-index reveal-stagger__item" aria-hidden="true">
        {index}
      </span>
      <ScrollSplitTitle
        id={titleId}
        plain={plain}
        accent={accent}
        className="reveal-stagger__item"
      />
      {lead ? (
        <p className="jacode-late-head__lead reveal-stagger__item">{lead}</p>
      ) : null}
    </header>
  );
}
