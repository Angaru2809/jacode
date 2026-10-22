import { brand } from "@domain/content/brand";

export function BrandMark() {
  return (
    <span className="brand-mark">
      <img
        className="brand-mark__logo brand-mark__logo--on-light"
        src={brand.logoSrc}
        alt={brand.name}
        width={196}
        height={54}
        decoding="async"
      />
      <img
        className="brand-mark__logo brand-mark__logo--on-dark"
        src={brand.logoSrcOnDark}
        alt=""
        aria-hidden="true"
        width={196}
        height={54}
        decoding="async"
      />
    </span>
  );
}
