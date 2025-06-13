import type { BetterAuthPlugin } from "better-auth";
import { parseSetCookieHeader } from "better-auth/cookies";
import { createAuthMiddleware } from "better-auth/plugins";

export function solidStartCookies() {
  return {
    id: "solid-start-cookies",
    hooks: {
      after: [
        {
          matcher(ctx) {
            return true;
          },
          handler: createAuthMiddleware(async (ctx) => {
            const returned = ctx.context.responseHeaders;
            if (returned instanceof Headers) {
              const setCookies = returned?.get("set-cookie");
              if (!setCookies) return;
              const parsed = parseSetCookieHeader(setCookies);
              const { setCookie } = await import("@tanstack/start-server-core");
              parsed.forEach((value, key) => {
                if (!key) return;
                const opts = {
                  sameSite: value.samesite,
                  secure: value.secure,
                  maxAge: value["max-age"],
                  httpOnly: value.httponly,
                  domain: value.domain,
                  path: value.path,
                } as const;
                try {
                  setCookie(key, decodeURIComponent(value.value), opts);
                } catch (e) {
                  // this will fail if the cookie is being set on server component
                }
              });
              return;
            }
          }),
        },
      ],
    },
  } satisfies BetterAuthPlugin;
}
