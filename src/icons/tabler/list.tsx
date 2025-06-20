import type { JSX } from "solid-js";

export function TablerList(props: JSX.IntrinsicElements["svg"]) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 6h11M9 12h11M9 18h11M5 6v.01M5 12v.01M5 18v.01"
      />
    </svg>
  );
}
