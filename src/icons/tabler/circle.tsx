import type { JSX } from "solid-js";

export function TablerCircle(props: JSX.IntrinsicElements["svg"]) {
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
        d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0"
      />
    </svg>
  );
}
