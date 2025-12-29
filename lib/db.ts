// import { PrismaClient } from "@prisma/client"

// declare global {
//     var prisma: PrismaClient | undefined
// }

// export const prisma = globalThis.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { env } from "./env";

const connectionString = `${env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };
