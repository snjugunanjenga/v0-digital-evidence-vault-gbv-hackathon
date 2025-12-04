# System Architecture

This document provides a detailed overview of the technical architecture of the Digital Evidence Vault.

## 1. Frontend

The frontend is a modern web application built with **Next.js 16** using the **App Router**. This choice enables a powerful combination of Server-Side Rendering (SSR) and client-side interactivity.

*   **Framework:** [Next.js](https://nextjs.org/) (App Router)
*   **Library:** [React 19](https://react.dev/)
*   **UI Components:** The user interface is built using [Shadcn/UI](https://ui.shadcn.com/), a collection of accessible and composable components built on top of Radix UI and styled with Tailwind CSS. This provides a consistent and modern design system.
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) is used for all styling, enabling a utility-first approach that is highly maintainable.
*   **Forms:** Form handling is managed by [React Hook Form](https://react-hook-form.com/) for performance and scalability, with schema validation powered by [Zod](https://zod.dev/).

## 2. Backend

The backend logic is co-located with the frontend code, leveraging the server-side capabilities of Next.js.

*   **Runtime:** Node.js
*   **API Layer:** The application does **not** use a traditional REST or GraphQL API. Instead, it exclusively uses **Next.js Server Actions** for all backend mutations (creating, updating, deleting data). This simplifies the architecture by allowing client components to directly and securely call server-side functions.
*   **Server-Side Rendering:** Data fetching for initial page loads is primarily done within React Server Components (RSCs), which run on the server and have direct access to the database and other resources.

## 3. Authentication

User authentication and management are handled by **Clerk**.

*   **Provider:** [@clerk/nextjs](https://clerk.com/docs/references/nextjs/overview)
*   **Strategy:** Clerk provides a complete, out-of-the-box solution for sign-up, sign-in, user profiles, and session management. It integrates seamlessly with Next.js middleware to protect routes and manage user sessions.
*   **User Model:** The application does not maintain its own `User` table in the database. Instead, it references the Clerk `userId` as a foreign key in other models (like `Case` and `Evidence`), making Clerk the single source of truth for user identity.

## 4. Database

The application uses a PostgreSQL database, managed by the Prisma ORM.

*   **Database:** PostgreSQL
*   **ORM:** [Prisma](https://www.prisma.io/) is used for all database interactions. It provides a type-safe query builder, migration management, and a clear, declarative schema definition in `prisma/schema.prisma`.
*   **Adapter:** The `@prisma/adapter-pg` is used to efficiently connect to the PostgreSQL database.

## 5. Hedera Integration

To ensure the immutability and public verifiability of evidence, the application integrates with the Hedera Consensus Service (HCS).

*   **Service:** Hedera Consensus Service (HCS)
*   **SDK:** The official [@hashgraph/sdk](https://github.com/hashgraph/hedera-sdk-js) is used to communicate with the Hedera network.
*   **Workflow:**
    1.  A user finalizes an evidence record in the application.
    2.  They can trigger a "Timestamp on Hedera" server action.
    3.  This action sends a message containing the evidence hash and other metadata to a specific Hedera topic.
    4.  The Hedera network assigns a consensus timestamp to the message.
    5.  The transaction ID and the consensus timestamp are then saved back to the application's database, permanently linking the evidence record to the immutable ledger.
