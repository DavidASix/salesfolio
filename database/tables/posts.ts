import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";
import { users } from "./nextauth";

import { post_categories } from "./post_categories";

export const posts = pgTable("post", {
  id: uuid("id").primaryKey().unique().defaultRandom(),
  status: text("status").notNull().default("active"),
  user_id: text("user_id").references(() => users.id),
  category_id: uuid("category_id").references(() => post_categories.id),
  description: text("description"),
  image_url: text("image_url"),
  audio_file_url: text("audio_file_url"),
  video_embed_url: text("video_embed_url"),

  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  deleted_at: timestamp("deleted_at", { withTimezone: true }),
});
