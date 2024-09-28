import { randomUUID } from "crypto";
import { pgTable, timestamp, text, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),

  status: text("status").notNull().default("active"),

  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  deleted_at: timestamp("deleted_at", { withTimezone: true }),

  // Next Auth, Mandatory fields
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  password: text("password"),
  image: text("image"),
});
