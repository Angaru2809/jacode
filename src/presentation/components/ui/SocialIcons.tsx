import type { StackValueItem } from "@domain/content/stack";

type IconProps = { className?: string; title?: string };
type StackIconKind = StackValueItem["icon"];

export function InstagramIcon({ className, title = "Instagram" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={22}
      height={22}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      <path
        fill="currentColor"
        d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4A5.8 5.8 0 0 1 16.2 22H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6m9.65 1.5a1.125 1.125 0 1 1 0 2.25 1.125 1.125 0 0 1 0-2.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"
      />
    </svg>
  );
}

export function WhatsAppIcon({ className, title = "WhatsApp" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={22}
      height={22}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      <path
        fill="currentColor"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"
      />
    </svg>
  );
}

function StackGlyph({ kind }: { kind: StackIconKind }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.6 };
  switch (kind) {
    case "react":
      return (
        <svg viewBox="0 0 32 32" width={28} height={28} aria-hidden>
          <ellipse cx="16" cy="16" rx="12" ry="4.5" {...common} />
          <ellipse
            cx="16"
            cy="16"
            rx="12"
            ry="4.5"
            {...common}
            transform="rotate(60 16 16)"
          />
          <ellipse
            cx="16"
            cy="16"
            rx="12"
            ry="4.5"
            {...common}
            transform="rotate(120 16 16)"
          />
          <circle cx="16" cy="16" r="2.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case "java":
      return (
        <svg viewBox="0 0 32 32" width={28} height={28} aria-hidden>
          <path
            {...common}
            d="M11 22c3 2.5 7 2.5 10 0M13 18c2.5 1.5 5.5 1.5 8 0M16 8v6"
          />
          <path
            fill="currentColor"
            d="M14 26c-1 .8-2.2 1.2-3.5 1.2 1.8-.3 3.5-1.2 4.8-2.5"
          />
        </svg>
      );
    case "node":
      return (
        <svg viewBox="0 0 32 32" width={28} height={28} aria-hidden>
          <path
            {...common}
            d="M16 6 26 12v8L16 26 6 20V12L16 6z"
          />
          <path {...common} d="M16 12v8M12 14l8 4" />
        </svg>
      );
    case "wordpress":
      return (
        <svg viewBox="0 0 32 32" width={28} height={28} aria-hidden>
          <circle cx="16" cy="16" r="10" {...common} />
          <path
            fill="currentColor"
            d="M16 8c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm-3.2 4.2c.3 2.8 1.5 5.5 3.4 7.6 1.2-2.4 1.8-5 1.8-7.6H12.8zm6.4 0c0 2.1-.4 4.1-1.2 5.9 2.3-1.5 4-3.8 4.7-6.5h-3.5z"
          />
        </svg>
      );
  }
}

export function StackValueIcon({ kind }: { kind: StackIconKind }) {
  return <StackGlyph kind={kind} />;
}
