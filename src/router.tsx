import { createRouter as createTanstackRouter } from "@tanstack/solid-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

import "./styles.css";
import type { User } from "./lib/db/schema";

// Create a new router instance
export const createRouter = () => {
  const router = createTanstackRouter({
    routeTree,
    scrollRestoration: true,
    context: {
      user: null as User | null, // Initialize user context as null
    },
  });
  return router;
};

const router = createRouter();

// Register the router instance for type safety
declare module "@tanstack/solid-router" {
  interface Register {
    router: typeof router;
  }
}
