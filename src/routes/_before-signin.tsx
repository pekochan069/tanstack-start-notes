import { createFileRoute, redirect } from "@tanstack/solid-router";

export const Route = createFileRoute("/_before-signin")({
  beforeLoad: async ({ context }) => {
    if (context.user) {
      throw redirect({
        to: "/",
      });
    }
  },
});
