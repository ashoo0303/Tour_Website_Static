/**
 * Inline SVG icon set. Kept as one file so every icon shares the same
 * stroke weight, viewBox and `currentColor` behaviour.
 */

function Svg({ children, size = 20, fill = "none", ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={fill === "none" ? "currentColor" : "none"}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export function MenuIcon(props) {
  return (
    <Svg {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Svg>
  );
}

export function CloseIcon(props) {
  return (
    <Svg {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Svg>
  );
}

export function SearchIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.2-3.2" />
    </Svg>
  );
}

export function HeartIcon({ filled = false, ...props }) {
  return (
    <Svg fill={filled ? "currentColor" : "none"} {...props}>
      <path d="M12 20.3l-1.42-1.3C5.6 14.48 2.8 11.94 2.8 8.85 2.8 6.3 4.8 4.3 7.35 4.3c1.44 0 2.82.67 3.72 1.73l.93 1.1.93-1.1a4.88 4.88 0 0 1 3.72-1.73c2.55 0 4.55 2 4.55 4.55 0 3.09-2.8 5.63-7.78 10.16L12 20.3z" />
    </Svg>
  );
}

export function MapPinIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </Svg>
  );
}

export function MoonIcon(props) {
  return (
    <Svg {...props}>
      <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" />
    </Svg>
  );
}

export function CheckIcon(props) {
  return (
    <Svg {...props}>
      <path d="M5 12.6l4.3 4.3L19 7.2" />
    </Svg>
  );
}

export function ArrowRightIcon(props) {
  return (
    <Svg {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Svg>
  );
}

export function QuoteIcon(props) {
  return (
    <Svg fill="currentColor" {...props}>
      <path d="M9.6 6.2c-3 1.6-4.8 4.2-4.8 7.6 0 2.6 1.5 4.3 3.7 4.3 1.9 0 3.3-1.4 3.3-3.2 0-1.8-1.3-3.1-3-3.1-.3 0-.7 0-.9.1.4-1.6 1.7-3 3.4-3.9l-1.7-1.8zm8.4 0c-3 1.6-4.8 4.2-4.8 7.6 0 2.6 1.5 4.3 3.7 4.3 1.9 0 3.3-1.4 3.3-3.2 0-1.8-1.3-3.1-3-3.1-.3 0-.7 0-.9.1.4-1.6 1.7-3 3.4-3.9L18 6.2z" />
    </Svg>
  );
}

export function GlobeIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.4 2.5 3.6 5.6 3.6 9S14.4 18.5 12 21c-2.4-2.5-3.6-5.6-3.6-9S9.6 5.5 12 3z" />
    </Svg>
  );
}
