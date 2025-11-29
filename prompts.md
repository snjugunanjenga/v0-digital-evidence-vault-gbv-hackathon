# Digital Evidence Vault: AI-Assisted Implementation Guide

This document provides a step-by-step guide for an AI coding agent to build the Digital Evidence Vault application. Follow each step sequentially.

---

## Phase 1: Project Setup & Database Configuration

**Objective:** Initialize the Next.js project, set up Prisma ORM, and configure a serverless Postgres database with Neon.

- [x] **Task 1.1: Initialize Next.js Project**
    - **Action:** Create a new Next.js 16+ project with the App Router.
    - **Command:** `npx create-next-app@latest digital-evidence-vault --typescript --tailwind --eslint`
    - **Verification:** The project directory `digital-evidence-vault` is created and `npm run dev` starts the server successfully.

- [x] **Task 1.2: Install Prisma & Dependencies**
    - **Action:** Add Prisma ORM, the Prisma client, and the Neon serverless database adapter.
    - **Command:** `npm install prisma @prisma/client @prisma/adapter-neon`
    - **Command:** `npm install -D @types/node`
    - **Verification:** The dependencies are added to `package.json`.

- [x] **Task 1.3: Initialize Prisma**
    - **Action:** Set up the initial Prisma configuration.
    - **Command:** `npx prisma init`
    - **Verification:** A `prisma` directory with a `schema.prisma` file and a `.env` file are created.

- [x] **Task 1.4: Configure Database Connection**
    - **Action:** Update the `.env` file with the Neon database connection string.
    - **File to Edit:** `.env`
    - **Content:**
      ```
      DATABASE_URL="prisma://aws-us-east-2.neon.tech/digital-evidence-vault?pg-bouncer=true&sslmode=require&connection_limit=1&adapter=neon"
      ```
    - **Note:** The developer will need to replace the placeholder with their actual Neon connection string.

- [x] **Task 1.5: Define Database Schema**
    - **Action:** Define the data models for `User`, `Case`, and `Evidence` in the Prisma schema.
    - **File to Edit:** `prisma/schema.prisma`
    - **Content:**
      ```prisma
      generator client {
        provider = "prisma-client-js"
      }

      datasource db {
        provider = "postgresql"
        url      = env("DATABASE_URL")
      }

      model User {
        id        String     @id @default(cuid())
        email     String     @unique
        password  String
        createdAt DateTime   @default(now())
        updatedAt DateTime   @updatedAt
        cases     Case[]
      }

      model Case {
        id          String    @id @default(cuid())
        title       String
        description String?
        createdAt   DateTime  @default(now())
        updatedAt   DateTime  @updatedAt
        userId      String
        user        User      @relation(fields: [userId], references: [id])
        evidence    Evidence[]
      }

      model Evidence {
        id          String    @id @default(cuid())
        fileName    String
        fileType    String
        fileHash    String    @unique
        uploadDate  DateTime  @default(now())
        caseId      String
        case        Case      @relation(fields: [caseId], references: [id])
      }
      ```

- [x] **Task 1.6: Push Schema to Database**
    - **Action:** Apply the schema changes to the Neon database.
    - **Command:** `npx prisma db push`
    - **Verification:**
        - The command completes successfully.
        - Run `npx prisma studio` to open the database browser and verify that the `User`, `Case`, and `Evidence` tables are created.

---

## Phase 2: Authentication & User Management

**Objective:** Implement user authentication using NextAuth.js.

- [x] **Task 2.1: Install NextAuth.js**
    - **Action:** Add the NextAuth.js library.
    - **Command:** `npm install next-auth`
    - **Verification:** The dependency is added to `package.json`.

- [x] **Task 2.2: Create NextAuth.js API Route**
    - **Action:** Create the dynamic API route for NextAuth.js to handle authentication requests.
    - **File to Create:** `app/api/auth/[...nextauth]/route.ts`
    - **Content:**
      ```typescript
      import NextAuth from "next-auth";
      import CredentialsProvider from "next-auth/providers/credentials";
      import { PrismaClient } from "@prisma/client";
      import bcrypt from "bcrypt";

      const prisma = new PrismaClient();

      export const authOptions = {
        providers: [
          CredentialsProvider({
            name: "Credentials",
            credentials: {
              email: { label: "Email", type: "text" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
              if (!credentials?.email || !credentials.password) {
                return null;
              }

              const user = await prisma.user.findUnique({
                where: { email: credentials.email }
              });

              if (user && await bcrypt.compare(credentials.password, user.password)) {
                return { id: user.id, email: user.email };
              } else {
                return null;
              }
            }
          })
        ],
        session: {
          strategy: "jwt",
        },
        pages: {
          signIn: '/login',
        },
      };

      const handler = NextAuth(authOptions);
      export { handler as GET, handler as POST };
      ```
    - **Note:** `bcrypt` will be installed in the next step.

- [x] **Task 2.3: Install bcrypt**
    - **Action:** Add `bcrypt` for password hashing.
    - **Command:** `npm install bcrypt && npm install -D @types/bcrypt`
    - **Verification:** The dependencies are added to `package.json`.

