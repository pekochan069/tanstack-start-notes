import type { JSX } from "solid-js";

export function TablerQuoteFilled(props: JSX.IntrinsicElements["svg"]) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M9 5a2 2 0 0 1 2 2v6c0 3.13-1.65 5.193-4.757 5.97a1 1 0 1 1-.486-1.94C7.984 16.473 9 15.203 9 13v-1H6a2 2 0 0 1-1.995-1.85L4 10V7a2 2 0 0 1 2-2zm9 0a2 2 0 0 1 2 2v6c0 3.13-1.65 5.193-4.757 5.97a1 1 0 1 1-.486-1.94C16.984 16.473 18 15.203 18 13v-1h-3a2 2 0 0 1-1.995-1.85L13 10V7a2 2 0 0 1 2-2z"
      />
    </svg>
  );
}
