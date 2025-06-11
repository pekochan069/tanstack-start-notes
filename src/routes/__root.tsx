import { createRootRouteWithContext, Outlet } from "@tanstack/solid-router";
import Header from "../components/header";
import TanStackQueryProvider from "../integrations/tanstack-query/provider.tsx";

export const Route = createRootRouteWithContext()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <TanStackQueryProvider>
        <Header />

        <Outlet />
        {/* <TanStackRouterDevtools /> */}
      </TanStackQueryProvider>
    </>
  );
}
