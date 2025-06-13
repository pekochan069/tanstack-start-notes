import { createRootRouteWithContext, Outlet, ScriptOnce } from "@tanstack/solid-router";
import { getUser } from "~/lib/auth/getUser.ts";
import Header from "../components/header";
import TanStackQueryProvider from "../integrations/tanstack-query/provider.tsx";

export const Route = createRootRouteWithContext<{
  user: Awaited<ReturnType<typeof getUser>>;
}>()({
  component: RootComponent,
  beforeLoad: async () => {
    const user = await getUser();

    return {
      user,
    };
  },
});

function RootComponent() {
  const context = Route.useRouteContext();

  return (
    <TanStackQueryProvider>
      <Header user={context().user} />

      <Outlet />
      {/* <TanStackRouterDevtools /> */}
      <ScriptOnce>
        {`document.documentElement.classList.toggle(
            'dark',
            localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
            )`}
      </ScriptOnce>
    </TanStackQueryProvider>
  );
}
