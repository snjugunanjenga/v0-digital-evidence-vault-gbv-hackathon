import { PrismaClient } from '@prisma/client'
import { Pool } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

const neon = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaNeon(neon)

export const prisma =
  global.prisma ||
  new PrismaClient({
    adapter,
  })

if (process.env.NODE_ENV !== 'production') global.prisma = prisma
