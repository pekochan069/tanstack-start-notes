import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user";

export const group = pgTable("group", {
  id: text("id").primaryKey(),
  publicId: text("public_id").notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull().default(""),
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

export type Group = typeof group.$inferSelect;
export type GroupInsert = typeof group.$inferInsert;
export type GroupUpdate = {
  name?: string;
  description?: string;
  color?: string;
};
