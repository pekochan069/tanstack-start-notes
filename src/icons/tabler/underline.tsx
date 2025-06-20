import type { JSX } from "solid-js";

export function TablerUnderline(props: JSX.IntrinsicElements["svg"]) {
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
        d="M7 5v5a5 5 0 0 0 10 0V5M5 19h14"
      />
    </svg>
  );
}
