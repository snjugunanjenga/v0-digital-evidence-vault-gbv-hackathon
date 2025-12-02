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
- **Server-Side Timestamping:** Only the generated hash is sent to the server. The server then uses a trusted Time Stamping Authority (TSA) to create a legally admissible, verifiable timestamp for that hash.
- **Evidence Record:** The system stores the hash, timestamp, and user-provided metadata (case notes, file name) in the database, creating an immutable record of the evidence's existence and state at a specific point in time.

## 3. Legal Framework: Admissibility in Kenya
The entire process is designed to comply with the **Kenya Evidence Act (CAP 80), Section 106B**, which governs the admissibility of electronic records in court. Key compliance points:
- **Integrity:** The SHA-256 hash ensures that any modification to the original file can be easily detected.
- **Authenticity:** The RFC 3161 compliant timestamp from a neutral third-party TSA verifies *when* the evidence was recorded, preventing backdating.
- **Chain of Custody:** The platform provides a clear, documented, and verifiable trail from the moment the evidence is hashed.

The "Export Report" feature will generate a Certificate of Authenticity containing all necessary information for court submission.
