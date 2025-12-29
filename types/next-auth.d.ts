import { Role } from "@prisma/client";

declare module "better-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string | null;
      role: Role;
    };
  }
}
