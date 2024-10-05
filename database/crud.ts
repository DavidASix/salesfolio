import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import * as schema from "./schema";

export const users = {
  table: schema.users,
};

export const profiles = {
  table: schema.profiles,
  insert: createInsertSchema(schema.profiles).omit({
    id: true,
    created_at: true,
    updated_at: true,
  }),
};

export const marketing_emails = {
  table: schema.marketing_emails,
};

export const posts = {
  table: schema.posts,
};

export const post_categories = {
  table: schema.post_categories,
};
