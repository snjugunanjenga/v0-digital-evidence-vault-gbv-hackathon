// Make sure the auth route runs in Node (not Edge) so server-only packages
// like Prisma and NextAuth (server-side) can be used safely.
export const runtime = 'nodejs'

import { handlers } from "@/auth"

export { handlers as GET, handlers as POST }
