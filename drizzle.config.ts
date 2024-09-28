import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./schema/database.ts",
  out: "./schema/generated/",
  verbose: true,
  strict: true,
  dbCredentials: {
    host: "localhost",
    port: 5432,
    database: "salesfolio",
    user: "docker",
    password: "root",
  },
});