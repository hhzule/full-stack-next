import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();
        //check if user already exists
        const user = await User.findOne({ email: profile.email });

        // if not, create a new one
        if (!user) {
          //   console.log("profile==>", profile);
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
            // googleId: profile.id
          });
        }
        return true;
      } catch (error) {
        console.log(`error ${error.message}`);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
