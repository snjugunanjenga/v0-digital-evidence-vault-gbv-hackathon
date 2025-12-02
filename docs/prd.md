# Product Requirements Document (PRD): Digital Evidence Vault

**Version:** 2.0 (Post-Hackathon Pivot)
**Status:** In Development
**Focus:** Enterprise-Grade Security & User Experience

## 1. Overview
The Digital Evidence Vault is a secure platform designed for survivors of Gender-Based Violence (GBV) and supporting organizations. It provides a safe, private, and legally sound method for collecting, preserving, and managing digital evidence for legal proceedings in Kenya.

## 2. Core Features & User Flow

### 2.1. Authentication (NEW)
- **Provider:** Replaced basic Auth.js with **Clerk** for robust, enterprise-grade user management.
- **Flow:** Users can sign up/log in using social providers (Google, Microsoft) or traditional email/password, managed entirely by Clerk's secure infrastructure. This adds multi-factor authentication (MFA) and organization management capabilities out-of-the-box.

### 2.2. Evidence Hashing & Timestamping
- **Core Mechanic:** The platform's primary function is to establish a secure "Chain of Custody" for digital files (images, videos, PDFs).
- **Client-Side Hashing:** When a user uploads evidence, a unique cryptographic hash (SHA-256) is generated *in the browser*. **The file itself is never uploaded to our servers**, ensuring user privacy and data minimization.
- **Server-Side Timestamping with Hedera:** Only the generated hash is sent to the server. The server then submits this hash to the **Hedera Consensus Service (HCS)** to create an immutable, decentralized, and legally admissible timestamp.
- **Evidence Record:** The system stores the hash, the Hedera transaction ID/timestamp, and user-provided metadata (case notes, file name) in the database, creating an immutable record of the evidence's existence and state at a specific point in time.

### 2.3. Monetization & Sustainability
To cover the operational costs of Hedera transactions and ensure the platform's long-term sustainability, a tiered SaaS model is implemented.
- **Provider:** **Clerk Billing** is used to manage subscriptions and integrate seamlessly with **Stripe** for payment processing.
- **Tiers:**
    - **Free:** A limited number of Hedera timestamps per month, designed for individual users.
    - **Pro:** A higher monthly limit of timestamps for professionals and small organizations.
    - **Enterprise:** Unlimited timestamps and dedicated support for large organizations.

## 3. Legal Framework: Admissibility in Kenya
The entire process is designed to comply with the **Kenya Evidence Act (CAP 80), Section 106B**, which governs the admissibility of electronic records in court. Key compliance points:
- **Integrity:** The SHA-256 hash ensures that any modification to the original file can be easily detected.
- **Authenticity:** The timestamp from the Hedera Consensus Service, a decentralized and trusted third party, verifies *when* the evidence was recorded, preventing backdating.
- **Chain of Custody:** The platform provides a clear, documented, and verifiable trail from the moment the evidence is hashed.

The "Export Report" feature will generate a Certificate of Authenticity containing all necessary information for court submission.
