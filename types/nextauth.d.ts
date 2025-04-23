import "next-auth";

declare module "next-auth" {
  interface User {
    name?: string;
    id?: string;
    role?: string;
    email?: string;
    address?: string;
    phone?: string;
  }

  interface JWT {
    name?: string;
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
      name?: string;
    };
  }
}
