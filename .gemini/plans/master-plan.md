# Master Implementation Plan

**Project:** Digital Evidence Vault - Full Project Execution
**Lead:** Principal Engineer
**Status:** In Progress

## 1. Overview

This document outlines the comprehensive plan to complete the Digital Evidence Vault project. It synthesizes the original build plan, the principal engineer's plan, and new directives for project documentation and a subscription/partnership model. The goal is to produce a production-ready, well-documented, and sustainable application.

## 2. Agent Assignments & Responsibilities

*   **Principal Engineer:** Oversees the project, reviews all code and reports, makes final architectural decisions, ensures all phases are completed to production standards, and provides regular progress reports to Product Owners.
*   **Technical Writer (Paige):** Will generate comprehensive documentation for the entire project, including the existing codebase and all new features.
*   **Analyst (Mary):** Will conduct a requirements analysis for the new features, focusing on the business logic for subscriptions, usage tiers, partnership models, and cloud storage integration.
*   **Architect (Winston):** Will design the system architecture for secure file storage, the data flow for the subscription, partnership, usage tracking system, and cloud storage integrations.
*   **PM (John):** Will break down the features outlined in this plan into a detailed PRD, epics, and user stories.
*   **Developer (Amelia):** Will implement the features as defined by the user stories.
*   **Test Architect (Murat):** Will establish the testing framework, write and execute tests for all features, and conduct final Quality Assurance (QA).
*   **UX Designer (Sally):** Will design the user interface and experience for the new billing, subscription, partnership, and cloud storage management pages, ensuring the UI/UX effectively communicates the project's story.
*   **Scrum Master (Bob):** Will plan short Agile tasks, ensure sprint planning, create user stories, and craft an impressive narrative about the build and its importance in the digital world for Product Owners.

## 3. Phased Implementation Plan

### Phase 1: Documentation & Project Hardening (Completed)

**Objective:** To create a stable, well-understood foundation for new feature development.

*   **Task 1.1 (Technical Writer):** Execute a deep scan of the project to generate comprehensive technical documentation. A report will be delivered to `docs/reports/technical-writer_documentation_report.md`.
*   **Task 1.2 (Developer):** Run linting (`pnpm lint`) and type-checking (`pnpm tsc --noEmit`) to identify and resolve any existing codebase issues.
*   **Task 1.3 (Test Architect):** Analyze the project and establish a production-ready E2E testing framework (e.g., Playwright).
*   **Task 1.4 (Test Architect):** Develop baseline E2E tests covering the existing critical paths: user authentication and the complete case/evidence creation flow.

### Phase 2: Subscription & Partnership Model (Pending)

**Objective:** To define and design the core business logic and sustainability model.

*   **Task 2.1 (Analyst):** Conduct a requirements analysis for a subscription model focusing on:
    -   Free, lifetime subscriptions for survivors, with a limit of 10 free affidavits or 1 month of free affidavit generation.
    -   Paid services exclusively for partners and institutions (e.g., HR, legal, NGOs).
    -   Research and propose better multi-tiered subscription models for institutions and partners, defining features, usage limits, and potential partnership benefits.
*   **Task 2.2 (Architect):** Based on the Analyst's report, design the database schema and system architecture for tracking user subscriptions and service usage. This includes integration points for a payment provider like Stripe.
*   **Task 2.3 (PM):** Create a detailed Product Requirements Document (PRD) for the subscription and partnership features and break it down into epics and user stories.
*   **Task 2.4 (UX Designer):** Design the UI for the subscription selection page, the billing management page (`/dashboard/settings/billing`), and a dashboard for partners.

### Phase 3: SaaS & Hedera Implementation (Pending)

**Objective:** To build the monetization and core timestamping features.

*   **Task 3.1 (Developer):** Implement the database models (`UserUsage`, `Subscription`, etc.) and update the `timestampOnHedera` server action to include usage tracking and subscription gating.
*   **Task 3.2 (Developer):** Build the billing and subscription management pages using Clerk Billing components or a similar solution, based on the UX Designer's specifications.
*   **Task 3.3 (Test Architect):** Write comprehensive E2E tests for the Hedera timestamping flow, including usage limits for different subscription tiers.

### Phase 4: Secure Document Storage (Pending)

**Objective:** To allow users to securely upload and manage the actual evidence files.

*   **Task 4.1 (Architect):** Finalize the architecture for secure, access-controlled file storage (e.g., using Vercel Blob).
*   **Task 4.2 (Developer):** Implement the file upload/download functionality, integrating it with the evidence records.
*   **Task 4.3 (Test Architect):** Create E2E tests for the file upload, storage, and secure download process.

### Phase 5: AI Legal Assistant (Premium Feature) (Pending)

**Objective:** Implement the premium AI-driven affidavit generation feature.

*   **Task 5.1 (Developer):** Implement the `TestimonyRecord` model and the AssemblyAI integration for audio transcription.
*   **Task 5.2 (UX Designer):** Design the UI for the transcript summary review and approval component.
*   **Task 5.3 (Developer):** Implement the summary review component and the server actions for summary approval and final affidavit generation with Gemini, including the subscription gate.
*   **Task 5.4 (Test Architect):** Test the full AI assistant workflow.

### Phase 6: DIY Cloud Storage Integration (New Feature - Pending)

**Objective:** Allow users to link their Google Drive and OneDrive accounts to reference evidence files directly, without storing the raw files in the vault, and to categorize these linked accounts.

*   **Task 6.1 (Analyst):** Conduct a detailed requirements analysis for Google Drive and OneDrive integration, focusing on user workflows for linking accounts, referencing files, and categorizing connections. Assess impact on current monetization strategy.
*   **Task 6.2 (Architect):** Design the database schema (`ConnectedAccount`, `CloudEvidenceReference`) and system architecture for secure OAuth 2.0 integration with Google Drive and OneDrive. Define secure storage for tokens and API interaction patterns.
*   **Task 6.3 (UX Designer):** Design the user interface for connecting cloud accounts, managing linked accounts (add, remove, categorize), and a file/folder picker within the evidence linking workflow.
*   **Task 6.4 (Developer):** Implement the database models, server actions for OAuth flow (linking/unlinking accounts), API calls to Google Drive/OneDrive for listing files, and the logic for creating `CloudEvidenceReference` records.
*   **Task 6.5 (Developer):** Integrate the UI components for cloud account management and evidence linking into the dashboard.
*   **Task 6.6 (Test Architect):** Develop comprehensive E2E tests for cloud account linking, evidence referencing, and account categorization.

### Phase 7: Finalization & Reporting (Pending)

**Objective:** To prepare the application for a production release.

*   **Task 7.1 (Technical Writer):** Update the `README.md` and all other documentation to reflect all new features, environment variables, and setup instructions.
*   **Task 7.2 (Test Architect):** Conduct a full regression test of the entire application.
*   **Task 7.3 (All Agents):** Submit final reports to the `docs/reports/` directory. The Principal Engineer will consolidate these into a final project report.

---
*This plan is a living document and may be updated as the project progresses.*