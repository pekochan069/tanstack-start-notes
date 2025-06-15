import { createServerFn, useServerFn } from "@tanstack/solid-start";
import type { JSONContent } from "@tiptap/core";
import { destr } from "destr";
import { eq } from "drizzle-orm";
import { createEffect, createSignal } from "solid-js";
import { EditorComponent, EditorProvider } from "~/components/editor";
import { Label } from "~/components/ui/label";
import { TextField, TextFieldInput, TextFieldLabel } from "~/components/ui/text-field";
import { db } from "~/lib/db";
import { type Note, note } from "~/lib/db/schema";

const onTitleUpdateFn = createServerFn({
  method: "POST",
})
  .validator((data) => {
    if (typeof data !== "object" || data === null) {
      throw new Error("Invalid data format");
    }

    return data as { title: string; noteId: string };
  })
  .handler(async ({ data }) => {
    await db
      .update(note)
      .set({
        title: data.title,
      })
      .where(eq(note.id, data.noteId));
  });

const onNoteUpdateFn = createServerFn({
  method: "POST",
})
  .validator((data) => {
    if (typeof data !== "object" || data === null) {
      throw new Error("Invalid data format");
    }

    return data as {
      noteId: string;
      contents: string;
      thumbnail: string;
    };
  })
  .handler(async ({ data }) => {
    await db
      .update(note)
      .set({
        contents: data.contents,
        thumbnail: data.thumbnail,
      })
      .where(eq(note.id, data.noteId));
  });

type NoteFormProps = {
  note: Note;
};

export default function NoteForm(props: NoteFormProps) {
  const onTitleUpdate = useServerFn(onTitleUpdateFn);
  const onContentsUpdate = useServerFn(onNoteUpdateFn);
  const initialValue = destr<JSONContent>(props.note.contents);
  const [title, setTitle] = createSignal(props.note.title);
  const [value, setValue] = createSignal<JSONContent>(initialValue);
  const [thumbnail, setThumbnail] = createSignal("");

  createEffect(async () => {
    const currentTitle = title();
    if (currentTitle === props.note.title) return;

    await onTitleUpdate({
      data: {
        title: currentTitle,
        noteId: props.note.id,
      },
    });
  });

  createEffect(async () => {
    const currentValue = value();
    if (currentValue === initialValue) return;

    console.log(thumbnail());

    await onContentsUpdate({
      data: {
        contents: JSON.stringify(currentValue),
        thumbnail: thumbnail(),
        noteId: props.note.id,
      },
    });
  });

  return (
    <div class="flex flex-col gap-4 h-[calc(100vh-53px)] px-6 pt-4 pb-6">
      <div>
        <TextField value={title()} onChange={setTitle}>
          <TextFieldLabel>Title</TextFieldLabel>
          <TextFieldInput />
        </TextField>
      </div>
      <div class="flex-1 flex flex-col gap-1">
        <Label>Note</Label>
        <div class="flex-1">
          <EditorProvider value={value()} onUpdate={setValue} onThumbnailUpdate={setThumbnail}>
            <EditorComponent output="json" throttle={500} class="h-full" />
          </EditorProvider>
        </div>
      </div>
    </div>
  );
}
