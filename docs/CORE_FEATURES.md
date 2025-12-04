# Core Features

This document describes the main features of the Digital Evidence Vault, from the user's perspective and with details about the technical implementation.

## 1. User Authentication

**User Flow:**

*   New users can sign up for an account using their email address and a password or by using social sign-on (e.g., Google).
*   Existing users can log in to access their dashboard.
*   Once logged in, users can manage their profile and settings through the Clerk-provided components.

**Technical Implementation:**

*   Authentication is managed entirely by the `@clerk/nextjs` package.
*   The root layout (`app/layout.tsx`) is wrapped in a `<ClerkProvider>` to make authentication state available throughout the app.
*   A custom middleware file (`proxy.ts`) protects all routes under the `/dashboard` path, redirecting unauthenticated users to the login page.
*   The sign-up and sign-in pages are located at `/signup` and `/login` respectively, and they use Clerk's pre-built UI components for a seamless experience.
*   The user's unique ID from Clerk is stored as `userId` on the `Case` and `Evidence` models to associate data with a user.

## 2. Case Management

**User Flow:**

*   From the main dashboard (`/dashboard`), a user can see a list of all their evidence cases.
*   They can click a "Create New Case" button to navigate to the case creation form (`/dashboard/cases/new`).
*   On the form, they provide a title and a description for the case.
*   Upon submission, the new case is created, and the user is redirected to the detail page for that case (`/dashboard/cases/[id]`).
*   The case detail page displays the case information and a list of all evidence associated with it.

**Technical Implementation:**

*   The dashboard page (`app/dashboard/page.tsx`) is a React Server Component that fetches all cases for the currently logged-in user directly from the database using Prisma.
*   The new case form uses a Server Action (`lib/actions/case.ts#createCase`) to handle the form submission.
*   The `createCase` action includes server-side validation using Zod to ensure the data is valid before attempting to create the database record. It also enforces that a `userId` is present, ensuring only authenticated users can create cases.
*   The dynamic case detail page (`app/dashboard/cases/[id]/page.tsx`) fetches the specific case data and its related evidence records. It includes a security check to ensure that the logged-in user is the owner of the case they are trying to view.

## 3. Evidence Hashing & Upload

**User Flow:**

*   From a case detail page, a user can click "Add Evidence" to go to the evidence upload page (`/dashboard/evidence/upload`).
*   The user selects a digital file from their device.
*   The application's frontend code reads the file **in the browser** and calculates its SHA-256 hash using the Web Crypto API. The file itself is never sent to the server.
*   The user then fills in metadata about the evidence, such as a title and description.
*   Upon submission, the calculated hash and the metadata are sent to the server and stored as a new evidence record linked to the case.

**Technical Implementation:**

*   The evidence upload page (`app/dashboard/evidence/upload/page.tsx`) contains the client-side logic for file handling and hashing.
*   The Web Crypto API (`crypto.subtle.digest`) is used for generating the SHA-256 hash. This is a standard, secure API available in all modern browsers.
*   The form submission is handled by the `storeEvidence` Server Action in `lib/actions/evidence.ts`.
*   This action performs a critical security check: it verifies that the `userId` of the logged-in user matches the `userId` on the parent `Case` record before creating the `Evidence` record. This prevents one user from adding evidence to another user's case.

## 4. Hedera Timestamping

**User Flow:**

*   On the case detail page, each piece of evidence that has not yet been timestamped has a "Timestamp on Hedera" button.
*   When the user clicks this button, a request is sent to the Hedera network.
*   After a few moments, the page updates to show the Hedera Transaction ID and the official Consensus Timestamp.

**Technical Implementation:**

*   The "Timestamp on Hedera" button triggers the `timestampOnHedera` Server Action in `lib/actions/hedera.ts`.
*   This action uses the `@hashgraph/sdk` to create and submit a `TopicMessageSubmitTransaction`.
*   The message sent to the Hedera topic contains the evidence hash, file name, and other relevant metadata.
*   Once the transaction reaches consensus on the Hedera network, the action retrieves the transaction ID and consensus timestamp.
*   It then updates the corresponding `Evidence` record in the database with this information.
*   The frontend uses Server Action state hooks to show a loading indicator and update the UI with the new data upon completion.

## 5. Data Export

**User Flow:**

*   On a case detail page, the user can click an "Export Case" button.
*   This will generate and download a JSON file containing all the metadata for the case and a list of all its associated evidence records, including their hashes and Hedera timestamps (if available).

**Technical Implementation:**

*   The `ExportCaseButton` (`components/dashboard/export-case-button.tsx`) is a client component that fetches the case data.
*   When clicked, it constructs a JSON object from the data and uses a utility function to create a `Blob` and trigger a file download in the browser.
*   This process is done entirely on the client side, ensuring a fast and responsive user experience.
