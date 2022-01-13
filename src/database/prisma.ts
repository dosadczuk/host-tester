import { PrismaClient } from "@prisma/client";

export const Prisma = Object.freeze({
  instance: new PrismaClient()
})
