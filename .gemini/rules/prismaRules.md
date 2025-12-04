# 💡 AI Prompt: Integrate Prisma 7 with Next.js 16

**Role:** You are an expert software agent specializing in TypeScript, Next.js, and Prisma. Your task is to configure the current Next.js project to use Prisma 7 as its ORM for connecting to a PostgreSQL database.

**Purpose:** To set up Prisma 7, generate a client, and demonstrate modern data access patterns within a Next.js 16 App Router project.

**Scope:**
- Must be run inside an existing Next.js project.
- Assumes a PostgreSQL database is available and its connection string is ready.
- Focuses on Server Components and Server Actions.

---

## 🛠️ Instructions

### 1. Install Dependencies

Install the Prisma CLI as a development dependency, the Prisma Client, and the necessary PostgreSQL driver adapter.

```bash
npm install prisma --save-dev
npm install @prisma/client @prisma/adapter-pg pg
```

### 2. Initialize Prisma

Set up the necessary Prisma configuration files. This command creates a `prisma` directory with a `schema.prisma` file, a `.env` file, and a `prisma.config.ts` file.

```bash
npx prisma init
```

### 3. Configure Prisma for v7

**a. Environment Variables (.env)**

Your `.env` file should contain the database connection string. For serverless databases like Neon, you may need a `directUrl` for migrations.

```dotenv title=".env"
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DATABASE"
# Optional: DIRECT_URL for migrations if your provider requires it
# DIRECT_URL="postgresql://USER:PASSWORD@HOST/DATABASE"
```

**b. Prisma Schema (prisma/schema.prisma)**

The `datasource` block in your schema should **only** define the `provider`. The connection `url` is now handled in `prisma.config.ts`.

```prisma title="prisma/schema.prisma"
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  // The 'url' and 'directUrl' properties are NOT set here in Prisma 7
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
}
```

**c. Prisma Configuration (prisma.config.ts)**

This file is the central place for Prisma CLI configuration. It must explicitly load environment variables and define the datasource URL.

```typescript title="prisma/config.ts"
import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: './prisma/schema.prisma',
  migrations: {
    path: './prisma/migrations',
  },
  datasource: {
    // Use the `env` helper to load the connection string from .env
    url: env('DATABASE_URL'),
    // If you have a directUrl for migrations, define it here as well
    // directUrl: env('DIRECT_URL')
  },
});
```

### 4. Create a Centralized Prisma Client

To avoid creating multiple instances of `PrismaClient` in a serverless environment, create a singleton module.

1.  Create a new file at `lib/prisma.ts`.
2.  Add the following code to instantiate and export a single, reusable Prisma client.

    ```typescript title="lib/prisma.ts"
    import { PrismaClient } from '@prisma/client';

    const globalForPrisma = globalThis as unknown as {
      prisma: PrismaClient | undefined;
    };

    export const prisma =
      globalForPrisma.prisma ??
      new PrismaClient({
        log: ['query'],
      });

    if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
    ```

### 5. Generate the Prisma Client

After defining your models, generate the TypeScript client.

```bash
npx prisma generate
```

### 6. Run Migrations

To create the database tables based on your schema, run the migrate command.

```bash
npx prisma migrate dev --name "init"
```

---

## ✅ Usage Patterns in Next.js 16

(Usage patterns for Server Components and Server Actions remain the same as in the previous version.)

### Server Component (Data Fetching)

```tsx title="app/users/page.tsx"
import { prisma } from '@/lib/prisma';

export default async function UsersPage() {
  const users = await prisma.user.findMany();
  // ... render users
}
```

### Server Action (Data Mutation)

```tsx title="app/users/page.tsx"
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export default async function UsersPage() {
  const users = await prisma.user.findMany();

  async function addUser(formData: FormData) {
    'use server';
    // ... create user logic
    await prisma.user.create({ ... });
    revalidatePath('/users');
  }

  return (
    <main>
      {/* ... */}
      <form action={addUser}>
        {/* ... form fields ... */}
      </form>
    </main>
  );
}
```