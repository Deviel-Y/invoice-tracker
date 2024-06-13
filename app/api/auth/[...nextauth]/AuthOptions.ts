import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import prisma from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";

export const AuthOption: AuthOptions = {
  adapter: PrismaAdapter(prisma),

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
      authorize: async (credentials, req) => {
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
