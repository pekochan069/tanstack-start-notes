import { useQuery } from "@tanstack/solid-query";
import { createFileRoute } from "@tanstack/solid-router";
import { createServerFn, useServerFn } from "@tanstack/solid-start";
import { authMiddleware } from "~/lib/middleware/auth";

const getInitialData = createServerFn({
  method: "GET",
})
  .middleware([authMiddleware])
  .validator((data) => {
    // @ts-ignore
    return data.nodeId as string;
  })
  .handler(async ({ context, data }) => {
    const user = context.user;
  });

export const Route = createFileRoute("/_authorized/note/$noteId/edit")({
  component: RouteComponent,
  loader: ({ params }) => {
    return params.noteId;
  },
});

function RouteComponent() {
  const noteId = Route.useLoaderData();

  const getData = useServerFn(getInitialData);
  const query = useQuery(() => ({
    queryKey: ["note"],
    queryFn: () =>
      getData({
        data: noteId(),
      }),
  }));

  return <div>Hello "/_authorized/note/$/edit"!</div>;
}
