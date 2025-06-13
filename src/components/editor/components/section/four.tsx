import type { Editor } from "@tiptap/core";
import type { toggleVariants } from "~/components/ui/toggle";
import type { VariantProps } from "class-variance-authority";
import type { FormatAction } from "../../types";
import { mergeProps } from "solid-js";
import { TablerChevronDown } from "~/icons/tabler/chevron-down";
import { TablerList } from "~/icons/tabler/list";
import { ToolbarSection } from "../toolbar-section";

type ListItemAction = "orderedList" | "bulletList";
interface ListItem extends FormatAction {
  value: ListItemAction;
}

const formatActions: ListItem[] = [
  {
    value: "orderedList",
    label: "숫자 목록",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="20px"
        viewBox="0 -960 960 960"
        width="20px"
        fill="currentColor"
      >
        <path d="M144-144v-48h96v-24h-48v-48h48v-24h-96v-48h120q10.2 0 17.1 6.9 6.9 6.9 6.9 17.1v48q0 10.2-6.9 17.1-6.9 6.9-17.1 6.9 10.2 0 17.1 6.9 6.9 6.9 6.9 17.1v48q0 10.2-6.9 17.1-6.9 6.9-17.1 6.9H144Zm0-240v-96q0-10.2 6.9-17.1 6.9-6.9 17.1-6.9h72v-24h-96v-48h120q10.2 0 17.1 6.9 6.9 6.9 6.9 17.1v72q0 10.2-6.9 17.1-6.9 6.9-17.1 6.9h-72v24h96v48H144Zm48-240v-144h-48v-48h96v192h-48Zm168 384v-72h456v72H360Zm0-204v-72h456v72H360Zm0-204v-72h456v72H360Z" />
      </svg>
    ),
    isActive: (editor) => editor.isActive("orderedList") || false,
    action: (editor) => editor.chain().focus().toggleOrderedList().run(),
    canExecute: (editor) =>
      editor.can().chain().focus().toggleOrderedList().run() || false,
    shortcuts: ["mod", "shift", "7"],
  },
  {
    value: "bulletList",
    label: "글머리 기호 목록",
    icon: <TablerList class="size-5" />,
    isActive: (editor) => editor.isActive("bulletList") || false,
    action: (editor) => editor.chain().focus().toggleBulletList().run(),
    canExecute: (editor) =>
      editor.can().chain().focus().toggleBulletList().run() || false,
    shortcuts: ["mod", "shift", "8"],
  },
];

interface SectionFourProps extends VariantProps<typeof toggleVariants> {
  editor: Editor;
  activeActions?: ListItemAction[];
  mainActionCount?: number;
}

export function SectionFour(props: SectionFourProps) {
  const merged = mergeProps(
    {
      activeActions: formatActions.map((action) => action.value),
      mainActionCount: 0,
    },
    props,
  );
  return (
    <ToolbarSection
      editor={merged.editor}
      actions={formatActions}
      activeActions={merged.activeActions}
      mainActionCount={merged.mainActionCount}
      dropdownIcon={
        <>
          <TablerList class="size-5" />
          <TablerChevronDown class="size-5" />
        </>
      }
      dropdownTooltip="목록 삽입"
      size={merged.size}
      variant={merged.variant}
    />
  );
}
