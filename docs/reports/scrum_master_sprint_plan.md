# Agile Sprint Plan: Phase 5 & 6

**Project:** Digital Evidence Vault
**Scrum Master:** Bob
**Overseen by:** Principal Engineer

This document breaks down the implementation of Phases 5 and 6 into two distinct sprints.

## Sprint 1: SaaS Monetization & Billing

**Goal:** Implement the core billing and subscription management functionality.

*   **Story 1: Implement Subscription Gating Logic**
    *   **Task:** Create a centralized module (`lib/subscription.ts`) to check user subscription status via the Clerk API.
    *   **Acceptance Criteria:** The function must accurately return the user's current subscription tier (e.g., Free, Pro).
    *   **Agent:** Amelia (Developer)

*   **Story 2: Build the Billing Management Page**
    *   **Task:** Integrate the Clerk Billing component into the `/dashboard/settings/billing` page.
    *   **Acceptance Criteria:** Users can view their current plan, access their billing history, and manage their subscription through the UI.
    *   **Agent:** Amelia (Developer), Sally (UX Designer for review)

*   **Story 3: Refactor Hedera Timestamping Action**
    *   **Task:** Update the `timestampOnHedera` server action to use the new subscription gating logic.
    *   **Acceptance Criteria:** Unsubscribed users are blocked from timestamping, and subscribed users can proceed.
    *   **Agent:** Amelia (Developer)

*   **Story 4: Test Subscription and Billing Flow**
    *   **Task:** Create E2E tests for the billing page and the subscription-gated Hedera action.
    *   **Acceptance Criteria:** Tests must verify that a free-tier user is blocked and a pro-tier user (mocked) can successfully use the feature.
    *   **Agent:** Murat (Test Architect)

## Sprint 2: AI Legal Assistant

**Goal:** Implement the end-to-end AI affidavit generation feature.

*   **Story 1: Implement Secure Audio Upload**
    *   **Task:** Add the `TestimonyRecord` model to the schema and integrate Vercel Blob for secure audio file storage.
    *   **Acceptance Criteria:** Users can upload an audio file, which is securely stored, and a corresponding `TestimonyRecord` is created.
    *   **Agent:** Amelia (Developer), BOB (Database Sub-Agent for migration)

*   **Story 2: Implement Audio Transcription**
    *   **Task:** Create a server action that uses the AssemblyAI API to transcribe the uploaded audio file.
    *   **Acceptance Criteria:** The raw transcript is successfully retrieved and stored in the `TestimonyRecord`.
    *   **Agent:** Amelia (Developer)

*   **Story 3: Implement User Review & Approval Workflow**
    *   **Task:** Create the `SummaryReview.tsx` component. Implement the Gemini API call for summarization and the server action for user approval.
    *   **Acceptance Criteria:** The user can view, edit, and approve the AI-generated summary of their testimony.
    *   **Agent:** Amelia (Developer), Sally (UX Designer)

*   **Story 4: Implement Final Affidavit Generation**
    *   **Task:** Create the `generate-affidavit.ts` server action, including a subscription gate, the final Gemini API call, and PDF export functionality.
    *   **Acceptance Criteria:** A subscribed user can generate a complete PDF affidavit containing the AI-generated text and evidence metadata.
    *   **Agent:** Amelia (Developer)

*   **Story 5: Test AI Assistant Workflow**
    *   **Task:** Create E2E tests for the entire AI Legal Assistant feature.
    *   **Acceptance Criteria:** Tests must cover file upload, transcription, approval, and final PDF generation, including the subscription gate.
    *   **Agent:** Murat (Test Architect)
