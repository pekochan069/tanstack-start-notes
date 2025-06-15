import { createFileRoute, Link, redirect } from "@tanstack/solid-router";
import { Button } from "~/components/ui/button";

export const Route = createFileRoute("/")({
  component: IndexComponent,
  beforeLoad: ({ context }) => {
    if (context.user) {
      throw redirect({
        to: "/notes",
      });
    }
  },
});

function IndexComponent() {
  return (
    <div class="h-[calc(100svh-8rem)] grid place-content-center">
      <div class="text-center">
        <h1 class="text-7xl font-bold uppercase">Notes</h1>
        <p class="mt-2">
          Built with{" "}
          <a href="https://tanstack.com/start/latest" class="font-semibold underline">
            TanStack Start
          </a>{" "}
          and{" "}
          <a href="https://www.solidjs.com/" class="underline font-semibold">
            Solid.js
          </a>
        </p>
      </div>
      <div class="mt-8">
        <p class="text-center text-lg flex gap-2 items-center justify-center">
          <Button as={Link} to="/signin" variant="outline" size="lg" class="w-full max-w-xs">
            Sign In
          </Button>
          <span>or</span>
          <Button as={Link} to="/signup" variant="default" size="lg" class="w-full max-w-xs">
            Sign Up
          </Button>
        </p>
      </div>
    </div>
  );
}
