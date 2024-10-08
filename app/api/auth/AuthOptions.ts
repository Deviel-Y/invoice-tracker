import prisma from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const AuthOption: NextAuthOptions = {
  pages: {
    signIn: "/userAuth/signin",
  },

  callbacks: {
    async redirect({ url, baseUrl }) {
      url.startsWith("/") ? `${url}` : `${baseUrl}`;

      return baseUrl;
    },

    async jwt({ token, user, session, trigger }) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }

      return { ...user, ...token };
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },

  adapter: PrismaAdapter(prisma),

  session: { strategy: "jwt" },

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "John@example.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const isPasswordsMatch: boolean = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        return isPasswordsMatch ? user : null;
      },
    }),
  ],
};

export default AuthOption;
