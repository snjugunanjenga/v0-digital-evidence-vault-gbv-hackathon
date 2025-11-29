import { PrismaClient } from '@prisma/client';

// Prisma CLI `defineConfig` shape is for the Prisma tool/CLI, not the client
// constructor — passing it caused "Unknown property loadedFromFile" errors.
// Create the Prisma client with the default settings here.
// Pass an empty options object to the constructor — some runtime builds
// (and bundles) may access `options.__internal` and expect the argument to
// be an object. Passing `{}` avoids reading properties of `undefined` while
// also not passing the Prisma CLI config object which contains unrelated
// fields.
export const prisma = new PrismaClient({});

export default prisma;
