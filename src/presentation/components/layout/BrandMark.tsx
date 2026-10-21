import { brand } from "@domain/content/brand";

export function BrandMark() {
  return (
    <span className="brand-mark">
      <span className="brand-mark__glyph" aria-hidden="true">
        <span className="brand-mark__cell brand-mark__cell--tall" />
        <span className="brand-mark__cell brand-mark__cell--accent" />
        <span className="brand-mark__cell" />
      </span>
      <span className="brand-mark__text">{brand.name}</span>
    </span>
  );
}
