import NextAuth from "next-auth";
import LinkedIn from "next-auth/providers/linkedin";
import Hubspot from "next-auth/providers/hubspot";

import mongoosePromise from "@/utils/mongoose-connect";
import Profile from "./model/Profile";

import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/utils/database";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [LinkedIn, Hubspot],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        await mongoosePromise;
        const existingUser = await Profile.find({ userId: user.id });
        if (!existingUser.length) {
          const newProfile = new Profile({
            userId: user.id,
            name: user.name || undefined,
            image: user.image || undefined,
            accountEmail: user.email || undefined,
          });
          await newProfile.save();
        }
      } catch (err) {
        console.error('SIGN IN ERROR')
        console.log(err);
      } finally {
        return true;
      }
    },
  },
});
