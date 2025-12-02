# ERP Documentation

This document provides a high-level overview of the Digital Evidence Vault project, including its architecture, key dependencies, and file structure. It is intended for developers and technical stakeholders.

## Project Overview: Digital Evidence Vault

## Tree View & File Descriptions

```
/
├── app/                  # Next.js App Router: Contains all pages, layouts, and API routes.
│   ├── dashboard/        # Protected routes for authenticated users (case management, uploads).
│   ├── api/              # API routes (if any, most mutations via Server Actions).
│   ├── [auth]/           # Authentication-related pages (sign-in, sign-up) via Clerk.
│   ├── layout.tsx        # Root layout for the entire application.
│   └── page.tsx          # The public landing page.
├── components/           # Shared and reusable React components.
│   ├── ui/               # Core UI elements from Shadcn/UI (Button, Card, Input, etc.).
│   ├── dashboard/        # Components specific to the user dashboard.
│   ├── landing/          # Components used only on the public landing page.
│   └── auth/             # Authentication-related components (Login/Signup forms).
├── lib/                  # Core logic, utilities, and server-side code.
│   ├── actions/          # Server Actions for handling form submissions and data mutations.
│   ├── prisma.ts         # Prisma client instance for database interaction.
│   └── utils.ts          # Utility functions used across the application.
├── prisma/               # Prisma configuration and database schema.
│   └── schema.prisma     # Defines the database models, relations, and fields.
├── public/               # Static assets (images, icons, fonts).
├── .env.example          # Example environment variables.
├── next.config.mjs       # Configuration for the Next.js framework.
├── package.json          # Project metadata and list of dependencies.
└── tsconfig.json         # TypeScript compiler configuration.
```

## Key Dependencies

-   `@clerk/nextjs`: Handles user authentication, identity, and session management.
-   `@prisma/client`: A type-safe Node.js ORM used to interact with the database.
-   `next`: The core React framework, utilizing the App Router.
-   `react`: The JavaScript library for building user interfaces.
-ag   `shadcn/ui` & `radix-ui`: A collection of accessible and reusable UI components, built on Radix UI primitives.
-   `tailwindcss`: A utility-first CSS framework for rapid UI development.
-   `zod`: A TypeScript-first schema declaration and validation library.
-   `lucide-react`: A library of simple and clean SVG icons.

## Architecture

This project is a modern, full-stack web application built with the **Next.js 16 App Router**.

-   **Frontend:** The UI is constructed with **React** and styled using **Tailwind CSS** with components from **Shadcn/UI**.
-   **Backend:** Backend logic is primarily handled by **React Server Components** and **Server Actions**, which run on the server and can directly access the database.
-   **Database & ORM:** A **PostgreSQL** database is managed through the **Prisma ORM**, which provides type-safe database access.
-   **Authentication:** User identity and access control are managed by **Clerk**.
-   **Type-Safety:** The entire codebase is written in **TypeScript**, with data validation enforced by **Zod**.