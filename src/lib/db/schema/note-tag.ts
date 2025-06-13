import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { note } from "./note";
import { tag } from "./tag";

export const noteTag = pgTable("note_tag", {
  noteId: text("note_id")
    .notNull()
    .references(() => note.id, {
      onDelete: "cascade",
    }),
  tagId: text("tag_id")
    .notNull()
    .references(() => tag.id, {
      onDelete: "cascade",
    }),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export type NoteTag = typeof noteTag.$inferInsert;
export type NoteTagInsert = typeof noteTag.$inferInsert;
export type NoteTagUpdate = {
  tagId?: string;
};
