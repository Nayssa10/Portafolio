import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const hasAllModels = (client?: PrismaClient) => {
  return Boolean(client && "certificate" in client);
};

export const prisma =
  (hasAllModels(globalForPrisma.prisma) ? globalForPrisma.prisma! : null) ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
