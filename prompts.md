# Digital Evidence Vault: Hackathon Build Plan

This document outlines the critical path to building the Digital Evidence Vault. Each phase contains a series of high-leverage prompts designed for a senior developer or an advanced AI agent to execute swiftly and effectively.

**Core Architecture:** Next.js 16 (App Router), Clerk (Authentication), Prisma 7 (ORM), Server Actions (Mutations), Shadcn/UI (Component Library).

---

## Phase 1: Authentication & UI Shell (Completed)

**Objective:** Establish a secure foundation with modern authentication and a basic application layout.

- [x] **Task 1.1: Migrate from NextAuth to Clerk**
    - **Status:** Done.
    - **Details:** Replaced `next-auth` with `@clerk/nextjs`, configured `middleware.ts` (now `proxy.ts`) to protect `/dashboard`, and wrapped the root layout in `<ClerkProvider>`.

- [x] **Task 1.2: Decouple User Model from Local DB**
    - **Status:** Done.
    - **Details:** Removed the `User` model from `schema.prisma`. The `Case` and `Evidence` models now use a `userId: String` to store the Clerk User ID.

---

## Phase 2: Core Dashboard & Case Management

**Objective:** Build the authenticated user's main workspace for creating and viewing evidence cases.

- **Task 2.1: Implement Navigation and User State**
    - **Action:** Modify the primary navbar component (`components/landing/navbar.tsx`) to be dynamic.
    - **Acceptance Criteria:**
        - Unauthenticated users see "Login" and "Sign Up" buttons.
        - Authenticated users see a `<UserButton />` component from Clerk for profile management and logout.
        - Use Clerk's `<SignedIn>`, `<SignedOut>`, and `<UserButton>` components to manage UI state declaratively.

- **Task 2.2: Create the Main Dashboard Page**
    - **Action:** Build the primary dashboard UI at `app/dashboard/page.tsx`. This page will display a list of all cases belonging to the currently logged-in user.
    - **Data Fetching:** Use a Server Component to fetch cases directly.
        - Import the `prisma` client.
        - Use Clerk's `auth()` helper to get the `userId`.
        - Query the `Case` model: `prisma.case.findMany({ where: { userId } })`.
    - **UI:**
        - Use a `<Card>` component from Shadcn for each case in the list, displaying the case `title` and `createdAt` date.
        - Each `Case` card must be a link (`<Link>`) that navigates to `/dashboard/cases/[id]`.
        - Include a "Create New Case" `<Button>` that navigates to `/dashboard/cases/new`. (The creation page will be built in the next task).

- **Task 2.3: Implement Case Creation Logic**
    - **Action:** Create the "New Case" page and the Server Action to handle form submission.
    - **File to Create:** `app/dashboard/cases/new/page.tsx`.
    - **UI:** The page should contain a form with `<Input>` fields for `title` and `<Textarea>` for `description`. Use `zod` and `react-hook-form` for client-side validation.
    - **Server Action (`actions/case.ts`):**
        - Create a new file `lib/actions/case.ts`.
        - Define an async function `createCase(formData: FormData)`.
        - Annotate it with `'use server'`.
        - Inside the action:
            1. Get the `userId` from Clerk's `auth()`. If not found, throw an error.
            2. Extract `title` and `description` from `formData`. Use Zod for server-side validation.
            3. Call `prisma.case.create({ data: { userId, title, description } })`.
            4. Use `revalidatePath('/dashboard')` to refresh the case list.
            5. Use `redirect('/dashboard')` to navigate the user back to the dashboard after successful creation.
    - **Integration:** Hook the Server Action up to the form's `action` attribute.

