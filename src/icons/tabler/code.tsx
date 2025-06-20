import type { JSX } from "solid-js";

export function TablerCode(props: JSX.IntrinsicElements["svg"]) {
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
        d="m7 8l-4 4l4 4m10-8l4 4l-4 4M14 4l-4 16"
      />
    </svg>
  );
}
