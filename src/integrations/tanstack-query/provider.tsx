import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";

import type { JSX } from "solid-js";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      experimental_prefetchInRender: true,
    },
  },
});

export default function AppTanstackQueryProvider(props: { children: JSX.Element }) {
  return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>;
}
