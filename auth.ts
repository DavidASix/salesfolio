import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import linkedin from "next-auth/providers/linkedin";
import Resend from "next-auth/providers/resend";
import db from "./database/db";
import { profiles } from "./database/crud";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    linkedin,
    Resend({
      from: process.env.MAILER_ADDRESS,
    }),
  ],
  events: {
    async createUser(message) {
      const { user } = message;
      try {
        const user_id = user?.id ?? "";
        const existingUser = await db
          .select()
          .from(profiles.table)
          .where(eq(profiles.table.user_id, user_id))
          .limit(1);

        console.log({ existingUser });

        if (!existingUser.length) {
          const newProfile: z.infer<typeof profiles.insert> = {
            user_id,
            name: user?.name ?? undefined,
            image: user?.image ?? undefined,
            account_email: user?.email ?? undefined,
          };
          console.log("Trying to insert", newProfile);
          await db.insert(profiles.table).values(newProfile);
        }
      } catch (err) {
        console.error("SIGN IN ERROR");
        console.log(err);
      }
    },
  },
});
