import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user";

export const tag = pgTable("tag", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
  color: text("color").notNull().default(""),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade",
    }),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export type Tag = typeof tag.$inferSelect;
export type TagInsert = typeof tag.$inferInsert;
export type TagUpdate = {
  name?: string;
  color?: string;
};
