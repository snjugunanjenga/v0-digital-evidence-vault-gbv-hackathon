# Project Overview: Digital Evidence Vault

## 1. Vision

The **Digital Evidence Vault** is a secure, privacy-centric Progressive Web App (PWA) designed to empower survivors of Technology-Facilitated Gender-Based Violence (TFGBV). It provides a legally sound method for collecting, preserving, and verifying digital evidence, ensuring its admissibility in legal proceedings, specifically tailored to frameworks like the Kenyan Evidence Act.

## 2. Core Functionality

The platform's primary function is to solve the "Chain of Custody" problem for digital files. It achieves this through a three-step process:

1.  **Client-Side Hashing:** The user selects a piece of evidence (image, video, document). The application calculates a unique cryptographic hash (SHA-256) of the file *entirely within the user's browser*. The raw file is never uploaded to the server, guaranteeing user privacy.
2.  **Immutable Timestamping:** The generated hash is sent to the Hedera Consensus Service (HCS), creating a tamper-proof, publicly verifiable timestamp. This provides a definitive "proof of existence" for the evidence at a specific point in time.
3.  **Evidence Management:** Users can organize their timestamped evidence into distinct cases, making it easy to manage and present for legal purposes.

## 3. Advanced Features & Sustainability

To ensure the long-term viability of the platform and offer advanced capabilities, the Digital Evidence Vault incorporates a SaaS model and premium features:

*   **SaaS Monetization:** A tiered subscription model (Free, Pro, Enterprise) managed via Clerk Billing and Stripe covers the operational costs of Hedera transactions and funds further development.
*   **AI Legal Assistant (Premium Feature):** For premium users, the platform offers an innovative AI-powered tool. Users can upload audio testimony, which is transcribed by AssemblyAI. A specialized Google Gemini agent then summarizes the testimony and generates a legally formatted draft affidavit, significantly reducing the time and effort required for legal document preparation.

## 4. Technical Architecture

The project is built on a modern, serverless technology stack, prioritizing security, scalability, and developer experience:

*   **Framework:** Next.js (App Router)
*   **Authentication & Billing:** Clerk and Stripe
*   **Database:** Neon (Serverless Postgres) with Prisma ORM
*   **Timestamping:** Hedera Consensus Service (HCS)
*   **AI Services:** AssemblyAI (Transcription), Google Gemini (Document Generation)
*   **File Storage:** Vercel Blob (for secure, temporary storage of audio files)