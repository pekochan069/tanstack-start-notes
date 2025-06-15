import { createId } from "@paralleldrive/cuid2";
import { useQuery } from "@tanstack/solid-query";
import { createFileRoute, useNavigate } from "@tanstack/solid-router";
import { createServerFn, useServerFn } from "@tanstack/solid-start";
import { eq } from "drizzle-orm";
import { For, Match, Suspense, Switch } from "solid-js";
import NoteCard from "~/components/route-components/notes/card";
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
  .handler(async ({ context }) => {
    const user = context.user;

    const newId = createId();

    await db.insert(note).values({
      id: newId,
      userId: user.id,
      status: "draft",
    });

    return newId;
  });

export const Route = createFileRoute("/_authorized/notes")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const createNewNoteFn = useServerFn(createNewNote);
  const notes = useServerFn(getNotes);
  const query = useQuery(() => ({
    queryKey: ["notes"],
    queryFn: notes,
  }));

  async function onCreateNewNote() {
    const noteId = await createNewNoteFn();

    navigate({
      to: "/note/$noteId",
      params: {
        noteId,
      },
    });
  }

  return (
    <div>
      <div>
        <Button onClick={onCreateNewNote}>Create</Button>
      </div>
      <div>
        <Suspense>
          <Switch>
            <Match when={query.isLoading}>
              <div>Loading...</div>
            </Match>
            <Match when={query.isError}>
              <div>Error: {query.error!.message}</div>
            </Match>
            <Match when={query.isSuccess}>
              <div>
                <For each={query.data!}>{(note) => <NoteCard note={note} />}</For>
              </div>
            </Match>
          </Switch>
        </Suspense>
      </div>
    </div>
  );
}
