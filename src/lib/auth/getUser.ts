import { createServerFn } from "@tanstack/solid-start";
import { getWebRequest } from "@tanstack/solid-start/server";
import { auth } from ".";

export const getUser = createServerFn({ method: "GET" }).handler(async () => {
  const { headers } = getWebRequest();

  const session = await auth.api.getSession({
    headers,
  });

  return session?.user || null;
});
