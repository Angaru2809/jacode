interface ProblemNeedIconProps {
  id: string;
}

export function ProblemNeedIcon({ id }: ProblemNeedIconProps) {
  switch (id) {
    case "manual":
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <rect x="5" y="4" width="14" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8 9h8M8 12h6M8 15h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "digital":
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <path
            d="M6 8V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2M5 8h14v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M9 13h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "connect":
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <circle cx="6" cy="12" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="18" cy="7" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="18" cy="17" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8.4 11.2 15.2 8.2M8.4 12.8l6.8 3" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden>
          <path
            d="M12 4 5 7v5c0 4 3 6.5 7 8 4-1.5 7-4 7-8V7l-7-3Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M9 12.5 11 14.5 15 10.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
  }
}
