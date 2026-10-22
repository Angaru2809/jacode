import type { ReactNode } from "react";
import type { ServiceIconKind } from "@domain/models/types";

interface SituationTileIconProps {
  kind: ServiceIconKind;
}

export function SituationTileIcon({ kind }: SituationTileIconProps) {
  return (
    <svg
      className="situation-tile__glyph"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      {iconPaths[kind]}
    </svg>
  );
}

const iconPaths: Record<ServiceIconKind, ReactNode> = {
  browser: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" fill="none" strokeWidth="1.75" />
      <path d="M3 8.5h18" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="6.25" cy="6.5" r="0.85" fill="currentColor" />
      <circle cx="8.75" cy="6.5" r="0.85" fill="currentColor" />
      <path
        d="M8 13h8M8 16.5h5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </>
  ),
  terminal: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" fill="none" strokeWidth="1.75" />
      <path
        d="M7 11l3 3-3 3M12.5 17H16"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  mobile: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" stroke="currentColor" fill="none" strokeWidth="1.75" />
      <path d="M10.5 18.5h3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </>
  ),
  ai: (
    <>
      <path
        d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" fill="none" strokeWidth="1.75" />
    </>
  ),
  automation: (
    <>
      <path
        d="M12 3a5 5 0 015 5v1.5a2.5 2.5 0 010 5V16a5 5 0 11-10 0v-1.5a2.5 2.5 0 010-5V8a5 5 0 015-5z"
        stroke="currentColor"
        fill="none"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="9.5" cy="11" r="1" fill="currentColor" />
      <circle cx="14.5" cy="13" r="1" fill="currentColor" />
    </>
  ),
  integration: (
    <>
      <rect x="3" y="10" width="7" height="7" rx="1.5" stroke="currentColor" fill="none" strokeWidth="1.75" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" fill="none" strokeWidth="1.75" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" fill="none" strokeWidth="1.75" />
      <path
        d="M10 13.5h4M17 10v4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </>
  ),
};
