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

## Phase 2: Core Dashboard & Case Management (Completed)

**Objective:** Build the authenticated user's main workspace for creating and viewing evidence cases.

- [x] **Task 2.1: Implement Navigation and User State**
    - **Status:** Done.
    - **Details:** The primary navbar (`components/landing/navbar.tsx`) was reviewed and confirmed to correctly use Clerk's `<SignedIn>` and `<SignedOut>` components to display dynamic user state.

- [x] **Task 2.2: Create the Main Dashboard Page**
    - **Status:** Done.
    - **Details:** The main dashboard page (`app/dashboard/page.tsx`) has been created. It fetches and displays a list of the logged-in user's cases using a Server Component.

- [x] **Task 2.3: Implement Case Creation Logic**
    - **Status:** Done.
    - **Details:** The case creation form (`app/dashboard/cases/new/page.tsx`) and the corresponding `createCase` Server Action (`lib/actions/case.ts`) have been implemented, including server-side validation.

- [x] **Task 2.4: Build the Case Detail View**
    - **Status:** Done.
    - **Details:** The dynamic case detail page (`app/dashboard/cases/[id]/page.tsx`) has been created. It securely fetches case data and displays a list of associated evidence.

---

## Phase 3: Evidence Management & Cryptography (Completed)

**Objective:** Implement the core value proposition: secure, client-side hashing and metadata storage for digital evidence.

- [x] **Task 3.1: Create Evidence Upload Page**
    - **Status:** Done.
    - **Details:** A dedicated page for uploading evidence (`app/dashboard/evidence/upload/page.tsx`) has been created. It correctly receives the `caseId` from the URL search parameters.

- [x] **Task 3.2: Implement Client-Side Hashing**
    - **Status:** Done.
    - **Details:** The evidence upload page now uses the Web Crypto API (`crypto.subtle.digest`) to generate a SHA-256 hash of the selected file entirely within the browser. The raw file is never sent to the server.

- [x] **Task 3.3: Create Evidence Storage Server Action**
    - **Status:** Done.
    - **Details:** The `storeEvidence` Server Action (`lib/actions/evidence.ts`) has been created. It securely validates that the user owns the case before creating the evidence record in the database. The upload page successfully calls this action after hashing is complete.

---

## Phase 4: Final Polish & Export (Completed)

**Objective:** Add the final user-facing features that complete the core loop and deliver a polished product.

- [x] **Task 4.1: Implement Evidence Export**
    - **Status:** Done.
    - **Details:** The `ExportCaseButton` component (`components/dashboard/export-case-button.tsx`) has been created and integrated into the Case Detail page (`app/dashboard/cases/[id]/page.tsx`), allowing users to download case and evidence metadata as a JSON file.

- [x] **Task 4.2: Implement Hedera Timestamping (Stretch Goal)**
    - **Status:** Done.
    - **Details:** The `hederaTransactionId` and `hederaTimestamp` fields were added to the `Evidence` model in `prisma/schema.prisma` and a database migration was applied. The `@hashgraph/sdk` was installed. The `timestampOnHedera` Server Action (`lib/actions/hedera.ts`) was created. The Case Detail page UI (`app/dashboard/cases/[id]/page.tsx`) was updated to display Hedera timestamp information and provide a button to trigger the timestamping action. A `formatDate` utility was added to `lib/utils.ts`.

---

## Phase 5: Hedera Integration & SaaS Monetization

**Objective:** Implement immutable timestamping via Hedera Consensus Service (HCS) and establish a sustainable SaaS model to manage operational costs.

**Details:** This phase involves the complete implementation of Hedera Consensus Service for timestamping evidence hashes, including database schema updates, server actions for Hedera interaction, and UI integration. Additionally, a tiered SaaS billing model (Free, Pro, Enterprise) will be established using Clerk Billing and Stripe, complete with usage tracking and a dedicated billing management page.

**Full Implementation Plan:** Refer to `docs/hedera-integration.md` for a comprehensive breakdown of tasks, code prompts, and setup instructions for this phase.
