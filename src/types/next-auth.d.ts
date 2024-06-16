import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    verified: boolean | null;
    token: string;
  }
  interface Session {
    user: User & {
      id: string;
      name: string;
      email: string;
      verified: boolean;
      token: string;
    };
    token: {
      id: string;
      name: string;
      email: string;
      verified: boolean;
      token: string;
    };
  }
}
