import type { ServiceIconKind } from "@domain/models/types";

interface ServiceIconProps {
  kind: ServiceIconKind;
  className?: string;
}

export function ServiceIcon({ kind, className = "" }: ServiceIconProps) {
  const cls = `service-icon service-icon--${kind} ${className}`.trim();

  switch (kind) {
    case "terminal":
      return (
        <svg className={cls} viewBox="0 0 80 64" aria-hidden="true">
          <rect x="4" y="8" width="72" height="52" rx="6" fill="#1a1a1e" />
          <circle cx="14" cy="16" r="2.5" fill="#ff5f57" />
          <circle cx="22" cy="16" r="2.5" fill="#febc2e" />
          <circle cx="30" cy="16" r="2.5" fill="#28c840" />
          <path
            d="M18 38l8 6-8 6"
            stroke="#fff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M34 50h22"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "browser":
      return (
        <svg className={cls} viewBox="0 0 80 64" aria-hidden="true">
          <rect x="4" y="10" width="72" height="48" rx="6" fill="#f2f2f4" stroke="#e2e2e6" />
          <rect x="4" y="10" width="72" height="12" rx="6" fill="#efeff1" />
          <circle cx="14" cy="16" r="2" fill="#ff5f57" />
          <circle cx="22" cy="16" r="2" fill="#febc2e" />
          <circle cx="30" cy="16" r="2" fill="#28c840" />
          <rect x="14" y="30" width="52" height="4" rx="2" fill="#e2e2e6" />
          <rect x="14" y="40" width="36" height="4" rx="2" fill="#e2e2e6" />
        </svg>
      );
    case "mobile":
      return (
        <svg className={cls} viewBox="0 0 48 80" aria-hidden="true">
          <rect
            x="8"
            y="4"
            width="32"
            height="72"
            rx="6"
            fill="none"
            stroke="#1a1a1e"
            strokeWidth="2.5"
          />
          <rect x="18" y="10" width="12" height="3" rx="1.5" fill="#1a1a1e" />
          <circle cx="24" cy="68" r="3" fill="#1a1a1e" />
        </svg>
      );
    case "ai":
      return (
        <svg className={cls} viewBox="0 0 72 72" aria-hidden="true">
          <circle cx="36" cy="36" r="28" fill="#fff5fa" stroke="#ff006e" strokeWidth="2" />
          <path
            d="M36 18v12M36 42v12M18 36h12M42 36h12M24 24l8.5 8.5M39.5 39.5 48 48M48 24l-8.5 8.5M32.5 39.5 24 48"
            stroke="#ff006e"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="36" cy="36" r="6" fill="#ff006e" />
        </svg>
      );
    case "automation":
      return (
        <svg className={cls} viewBox="0 0 80 56" aria-hidden="true">
          <rect x="6" y="18" width="20" height="20" rx="4" fill="#efeff1" stroke="#d0d0d6" />
          <rect x="54" y="18" width="20" height="20" rx="4" fill="#fff5fa" stroke="#ff006e" />
          <path
            d="M26 28h12l4-6h8"
            stroke="#5c5c66"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M50 28h4" stroke="#ff006e" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "integration":
      return (
        <svg className={cls} viewBox="0 0 80 64" aria-hidden="true">
          <rect x="8" y="12" width="24" height="24" rx="4" fill="#1a1a1e" />
          <text x="20" y="28" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700">
            API
          </text>
          <rect x="48" y="12" width="24" height="24" rx="4" fill="#efeff1" stroke="#d0d0d6" />
          <path
            d="M32 24h16"
            stroke="#ff006e"
            strokeWidth="2"
            strokeDasharray="3 3"
            strokeLinecap="round"
          />
          <rect x="28" y="40" width="24" height="16" rx="3" fill="#fff5fa" stroke="#ff006e" />
        </svg>
      );
    default:
      return null;
  }
}
