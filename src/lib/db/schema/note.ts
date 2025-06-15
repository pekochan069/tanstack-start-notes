import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user";

export const note = pgTable("note", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, {
			onDelete: "cascade",
		}),
	title: text("title").notNull().default(""),
	contents: text("contents").notNull().default(""),
	thumbnail: text("thumbnail").notNull().default(""),
	status: text("status").notNull(),
	isFavorite: boolean("is_favorite").notNull().default(false),
	publicShare: boolean("public_share").notNull().default(false),
	createdAt: timestamp("created_at")
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
	updatedAt: timestamp("updated_at")
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
});

export type Note = typeof note.$inferSelect;
export type NoteInsert = typeof note.$inferInsert;
export type NoteUpdate = {
	title?: string;
	contents?: string;
	status?: string;
	isFavorite?: boolean;
};
