# Architect's Plan: Phase 5 & 6 Implementation

**Project:** Digital Evidence Vault
**Architect:** Winston
**Overseen by:** Principal Engineer

## 1. Overview

This document provides the technical blueprint for implementing Phase 5 (Hedera Integration & SaaS Monetization) and Phase 6 (AI Legal Assistant). The architecture prioritizes security, scalability, and modularity.

## 2. Phase 5: Hedera & SaaS Monetization Architecture

### 2.1. System Components

*   **User Frontend:** The existing Next.js dashboard.
*   **Authentication:** Clerk will continue to manage user identity.
*   **Database:** PostgreSQL with Prisma. The `UserUsage` model is already in place.
*   **Payment Gateway:** Stripe will be used for subscription management. We will leverage Clerk Billing for a streamlined integration.
*   **Hedera Service:** The existing `hedera.ts` will be the sole interface for interacting with the Hedera Consensus Service (HCS).

### 2.2. Data Flow & Logic

1.  **Subscription Check:** All premium features, including Hedera timestamping and AI services, will be gated. A server-side utility function, e.g., `lib/subscription.ts`, will be created to check a user's subscription status via Clerk's API.
2.  **Usage Tracking:** The `timestampOnHedera` server action will continue to increment the `timestampCount` in the `UserUsage` model. This logic is already implemented.
3.  **Billing UI:** The `/dashboard/settings/billing` page will be the user's portal for managing their subscription. It will use Clerk's `<Billing />` component, which handles the Stripe integration, to display subscription status, manage payment methods, and view invoices.

### 2.3. Implementation Steps (for Amelia, Developer)

1.  Create `lib/subscription.ts` to house subscription-checking logic.
2.  Integrate the Clerk Billing component into `app/dashboard/settings/billing/page.tsx`.
3.  Refactor the `timestampOnHedera` action to use the centralized `lib/subscription.ts` check instead of the placeholder limit.

## 3. Phase 6: AI Legal Assistant Architecture

### 3.1. System Components

*   **File Storage:** A secure blob storage solution is required for the audio files. Vercel Blob is recommended for its seamless integration with Next.js.
*   **Transcription Service:** AssemblyAI will be used for audio-to-text transcription.
*   **AI Model:** Google's Gemini will be used for summarization and affidavit generation.
*   **PDF Generation:** A library like `react-pdf` or a similar server-side solution will be used to generate the final document.

### 3.2. Data Flow & Logic

1.  **Audio Upload:** The user uploads an audio file on a new evidence page. The file is sent to a server action.
2.  **Secure Storage:** The server action uploads the file to Vercel Blob, gets a secure URL, and stores it in the `TestimonyRecord` model's `audioFileUrl` field.
3.  **Transcription:** A separate server action (`transcribe-audio.ts`) is triggered. It retrieves the audio file URL and sends it to the AssemblyAI API. The raw transcript is stored in `TestimonyRecord`.
4.  **Summarization:** The raw transcript is then sent to the Gemini API to generate a summary, which is stored in `userApprovedSummary`.
5.  **User Review:** The user reviews and can edit the summary in the `SummaryReview.tsx` component. On approval, the final summary is saved.
6.  **Affidavit Generation:** The final, approved summary, along with case metadata, is sent to a final Gemini API call using a specialized prompt to generate the legal affidavit text.
7.  **PDF Export:** The generated text is passed to a PDF generation service, and the user receives a secure download link.

### 3.3. Implementation Steps (for Amelia, Developer)

1.  Integrate Vercel Blob for file storage.
2.  Implement the `TestimonyRecord` model via a Prisma migration.
3.  Create the server action for file upload and storage.
4.  Create the `transcribe-audio.ts` server action with AssemblyAI integration.
5.  Create the `SummaryReview.tsx` component and the associated server actions for approval.
6.  Implement the final `generate-affidavit.ts` action, including the Gemini call and subscription gate.
7.  Integrate a PDF generation library.

## 4. Required Environment Variables

*   `STRIPE_SECRET_KEY`
*   `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
*   `ASSEMBLYAI_API_KEY`
*   `GEMINI_API_KEY` (or similar, depending on the Google Cloud setup)
*   `BLOB_READ_WRITE_TOKEN` (for Vercel Blob)
