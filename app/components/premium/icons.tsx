import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function BenefitIcon({ paths }: { paths: readonly string[] }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      {paths.map((path) => (
        <path
          d={path}
          key={path}
          stroke="currentColor"
          strokeWidth="1.15"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}

export function RosaryMark(props: IconProps) {
  return (
    <svg viewBox="0 0 18 24" fill="none" aria-hidden="true" {...props}>
      <path d="M9 3v14" />
      <path d="M3.5 8h11" />
      <circle cx="9" cy="20.5" r="1.4" />
    </svg>
  );
}

export function CrossIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" {...props}>
      <path d="M24 9v30M14 19h20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function RosaryIllustration() {
  return (
    <svg viewBox="0 0 30 42" fill="none" aria-hidden="true">
      <path d="M15 6v20" />
      <path d="M8 12h14" />
      <circle cx="15" cy="30" r="1.6" />
      <path d="M15 32c-8 2-9 8 0 8s8-6 0-8" opacity=".55" />
      <circle cx="9" cy="36.5" r="1.1" />
      <circle cx="15" cy="38.6" r="1.1" />
      <circle cx="21" cy="36.5" r="1.1" />
    </svg>
  );
}

export function LockIcon() {
  return (
    <svg viewBox="0 0 11 13" fill="none" aria-hidden="true">
      <rect x="1" y="5.2" width="9" height="6.8" rx="1.2" />
      <path d="M3.2 5.2V3.4a2.3 2.3 0 0 1 4.6 0v1.8" />
    </svg>
  );
}

export function PremiumSealIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="22" fill="currentColor" opacity=".1" />
      <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="1.5" />
      <path d="m21.5 32.5 7.1 7.1 14.4-15.1" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowUpRightIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 15 15 5M7 5h8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
