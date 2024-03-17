import NextAuth from "next-auth";
import { db } from "@utils/db";
import User from "@models/user";
import GoogleProvider from "next-auth/providers/google";

const nextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks:{
  async session({ session }) {
    const sessionUser = await User.findOne({
      email: session.user.email,
    });

    session.user.id = sessionUser._id.toString();
    return session;
  },
  async signIn({ profile }) {
    try {
      await db.connect();
      const userExists = await User.findOne({ email: profile.email });

      if (!userExists) {
        await User.create({
          email: profile.email,
          username: profile.name.replace(" ", "").toLowerCase(),
          image: profile.picture,
        });
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
}
};

export async function GET(req, res) {
  return NextAuth(req, res, nextAuthOptions);
}

export async function POST(req, res) {
  return NextAuth(req, res, nextAuthOptions);
}
