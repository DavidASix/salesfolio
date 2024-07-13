import NextAuth from "next-auth";
import LinkedIn from "next-auth/providers/linkedin";
import Hubspot from "next-auth/providers/hubspot";
import { v4 as uuidv4 } from "uuid";

import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/utils/database";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [LinkedIn, Hubspot],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // open mongo db
      try {
        const client = await clientPromise;
        const db = client.db();
        const usersCollection = db.collection("users");
        const existingUser = await usersCollection.findOne({
          email: user?.email,
        });
        if (!existingUser) {
          // New user
          user.uuid = uuidv4();
          user.firstLogin = true;
        } else if (!existingUser?.uuid) {
          // User exists but doesn't have a UUID
          await usersCollection.updateOne(
            { _id: existingUser._id },
            { $set: { uuid: uuidv4() } }
          );
        }
      } catch (err) {
        console.log(err);
      } finally {
        return true;
      }
    },
  },
});
