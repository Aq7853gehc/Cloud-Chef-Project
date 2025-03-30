import "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    role?: string;
    email?: string;
  }

  interface JWT {
    _id?: string;
    role?: string;
    email?: string;
  }

  interface Session {
    user: {
      _id?: string;
      role?: string;
      email?: string;
    };
  }
}
