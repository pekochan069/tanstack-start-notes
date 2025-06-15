import { createFileRoute, Link } from "@tanstack/solid-router";
import SignupForm from "~/components/route-components/auth/signup/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";

export const Route = createFileRoute("/_before-signin/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div class="flex items-center gap-4 flex-col justify-center min-h-[calc(100svh-4rem)]">
      <div class="grid gap-1">
        <h1 class="text-center text-2xl font-semibold">Notes</h1>
        <p>
          built with{" "}
          <a href="https://tanstack.com/start/latest" class="font-semibold underline">
            TanStack Start
          </a>{" "}
          and{" "}
          <a href="https://www.solidjs.com/" class="underline font-semibold">
            Solid.js
          </a>
        </p>
      </div>
      <Card class="max-w-lg w-full">
        <CardHeader>
          <CardTitle class="text-xl">Sign up</CardTitle>
          <CardDescription>Create an account to access all features.</CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
          <Separator />
          <div class="mt-4">
            <p class="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/signin" class="underline">
                Sign In
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
