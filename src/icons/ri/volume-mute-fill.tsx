import type { JSX } from "solid-js";

export function RiVolumeMuteFill(props: JSX.IntrinsicElements["svg"]) {
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
        d="M5.889 16H2a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h3.889l5.294-4.332a.5.5 0 0 1 .817.387v15.89a.5.5 0 0 1-.817.387zm14.525-4l3.536 3.536l-1.415 1.414L19 13.414l-3.536 3.536l-1.414-1.414L17.586 12L14.05 8.465l1.414-1.415L19 10.586l3.535-3.536l1.415 1.415z"
      />
    </svg>
  );
}
