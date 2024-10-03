import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const post_categories = pgTable("post_category", {
  id: uuid("id").primaryKey().unique().defaultRandom(),
  title: text("title").notNull(),
});
