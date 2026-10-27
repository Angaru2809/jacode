import type { ReactElement, ReactNode } from "react";
import type { StackLayerId } from "@domain/content/stack";

const STROKE = 1.65;

type IconProps = { size?: number };

function SvgFrame({
  size = 22,
  children,
}: {
  size?: number;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden
    >
      {children}
    </svg>
  );
}

function FrontendIcon({ size }: IconProps) {
  return (
    <SvgFrame size={size}>
      <path
        d="M9 8 6 12l3 4M15 8l3 4-3 4"
        stroke="currentColor"
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 7 11 17"
        stroke="currentColor"
        strokeWidth={STROKE}
        strokeLinecap="round"
      />
    </SvgFrame>
  );
}

function BackendIcon({ size }: IconProps) {
  return (
    <SvgFrame size={size}>
      <ellipse
        cx="12"
        cy="6.5"
        rx="6.5"
        ry="2.5"
        stroke="currentColor"
        strokeWidth={STROKE}
      />
      <path
        d="M5.5 6.5v4c0 1.38 2.91 2.5 6.5 2.5s6.5-1.12 6.5-2.5v-4"
        stroke="currentColor"
        strokeWidth={STROKE}
      />
      <path
        d="M5.5 10.5v4c0 1.38 2.91 2.5 6.5 2.5s6.5-1.12 6.5-2.5v-4"
        stroke="currentColor"
        strokeWidth={STROKE}
      />
    </SvgFrame>
  );
}

function IntegrationsIcon({ size }: IconProps) {
  return (
    <SvgFrame size={size}>
      <circle cx="6" cy="12" r="2.25" stroke="currentColor" strokeWidth={STROKE} />
      <circle cx="18" cy="7" r="2.25" stroke="currentColor" strokeWidth={STROKE} />
      <circle cx="18" cy="17" r="2.25" stroke="currentColor" strokeWidth={STROKE} />
      <path
        d="M8.1 11.2 15.2 8.2M8.1 12.8l7.1 3"
        stroke="currentColor"
        strokeWidth={STROKE}
        strokeLinecap="round"
      />
    </SvgFrame>
  );
}

function CmsIcon({ size }: IconProps) {
  return (
    <SvgFrame size={size}>
      <path
        d="M5 8h14v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8z"
        stroke="currentColor"
        strokeWidth={STROKE}
        strokeLinejoin="round"
      />
      <path
        d="M5 8V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2"
        stroke="currentColor"
        strokeWidth={STROKE}
        strokeLinejoin="round"
      />
      <path
        d="M8 12h8M8 15h5"
        stroke="currentColor"
        strokeWidth={STROKE}
        strokeLinecap="round"
      />
    </SvgFrame>
  );
}

const ICONS: Record<
  StackLayerId,
  (props: IconProps) => ReactElement
> = {
  frontend: FrontendIcon,
  backend: BackendIcon,
  integrations: IntegrationsIcon,
  cms: CmsIcon,
};

export function StackLayerIcon({
  layerId,
  size = 22,
}: {
  layerId: StackLayerId;
  size?: number;
}) {
  const Icon = ICONS[layerId];
  return <Icon size={size} />;
}
