import "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    role?: string;
    email?: string;
    address?: string;
    phone?: string;
  }

  interface JWT {
    _id?: string;
    role?: string;
    email?: string;
    address?: string;
    phone?: string;
  }

  interface Session {
    user: {
      _id?: string;
      role?: string;
      email?: string;
      address?: string;
      phone?: string;
    };
  }
}
