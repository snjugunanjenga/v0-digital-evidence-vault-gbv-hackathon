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

---

## Phase 6: AI Legal Assistant Feature (Ultra Pro/Enterprise Tier)

**Objective:** Implement the AI-Driven Affidavit Generation feature, integrating external services for transcription and AI document creation, and adding a user validation workflow.

**Full Implementation Plan:** Refer to `docs/future-plan.md` for a comprehensive breakdown of tasks and setup instructions for this phase.

### Sub-Phase 6.1: Infrastructure & Data Processing Setup

- [ ] **Prompt 1.1: Audio Transcription Integration and Schema Update**
    - **Role:** Data Engineer.
    - **Goal:** Integrate AssemblyAI for voice evidence and update the Prisma schema.
    - **Task:**
        1. **Prisma Schema:** Update `schema.prisma` to add a new model, `TestimonyRecord`, linked to an `Evidence` record. It must include fields for `audioFileUrl` (String), `rawTranscript` (String), and `userApprovedSummary` (String).
        2. **AssemblyAI Service:** Create a secure Server Action, `actions/transcribe-audio.ts`. This action must:
            - Accept the `audioFileUrl`.
            - Use an SDK (e.g., `axios`) to call the AssemblyAI API.
            - Store the resulting `rawTranscript` in the `TestimonyRecord` model.
    - **Dependency:** Install the `assemblyai` SDK or `axios`. Define the `ASSEMBLYAI_API_KEY` environment variable.

### Sub-Phase 6.2: User Validation & Gemini Agent Integration

- [ ] **Prompt 2.1: Transcript Summary and User Approval Component**
    - **Role:** Full-Stack Developer & UX Specialist.
    - **Goal:** Create the workflow for the user to confirm the summary of their testimony.
    - **Task:**
        1. **Summary Generation:** In `actions/transcribe-audio.ts`, after receiving the `rawTranscript`, use a Gemini API call with the prompt: "Summarize this raw testimony into 5-7 clear, bulleted factual statements that are relevant to a legal affidavit."
        2. **Summary Storage:** Store this AI-generated summary in the `userApprovedSummary` field temporarily.
        3. **Client Component:** Create a `components/SummaryReview.tsx` component. It should fetch the summary, display it in an editable text area, and contain a "Confirm & Generate Affidavit" button.
        4. **Finalize Action:** On button click, a Server Action `actions/approve-summary.ts` must update the `TestimonyRecord` with the user-edited and approved final summary text.

- [ ] **Prompt 2.2: Gemini Legal Agent Definition**
    - **Role:** AI Prompt Engineer & Legal Analyst.
    - **Goal:** Design the instruction set for the Gemini model to write a legally compliant affidavit.
    - **Task:**
        1. **Agent Definition File:** Create a configuration file (e.g., `agents/affidavit-writer.json`) that defines the System Prompt for the Gemini model.
        2. **System Prompt Content:** The prompt must instruct the AI to:
            - **Persona:** Act as a neutral, formal Legal Assistant.
            - **Input Data:** Use the `userApprovedSummary`, `EvidenceRecord` metadata (Hash, Timestamp, CoC details), and a Kenyan Affidavit Template Structure.
            - **Output:** Generate a draft affidavit in standard legal formatting.
            - **Token Optimization:** Ensure the system prompt is concise and references exact data schema fields.

### Sub-Phase 6.3: Final Affidavit Generation and Export

- [ ] **Prompt 3.1: Affidavit Generation and Export**
    - **Role:** Backend Specialist & Billing Engineer.
    - **Goal:** Execute the final Gemini call, integrate a subscription gate, and provide the export functionality.
    - **Task:**
        1. **Subscription Gate:** In a new Server Action `actions/generate-affidavit.ts`, use the Clerk API to verify the user has a Pro or Ultra Pro subscription. If not, throw a "Subscription Required" error.
        2. **Final Generation:** Call the Gemini API, passing the `userApprovedSummary` and `EvidenceRecord` metadata to the Agent from Prompt 2.2.
        3. **PDF/Export:** Use a library like `react-pdf` to populate a template with the generated text. The exported document must include the Affidavit text and the Digital Evidence Report (ERP) data as an "Exhibit A."
        4. **Deliverable:** Return a secure, temporary link to the generated PDF for the user to download.
