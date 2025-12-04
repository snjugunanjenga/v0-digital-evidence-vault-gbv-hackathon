import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  async function main() {
  console.log('Seeding database...');

  // No longer seeding users directly, as they are managed by Clerk.
  // You can add other seeding logic here if needed for Cases, Evidence, etc.

  console.log('Database seeded successfully.');
}
  console.log('Database seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
