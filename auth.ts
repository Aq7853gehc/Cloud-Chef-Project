import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "./lib/dbConnect";
import bcrypt from "bcryptjs";
import { User } from "./models/user.models";
import { AnyARecord } from "dns";
export const authOption: AuthOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.email && !credentials?.password) {
          throw new Error("Credential Missing");
        }

        await dbConnect();
        try {
          const user = await User.findOne({
            email: credentials?.email,
          });

          if (!user) {
            throw new Error("NO User Found");
          }

          const match = await bcrypt.compare(
            user.password,
            credentials.password
          );

          if (match) {
            return user;
          } else {
            throw new Error("Incorrect Password");
          }
        } catch (error) {
          // throw new Error(error)
          console.error(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },
    async session({ token, session }) {
      if (token) {
        session.user._id = (token as any)._id;
        session.user.role = (token as any).role;
        session.user.email = (token as any).email;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
