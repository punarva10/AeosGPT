import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "./db";
import crypto from "crypto";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const existingUser = await db.users.findUnique({
          where: { email: credentials.email },
        });
        if (!existingUser) {
          return null;
        }

        if (!existingUser.verified) {
          throw new Error("User is not verified");
        }

        const hash = crypto.createHash("sha256");
        hash.update(credentials.password);
        const hashedPassword = hash.digest("hex");

        const passwordMatch = existingUser.password === hashedPassword;
        if (!passwordMatch) {
          return null;
        }

        return {
          id: `${existingUser.id}`,
          name: existingUser.name,
          email: existingUser.email,
          verified: existingUser.verified,
          token: existingUser.token,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          name: user.name,
        };
      }
      return token;
    },
    async session({ session, user, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          name: token.name,
        },
      };
      return session;
    },
  },
};
