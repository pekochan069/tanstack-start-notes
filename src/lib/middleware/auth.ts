import { createMiddleware } from "@tanstack/solid-start";
import { getWebRequest, setResponseStatus } from "@tanstack/solid-start/server";
import { auth } from "../auth";

export const authMiddleware = createMiddleware({
	type: "function",
}).server(async ({ next }) => {
	const { headers } = getWebRequest();

	const res = await auth.api.getSession({
		headers,
		query: {
			disableCookieCache: true,
		},
	});

	if (!res?.user) {
		setResponseStatus(401);
		throw new Error("Unauthorized");
	}

	return await next({
		context: {
			user: res.user,
		},
	});
});
