import { pgTable, text, boolean, uuid, timestamp} from "drizzle-orm/pg-core";
import { users } from "./users";

const profileTable = pgTable("profiles", {
  id: uuid("id").primaryKey().unique().defaultRandom(),
  status: text("status").notNull().default("active"),
  user_id: text("id").references(() => users.id),
  name: text("name"),
  first_login: boolean("first_login").notNull().default(true),
  email_consent: boolean("email_consent").notNull().default(true),
  account_email: text("account_email"),
  image: text("image"),
  username: text("username").unique(),
  
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  deleted_at: timestamp("deleted_at", { withTimezone: true }),
});

export default profileTable;
