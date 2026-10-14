type ProcessStepIconProps = {
  stepId: string;
};

export function ProcessStepIcon({ stepId }: ProcessStepIconProps) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 20 20",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true as const,
  };

  switch (stepId) {
    case "discovery":
      return (
        <svg {...common}>
          <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "planning":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7 7H13M7 10H13M7 13H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "design":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7 14L10 17L13 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "development":
      return (
        <svg {...common}>
          <path
            d="M7 6L3 10L7 14M13 6L17 10L13 14M11 4L9 16"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "testing":
      return (
        <svg {...common}>
          <path
            d="M6 10L9 13L14 7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="3" y="3" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "implementation":
      return (
        <svg {...common}>
          <path d="M4 14V8L10 4L16 8V14" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M8 14V11H12V14" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
    case "delivery":
      return (
        <svg {...common}>
          <path
            d="M4 7H16V15H4V7Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M4 7L10 4L16 7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
  }
}
