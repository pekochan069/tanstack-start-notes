import { Link } from "@tanstack/solid-router";
import { For } from "solid-js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import type { Note } from "~/lib/db/schema";

type NoteCardProps = {
  note: Note;
};

export default function NoteCard(props: NoteCardProps) {
  return (
    <Link to="/note/$noteId" params={{ noteId: props.note.id }}>
      <Card>
        <CardHeader>
          <CardTitle>{props.note.title || "Empty Title"}</CardTitle>
          <CardDescription class="hidden"></CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <div class="h-[168px]">
              <For each={props.note.thumbnail.split("\n")}>
                {(line) => <p class="h-6 text-ellipsis text-nowrap overflow-hidden">{line}</p>}
              </For>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
