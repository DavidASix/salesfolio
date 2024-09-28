import {
    pgTable,
    timestamp,
    text,
    integer,
    primaryKey,
    index,
    boolean,
  } from "drizzle-orm/pg-core";
  import { users } from "./users";
  import { type AdapterAccountType } from "@auth/core/adapters";
  
  // These tables are all provided by NextJS
  // https://authjs.dev/getting-started/adapters/drizzle
  
  export const accounts = pgTable(
    "account",
    {
      userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
      type: text("type").$type<AdapterAccountType>().notNull(),
      provider: text("provider").notNull(),
      providerAccountId: text("providerAccountId").notNull(),
      refresh_token: text("refresh_token"),
      access_token: text("access_token"),
      expires_at: integer("expires_at"),
      token_type: text("token_type"),
      scope: text("scope"),
      id_token: text("id_token"),
      session_state: text("session_state"),
    },
    (account) => ({
      userIdIdx: index().on(account.userId),
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    }),
  );
  
  export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  });
  
  export const verificationTokens = pgTable(
    "verificationToken",
    {
      identifier: text("identifier").notNull(),
      token: text("token").notNull().unique(),
      expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (vt) => ({
      compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
    }),
  );
  
  export const authenticators = pgTable(
    "authenticator",
    {
      credentialID: text("credentialID").notNull().unique(),
      userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
      providerAccountId: text("providerAccountId").notNull(),
      credentialPublicKey: text("credentialPublicKey").notNull(),
      counter: integer("counter").notNull(),
      credentialDeviceType: text("credentialDeviceType").notNull(),
      credentialBackedUp: boolean("credentialBackedUp").notNull(),
      transports: text("transports"),
    },
    (authenticator) => ({
      compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
      }),
    }),
  );