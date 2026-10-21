interface ScrollSplitTitleProps {
  id: string;
  plain: string;
  accent: string;
  className?: string;
}

export function ScrollSplitTitle({
  id,
  plain,
  accent,
  className = "",
}: ScrollSplitTitleProps) {
  return (
    <h2 id={id} className={`jacode-scroll-title ${className}`.trim()}>
      <span className="jacode-scroll-title__plain">{plain}</span>
      <span className="jacode-scroll-title__accent">{accent}</span>
    </h2>
  );
}
