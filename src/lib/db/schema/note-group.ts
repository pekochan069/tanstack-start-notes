import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { group } from "./group";
import { note } from "./note";

export const noteGroup = pgTable("note_group", {
  noteId: text("note_id")
    .notNull()
    .references(() => note.id, {
      onDelete: "cascade",
    }),
  groupId: text("group_id")
    .notNull()
    .references(() => group.id, {
      onDelete: "cascade",
    }),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export type NoteGroup = typeof noteGroup.$inferInsert;
export type NoteGroupInsert = typeof noteGroup.$inferInsert;
export type NoteGroupUpdate = {
  groupId?: string;
};
