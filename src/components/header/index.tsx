import { Link, useNavigate } from "@tanstack/solid-router";
import type { User } from "better-auth";
import { Match, Switch } from "solid-js";
import { toast } from "solid-sonner";
import TanStackQueryHeaderUser from "~/integrations/tanstack-query/header-user.tsx";
import authClient from "~/lib/auth/auth-client";
import { Button } from "../ui/button";
import { ThemeToggle } from "./theme-change";

type HeaderProps = {
  user: User | null;
};

export default function Header(props: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header class="px-4 py-2 flex gap-2 justify-between bg-background border-b border-border items-center sticky top-0 z-50 w-full">
      <nav class="flex flex-row">
        <div>
          <TanStackQueryHeaderUser />
        </div>
        <div class="px-2 font-bold text-2xl">
          <Link to="/">Notes</Link>
        </div>
      </nav>
      <div class="flex items-center gap-6">
        <Switch>
          <Match when={props.user}>
            <Button
              variant="ghost"
              size="sm"
              class="text-base"
              onClick={async () => {
                await authClient.signOut({
                  fetchOptions: {
                    onError: (error) => {
                      toast.error(`Sign out failed: ${error.error}`);
                    },
                    onSuccess: () => {
                      navigate({
                        to: "/",
                      });
                    },
                  },
                });
              }}
            >
              Sign Out
            </Button>
          </Match>
          <Match when={!props.user}>
            <div class="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                as={Link}
                class="text-base"
                to="/signin"
              >
                Sign In
              </Button>
              <Button size="sm" as={Link} class="text-base" to="/signup">
                Sign Up
              </Button>
            </div>
          </Match>
        </Switch>
        <ThemeToggle />
      </div>
    </header>
  );
}
