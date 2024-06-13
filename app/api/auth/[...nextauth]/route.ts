import NextAuth from "next-auth";
import AuthOption from "../AuthOptions";

const handler = NextAuth(AuthOption);

export { handler as GET, handler as POST };
