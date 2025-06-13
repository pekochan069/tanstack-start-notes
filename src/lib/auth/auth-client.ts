import { createAuthClient } from "better-auth/solid";
import { env } from "~/env";
import { solidStartCookies } from "./solid-cookie";

const authClient = createAuthClient({
  baseURL: env.VITE_BETTER_AUTH_URL,
  plugins: [solidStartCookies()],
});

export default authClient;
