import NextAuth from "next-auth";
import LinkedIn from "next-auth/providers/linkedin"
import Hubspot from "next-auth/providers/hubspot"

import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "./lib/db"

export const { handlers, signIn, signOut, auth} = NextAuth({
    providers: [
        LinkedIn,
        Hubspot
    ],
    adapter: MongoDBAdapter(clientPromise),
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            // open mongo db
            //check if existing user
            // if not, put new uuid
            console.log('logged in!')
            console.log(user)
            return true
        }
    }
});