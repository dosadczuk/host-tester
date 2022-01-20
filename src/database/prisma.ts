import { PrismaClient } from '@prisma/client'

declare global {
  // allow global `var` declarations
  // noinspection ES6ConvertVarToLetConst
  var Prisma: PrismaClient | undefined
}

export const Prisma = global.Prisma || new PrismaClient({ log: [ 'query' ] })

if (process.env.NODE_ENV !== 'production') {
  global.Prisma = Prisma
}