- [x] **Task 2.4: Create Authentication UI**
    - **Action:** Create the login and signup pages.
    - **File to Create:** `app/login/page.tsx`
    - **Content:** (A basic login form using Tailwind CSS and React state)
    - **File to Create:** `app/signup/page.tsx`
    - **Content:** (A basic signup form that sends data to a signup API route)

- [x] **Task 2.5: Create Signup API Route**
    - **Action:** Create an API route to handle user registration.
    - **File to Create:** `app/api/signup/route.ts`
    - **Content:**
      ```typescript
      import { PrismaClient } from "@prisma/client";
      import bcrypt from "bcrypt";
      import { NextResponse } from "next/server";

      const prisma = new PrismaClient();

      export async function POST(req: Request) {
        const { email, password } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
          const user = await prisma.user.create({
            data: { email, password: hashedPassword },
          });
          return NextResponse.json({ user });
        } catch (error) {
          return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }
      }
      ```
    - **Verification:**
        - Navigate to `/signup`, create a user.
        - Use Prisma Studio to verify the user is in the database.
        - Navigate to `/login`, log in as the new user.

---

## Phase 3: Core Logic - Evidence Upload & Hashing

**Objective:** Implement the core functionality for uploading evidence files and generating a cryptographic hash.

- [x] **Task 3.1: Create File Upload Component**
    - **Action:** Build a React component for file selection and upload.
    - **File to Create:** `components/evidence-upload-form.tsx`
    - **Libraries:** Use `react-dropzone` for a better UX.
    - **Command:** `npm install react-dropzone`
    - **Content:** (A form with a dropzone, file metadata inputs, and a submit button)

- [x] **Task 3.2: Implement Client-Side Hashing**
    - **Action:** Use the Web Crypto API to generate a SHA-256 hash of the selected file in the browser.
    - **File to Edit:** `components/evidence-upload-form.tsx`
    - **Logic:**
      ```typescript
      const handleFileChange = async (acceptedFiles) => {
        const file = acceptedFiles[0];
        const buffer = await file.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        // Set the hash in the component's state
      };
      ```
    - **Verification:**
        - Select a file in the upload form.
        - The SHA-256 hash is generated and displayed in the console or on the page.

---

## Phase 4: API & Database Integration

**Objective:** Connect the frontend to the backend to store evidence metadata.

- [x] **Task 4.1: Create Evidence Submission API Route**
    - **Action:** Create an API route to handle the submission of evidence metadata.
    - **File to Create:** `app/api/evidence/route.ts`
    - **Logic:**
      - The route should be protected and only accessible to authenticated users.
      - It should accept `fileName`, `fileType`, `fileHash`, and `caseId`.
      - It should create a new `Evidence` record in the database.
    - **Verification:**
        - Send a POST request to `/api/evidence` with valid data and an authentication token.
        - Verify the new evidence record is created in the database using Prisma Studio.

- [x] **Task 4.2: Connect Frontend to API**
    - **Action:** Update the evidence upload form to send the file metadata and hash to the API endpoint.
    - **File to Edit:** `components/evidence-upload-form.tsx`
    - **Logic:**
      - On form submission, make a `fetch` POST request to `/api/evidence`.
      - Handle success and error responses.
    - **Verification:**
        - Upload a file using the UI.
        - The evidence record should appear in the database.

---

## Phase 5: UI/UX & Evidence Export

**Objective:** Build the user interface for viewing and managing evidence, and implement the evidence export functionality.

- [x] **Task 5.1: Create Dashboard Page**
    - **Action:** Create a dashboard page to display the user's cases and evidence.
    - **File to Create:** `app/dashboard/page.tsx`
    - **Logic:**
      - Fetch the user's cases and evidence from the database using a server component.
      - Display the data in a user-friendly format (e.g., a table or cards).

- [x] **Task 5.2: Implement Evidence Detail View**
    - **Action:** Create a dynamic route to show the details of a specific piece of evidence.
    - **File to Create:** `app/dashboard/evidence/[id]/page.tsx`
    - **Logic:**
      - Fetch the evidence details by ID.
      - Display all metadata, including the file hash.

- [x] **Task 5.3: Create Evidence Export Functionality**
    - **Action:** Add a button to the evidence detail page to export the evidence metadata as a JSON file.
    - **File to Edit:** `app/dashboard/evidence/[id]/page.tsx`
    - **Logic:**
      - On button click, create a JSON object with the evidence data.
      - Create a Blob from the JSON data.
      - Create a download link and trigger a download.
      ```typescript
      const handleExport = () => {
        const json = JSON.stringify(evidenceData, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `evidence-${evidenceData.id}.json`;
        a.click();
        URL.revokeObjectURL(url);
      };
      ```
    - **Verification:**
        - Navigate to an evidence detail page.
        - Click the "Export" button.
        - A JSON file with the evidence data should be downloaded.

---
**Note:** All features have been implemented and tests have been undertaken to ensure functionality.