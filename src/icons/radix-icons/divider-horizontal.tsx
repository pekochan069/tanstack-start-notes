import type { JSX } from "solid-js";

export function RadixIconsDividerHorizontal(
  props: JSX.IntrinsicElements["svg"],
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 15 15"
      {...props}
    >
      <path
        fill="currentColor"
        fill-rule="evenodd"
        d="M2 7.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1h-10a.5.5 0 0 1-.5-.5"
        clip-rule="evenodd"
      />
    </svg>
  );
}
