import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "./lib/dbConnect";
import bcrypt from "bcryptjs";
import { User } from "./models/user.models";
export const authOption: AuthOptions = {
  pages: {
    signIn: "/login",
    signOut: "/",
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
      async authorize(credentials) {
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
          console.log(credentials.password);
          const match = await bcrypt.compare(
            credentials.password,
            user.password,
          );
          console.log("check ", match);
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
        token.address = user.address;
        token.phone = user.phone;
      }
      return token;
    },
    async session({ token, session }) {
      if (token) {
        session.user._id = (token as any)._id;
        session.user.role = (token as any).role;
        session.user.email = (token as any).email;
        session.user.address = (token as any).address;
        session.user.phone = (token as any).phone;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
