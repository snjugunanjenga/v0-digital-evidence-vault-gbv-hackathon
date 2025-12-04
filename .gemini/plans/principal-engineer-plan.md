# Principal Engineer's Implementation Plan

**Project:** Digital Evidence Vault - Phase 5 & 6 Execution
**Lead:** Principal Engineer
**Status:** In Progress

## 1. Overview

This document outlines the comprehensive plan to complete the Digital Evidence Vault project. The focus is on implementing the remaining core features: full Hedera integration, SaaS monetization, document storage, and the AI Legal Assistant. We will also harden the application by fixing existing issues, establishing a robust testing suite, and improving documentation.

## 2. Agent Assignments & Responsibilities

*   **Principal Engineer:** Oversees the project, reviews all code and reports, makes final architectural decisions, and ensures all phases are completed to production standards.
*   **Analyst (Mary):** Will conduct a requirements analysis for the new features, focusing on the business logic for subscriptions, usage tiers, and partnership models.
*   **Architect (Winston):** Will design the system architecture for secure file storage and the data flow for the subscription and usage tracking system.
*   **PM (John):** Will break down the features outlined in this plan into detailed epics and user stories for the development team.
*   **Developer (Amelia):** Will implement the features as defined by the user stories.
*   **Test Architect (Murat):** Will establish the testing framework, write and execute tests for all features, and conduct final Quality Assurance (QA).
*   **Technical Writer (Paige):** Will update the `README.md` and create any necessary user or developer documentation.
*   **UX Designer (Sally):** Will design the user interface and experience for the new billing and file management pages.

## 3. Phased Implementation Plan

### Phase 1: Project Hardening & Test Setup (In Progress)

**Objective:** To create a stable foundation for new feature development.

*   **Task 1.1 (Developer):** Run linting (`npm run lint`) and type-checking (`npx tsc --noEmit`) to identify and resolve any existing codebase issues.
*   **Task 1.2 (Test Architect):** Analyze the project and establish a production-ready E2E testing framework (e.g., Playwright).
*   **Task 1.3 (Test Architect):** Develop baseline E2E tests covering the existing critical paths: user authentication (sign-up/login) and the complete case/evidence creation flow.
*   **Deliverable:** A report from the Developer on code quality improvements and a report from the Test Architect on the testing framework setup and initial test results.

### Phase 2: Hedera Integration & SaaS Monetization

**Objective:** To implement the core business logic and sustainability model.

*   **Task 2.1 (Architect):** Design the database schema and system architecture for tracking user-specific API/service usage based on subscription tiers.
*   **Task 2.2 (UX Designer):** Design the UI for the subscription management/billing page (`/dashboard/settings/billing`).
*   **Task 2.3 (Developer):** Implement the `UserUsage` model and update the `timestampOnHedera` server action to include usage tracking and subscription gating as detailed in `docs/hedera-integration.md`.
*   **Task 2.4 (Developer):** Build the billing page using Clerk Billing components, based on the UX Designer's specifications.
*   **Task 2.5 (Test Architect):** Write comprehensive E2E tests for the Hedera timestamping flow, including testing the usage limits for different subscription tiers.
*   **Deliverable:** An architecture diagram for the SaaS model, UX mockups for the billing page, a functional Hedera integration with usage limits, and a QA report.

### Phase 3: Secure Document Storage

**Objective:** To allow users to securely upload and manage the actual evidence files.

*   **Task 3.1 (Architect):** Finalize the architecture for secure, access-controlled file storage (e.g., using Vercel Blob or a similar service). The architecture must ensure that only the file owner can access their data.
*   **Task 3.2 (Developer):** Implement the file upload functionality on the `/dashboard/evidence/upload` page. This includes the client-side logic for sending the file and the server action for storing it and linking it to the evidence record.
*   **Task 3.3 (Developer):** Implement secure download functionality on the case detail page.
*   **Task 3.4 (Test Architect):** Create E2E tests for the file upload, storage, and secure download process.
*   **Deliverable:** A secure file storage system, integrated with the application, and a QA report confirming its functionality and security.

### Phase 4: AI Legal Assistant (Phase 6 from Build Plan)

**Objective:** Implement the premium AI-driven affidavit generation feature.

*   **Task 4.1 (Developer):** Implement the `TestimonyRecord` model and the AssemblyAI integration for audio transcription, as per `docs/future-plan.md`.
*   **Task 4.2 (UX Designer):** Design the UI for the transcript summary review and approval component.
*   **Task 4.3 (Developer):** Implement the summary review component and the server actions for summary approval and final affidavit generation with Gemini, including the subscription gate.
*   **Task 4.4 (Test Architect):** Test the full AI assistant workflow.
*   **Deliverable:** A functional AI Legal Assistant feature, gated for premium users.

### Phase 5: Finalization & Documentation

**Objective:** To prepare the application for a production release.

*   **Task 5.1 (Technical Writer):** Update the `README.md` to reflect all new features, environment variables, and setup instructions.
*   **Task 5.2 (Test Architect):** Conduct a full regression test of the entire application.
*   **Task 5.3 (All Agents):** Submit final reports to the `docs/reports/` directory.
*   **Deliverable:** An updated README and a final QA sign-off report.

## 4. Reporting

Each agent is required to produce a concise report in Markdown format for each major deliverable. Reports should be saved in `docs/reports/` with the filename format: `<agent-name>_<task-name>_report.md`. The Principal Engineer will review these reports to track progress and quality.