- **Task 2.4: Build the Case Detail View**
    - **Action:** Create the dynamic page to display a single case and its associated evidence.
    - **File to Create:** `app/dashboard/cases/[id]/page.tsx`.
    - **Data Fetching:** This is a Server Component.
        - Get the `userId` from `auth()`.
        - Get the case `id` from the page `params`.
        - Fetch the case and its related evidence: `prisma.case.findUnique({ where: { id, userId }, include: { evidence: true } })`. Querying by both `id` and `userId` ensures users can only see their own cases.
    - **UI:**
        - Display the case `title` and `description`.
        - List the associated `Evidence` records in a `<Table>` component. The table should show `fileName`, `fileType`, and `uploadDate`.
        - Include an "Upload New Evidence" `<Button>` on this page.

---

## Phase 3: Evidence Management & Cryptography

**Objective:** Implement the core value proposition: secure, client-side hashing and metadata storage for digital evidence.

- **Task 3.1: Create Evidence Upload Page**
    - **Action:** Build a dedicated page for uploading evidence to a specific case.
    - **File to Create:** `app/dashboard/evidence/upload/page.tsx` (or use a Dialog/Modal from the case detail page).
    - **Logic:**
        - The page should accept a `caseId` via search parameter (e.g., `/upload?caseId=...`).
        - The UI will be a form containing a file input and a submit button.

- **Task 3.2: Implement Client-Side Hashing**
    - **Action:** Before upload, generate a SHA-256 hash of the file *in the browser*. This is critical—the raw file never touches the server.
    - **File to Edit:** The evidence upload component/page.
    - **Logic:**
        1. On file selection, use the Web Crypto API (`crypto.subtle.digest`) to calculate the file's SHA-256 hash.
        2. Convert the resulting `ArrayBuffer` to a hex string.
        3. Store the file's `name`, `type`, the calculated `hash`, and the `caseId` in the component's state, ready for submission.

- **Task 3.3: Create Evidence Storage Server Action**
    - **Action:** Write the Server Action to store the evidence metadata. The file itself is NOT transferred.
    - **File to Create:** `lib/actions/evidence.ts`.
    - **Server Action `storeEvidence(metadata)`:**
        - The function will accept an object: `{ caseId: string, fileName: string, fileType: string, fileHash: string }`.
        - Get the `userId` from `auth()`.
        - **Critical Security Check:** Before writing to the DB, verify that the `caseId` provided belongs to the `userId`. Query `prisma.case.findUnique({ where: { id: caseId, userId } })`. If it doesn't exist, throw an unauthorized error.
        - If authorized, call `prisma.evidence.create({ data: { ...metadata, userId } })`.
        - `revalidatePath('/dashboard/cases/[id]')` for the relevant case ID.
        - `redirect(...)` back to the case detail page.

---

## Phase 4: Final Polish & Export

**Objective:** Add the final user-facing features that complete the core loop and deliver a polished product.

- **Task 4.1: Implement Evidence Export**
    - **Action:** On the Case Detail page (`/dashboard/cases/[id]`), add an "Export Case" button.
    - **Logic:** This is a client-side function.
        - On click, gather all the evidence metadata for the current case (it's already available from the initial server component load).
        - Format the data as a clean JSON object.
        - Create a `Blob` of type `application/json`, generate an object URL (`URL.createObjectURL`), and trigger a download for the user.

- **Task 4.2: Implement Hedera Timestamping (Stretch Goal)**
    - **Action:** Create a server-side mechanism to submit an evidence hash to the Hedera Consensus Service (HCS) to create an immutable, verifiable timestamp.
    - **Trigger:** This could be a button on the evidence detail page ("Timestamp with Hedera").
    - **Server Action `timestampOnHedera(evidenceId: string)`:**
        1. Get `userId`, verify ownership of the evidence.
        2. Fetch the evidence record to get its `fileHash`.
        3. Use the Hedera SDK to create a new topic or submit to an existing one. The message will be the `fileHash`.
        4. Store the resulting Hedera transaction ID and timestamp back on the `Evidence` record in your own database.
    - **UI:** Display the Hedera transaction ID and timestamp on the evidence detail page.
