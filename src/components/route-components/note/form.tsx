import { useNavigate } from "@tanstack/solid-router";
import type { Content } from "@tiptap/core";
import { createSignal } from "solid-js";
import { EditorComponent, EditorProvider } from "~/components/editor";

export default function NewNoteForm() {
  const navigate = useNavigate();
  const [value, setValue] = createSignal<Content>();

  createSignal(() => {});

  return (
    <form>
      <div>
        <div></div>
        <div>
          <EditorProvider>
            <EditorComponent output="html" value={value()} onChange={setValue} throttle={500} />
          </EditorProvider>
        </div>
      </div>
    </form>
  );
}
