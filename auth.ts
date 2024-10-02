import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import linkedin from "next-auth/providers/linkedin";
import Resend from "next-auth/providers/resend"
import db from "./database/db";


export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [linkedin, 
    Resend({
      from: "no-reply@mailer.mysalesfolio.com"
    }),],
  // callbacks: {
  //   async signIn({ user, account, profile, email, credentials }) {
  //     try {
  //       await mongoosePromise;
  //       const existingUser = await Profile.find({ userId: user.id });
  //       if (!existingUser.length) {
  //         const newProfile = new Profile({
  //           userId: user.id,
  //           name: user.name || undefined,
  //           image: user.image || undefined,
  //           accountEmail: user.email || undefined,
  //         });
  //         await newProfile.save();
  //       }
  //     } catch (err) {
  //       console.error('SIGN IN ERROR')
  //       console.log(err);
  //     } finally {
  //       return true;
  //     }
  //   },
  // },
});
