import { createFileRoute } from "@tanstack/solid-router";
import { createServerFn } from "@tanstack/solid-start";
import { eq } from "drizzle-orm";
import NoteForm from "~/components/route-components/note/form";
import { db } from "~/lib/db";
import { note } from "~/lib/db/schema";
import { authMiddleware } from "~/lib/middleware/auth";

const getNote = createServerFn({
  method: "GET",
})
  .middleware([authMiddleware])
  .validator((data) => {
    // @ts-ignore
    return data as string;
  })
  .handler(async ({ context, data }) => {
    const currentNote = await db.select().from(note).where(eq(note.id, data));

    if (currentNote.length === 0) {
      throw new Error("Note not found");
    }

    return currentNote[0];
  });

export const Route = createFileRoute("/_authorized/note/$noteId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    return await getNote({ data: params.noteId });
  },
});

function RouteComponent() {
  const note = Route.useLoaderData();

  return <NoteForm note={note()} />;
}
