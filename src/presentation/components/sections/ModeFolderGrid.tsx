import { workModes } from "@domain/content/process";
import { useInView } from "@application/hooks/useInView";
import { ModePricingCard } from "@presentation/components/sections/ModePricingCard";

export function ModePricingGrid() {
  const [ref, inView] = useInView<HTMLDivElement>({
    threshold: 0.18,
    rootMargin: "0px 0px -6% 0px",
  });

  const className = ["mode-pricing-grid", "reveal", inView ? "is-in is-awake" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={ref} className={className}>
      {workModes.map((mode, index) => (
        <ModePricingCard key={mode.id} mode={mode} index={index} />
      ))}
    </div>
  );
}
