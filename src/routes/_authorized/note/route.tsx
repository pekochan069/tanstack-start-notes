import { createId } from "@paralleldrive/cuid2";
import { useQuery } from "@tanstack/solid-query";
import { createFileRoute } from "@tanstack/solid-router";
import { createServerFn, useServerFn } from "@tanstack/solid-start";
import { eq } from "drizzle-orm";
import { Button } from "~/components/ui/button";
import { db } from "~/lib/db";
import { note } from "~/lib/db/schema";
import { authMiddleware } from "~/lib/middleware/auth";

const getNotes = createServerFn({
  method: "GET",
})
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const user = context.user;

    if (!user) {
      throw new Error("Unauthorized");
    }

    return await db.select().from(note).where(eq(note.userId, user.id));
  });

const createNewNote = createServerFn({
  method: "POST",
})
  .middleware([authMiddleware])
  .validator((data) => {
    // @ts-ignore
    return data.id as string;
  })
  .handler(async ({ context, data }) => {
    const user = context.user;

    if (!user) {
      throw new Error("Unauthorized");
    }

    data;
  });

export const Route = createFileRoute("/_authorized/note")({
  component: RouteComponent,
});

function RouteComponent() {
  const notes = useServerFn(getNotes);
  const query = useQuery(() => ({
    queryKey: ["notes"],
    queryFn: notes,
  }));

  function onCreateNewNote() {
    const id = createId();
    console.log(id);
  }

  return (
    <div>
      <div>
        <Button onClick={onCreateNewNote}>Create</Button>
      </div>
      <div>{JSON.stringify(query.data)}</div>
    </div>
  );
}
