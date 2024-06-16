import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    confirmed: boolean | null;
  }
  interface Session {
    user: User & {
      id: string;
      name: string;
      email: string;
      confirmed: boolean;
    };
    token: {
      id: string;
      name: string;
      email: string;
      confirmed: boolean;
    };
  }
}
