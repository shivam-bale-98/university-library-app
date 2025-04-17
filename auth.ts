import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google"
import { db } from "./database/drizzle";
import { users } from "./database/schema";
import { eq, param } from "drizzle-orm";
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db
          .select()
          .from(users)
          .where(eq(users?.email, credentials.email.toString()))
          .limit(1);

        if (user.length === 0) return null;

        const isPasswordValid = await compare(
          credentials.password.toString(),
          user[0].password
        );

        if(!isPasswordValid) return null;

        return {
          id: user[0].id.toString(),
          email: user[0].email,
          name: user[0].fullName
        } as User;
      },
    }),
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  pages: {
    signIn : "/sign-in",
  },
  callbacks: { // fn called after sign-in is complete
    async jwt(params) {
      const {token, user} = params;

      if(user) {
        token.id = user.id;
        token.name = user.name;
      }

      return token;
    },

    async session(params) {
        const {session, token} = params;

        if(session.user) {
            session.user.id = token.id as string;
            session.user.name = token.name as string;
        } 

        return session
    },

    // async signIn(params) {
    //    const {account, profile} = params;
    //    if(account?.provider === "google") {
    //     return profile?.email_verified && profile?.email?.endsWith("@example.com")
    //    }

    //    return true
    // },
  }
});
