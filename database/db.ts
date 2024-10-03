import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const {
  DATABASE_DOCKER_HOST,
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_PORT,
} = process.env;

const queryClient = postgres({
  host: DATABASE_DOCKER_HOST ?? "",
  port: Number(DATABASE_PORT) ?? 5432,
  database: DATABASE_NAME ?? "",
  user: DATABASE_USER ?? "",
  password: DATABASE_PASSWORD,
  ssl: false,
});

export default drizzle(queryClient);
