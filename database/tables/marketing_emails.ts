import { pgTable, text, boolean, uuid, timestamp } from "drizzle-orm/pg-core";

export const marketing_emails = pgTable("marketing_email", {
  id: uuid("id").primaryKey().unique().defaultRandom(),
  email: text("email"),
  email_consent: boolean("email_consent").notNull().default(true),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  deleted_at: timestamp("deleted_at", { withTimezone: true }),
});
