# Product Requirements Document (PRD): Digital Evidence Vault

**Version:** 1.0 (Hackathon MVP)
**Status:** Approved
**Target:** 12-Hour Build
**Legal Context:** Kenya Evidence Act CAP 80, Section 106B (Admissibility of Electronic Records)

## 1. Executive Summary
The **Digital Evidence Vault** is a Progressive Web App (PWA) designed to help survivors of Technology-Facilitated GBV (TFGBV) collect and preserve digital evidence (screenshots, videos, documents). It solves the "Chain of Custody" problem by calculating a cryptographic hash ($SHA-256$) of the file on the client side and securing it with a third-party verifiable timestamp, ensuring the evidence is admissible in Kenyan courts.

## 2. Technical Stack
* **Framework:** Next.js 16 (App Router)
* **Database:** Neon (Serverless Postgres)
* **ORM:** Prisma (with `@prisma/adapter-neon`)
* **Auth:** Auth.js (v5) - *Simple User Session/OAuth*
* **Security:** Web Cryptography API (Client-side Hashing)
* **Timestamping:** RFC 3161 Compliant TSA (e.g., FreeTSA) or Mock for MVP.
* **Styling:** Tailwind CSS

## 3. Core User Flows
1.  **Secure Upload:** User uploads a file. The app **never** sends the file to the server. It calculates the hash locally.
2.  **Integrity Proof:** The app sends *only* the hash to the server. The server timestamps this hash via an external TSA and logs the result.
3.  **Evidence Report:** User downloads a PDF/JSON report containing the Metadata, Hash, and Timestamp Token, serving as a valid Certificate of Authenticity.

## 4. Database Schema (Conceptual)
* **User:** `id`, `email`, `name`
* **EvidenceRecord:**
    * `id` (UUID)
    * `userId` (FK)
    * `fileHash` (String - SHA256)
    * `fileName` (String)
    * `description` (String)
    * `tsaTokenId` (String - from TSA authority)
    * `tsaTimestamp` (DateTime - from TSA authority)
    * `createdAt` (DateTime - System time)

## 5. Functional Requirements
* **FR-01:** Client-side drag-and-drop zone.
* **FR-02:** Immediate SHA-256 calculation with progress indicator.
* **FR-03:** Server Action to receive Hash + Metadata and fetch TSA proof.
* **FR-04:** Dashboard showing list of "Vaulted Evidence."
* **FR-05:** "Export Report" feature generating a PDF with the legal "Section 106B" boilerplate text.

## 6. Non-Functional Requirements
* **Privacy:** The actual evidence file must NOT be stored on the server (User keeps the original).
* **Performance:** Hashing must support files up to 50MB without crashing the browser.
* **Admissibility:** Timestamps must come from an external source, not the system clock.