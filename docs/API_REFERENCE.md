# API Reference (Server Actions)

This document provides a detailed reference for the Server Actions, which constitute the backend API of the Digital Evidence Vault application. All actions are defined in the `lib/actions/` directory.

---

## `lib/actions/auth.ts`

### `auth()`

*   **Description:** A re-export of the `auth()` function from the `@clerk/nextjs/server` package. It is the primary utility for accessing the current user's authentication state on the server.
*   **Parameters:** None.
*   **Returns:** An object containing the `userId` and other session details if the user is authenticated, otherwise returns `null`.
*   **Usage:** Called at the beginning of almost every Server Action to ensure the user is logged in and to retrieve their unique ID.

---

## `lib/actions/case.ts`

### `createCase(formData: FormData)`

*   **Description:** Creates a new evidence case for the currently authenticated user.
*   **Parameters:**
    *   `formData` (`FormData`): The form data submitted by the user. Must contain `title` (string) and an optional `description` (string).
*   **Returns:** `Promise<void>`. Redirects the user upon completion.
*   **Security:** Throws an error if the user is not authenticated.
*   **Side Effects:**
    *   Creates a new `Case` record in the database.
    *   Revalidates the `/dashboard` and `/dashboard/cases` paths to update the UI.

### `getCases()`

*   **Description:** Fetches all evidence cases that belong to the currently authenticated user.
*   **Parameters:** None.
*   **Returns:** `Promise<Case[]>`. An array of `Case` objects, including a `_count` of the evidence in each case.
*   **Security:** Redirects to the sign-in page if the user is not authenticated.

### `getCaseById(caseId: string)`

*   **Description:** Fetches a single evidence case by its ID, ensuring it belongs to the currently authenticated user.
*   **Parameters:**
    *   `caseId` (`string`): The unique ID of the case to fetch.
*   **Returns:** `Promise<Case>`. A single `Case` object, including all of its associated `Evidence` records.
*   **Security:**
    *   Redirects to the sign-in page if the user is not authenticated.
    *   Throws an error if the case is not found or if the `userId` does not match the logged-in user.

---

## `lib/actions/dashboard.ts`

### `getDashboardData()`

*   **Description:** Fetches aggregated data and recent activity for the main dashboard overview.
*   **Parameters:** None.
*   **Returns:** `Promise<object>`. An object containing `stats` (total cases, total evidence), `recentCases`, and `recentEvidence`.
*   **Security:** Throws an error if the user is not authenticated.

---

## `lib/actions/evidence.ts`

### `storeEvidence(metadata: object)`

*   **Description:** Stores a new evidence record. This action receives the pre-calculated hash and metadata; it does not handle the file itself. It also triggers the Hedera timestamping action.
*   **Parameters:**
    *   `metadata` (`object`): An object containing the evidence details, validated against the `EvidenceSchema`. Key fields include `caseId`, `fileName`, `fileType`, and `fileHash`.
*   **Returns:** `Promise<void>`. Redirects the user upon completion.
*   **Security:**
    *   Throws an error if the user is not authenticated.
    *   Performs a critical check to ensure the user owns the `caseId` they are adding evidence to.
*   **Side Effects:**
    *   Creates a new `Evidence` record in the database.
    *   Calls `timestampOnHedera`.
    *   Revalidates the path for the parent case (`/dashboard/cases/[caseId]`).

### `getEvidence(filters: object)`

*   **Description:** Fetches a list of evidence records for the authenticated user, with optional filtering.
*   **Parameters:**
    *   `filters` (`object`): An optional object that can contain `caseId`, `category`, `dateFrom`, `dateTo`, and `searchQuery`.
*   **Returns:** `Promise<Evidence[]>`. An array of `Evidence` objects.
*   **Security:** Redirects to the sign-in page if the user is not authenticated.

### `getEvidenceById(evidenceId: string)`

*   **Description:** Fetches a single evidence record by its ID.
*   **Parameters:**
    *   `evidenceId` (`string`): The unique ID of the evidence.
*   **Returns:** `Promise<Evidence>`. A single `Evidence` object.
*   **Security:**
    *   Redirects to the sign-in page if the user is not authenticated.
    *   Throws an error if the evidence is not found or does not belong to the user.

### `exportEvidence(evidenceId: string)`

*   **Description:** Exports the data for a single evidence record as a JSON string.
*   **Parameters:**
    *   `evidenceId` (`string`): The unique ID of the evidence.
*   **Returns:** `Promise<string>`. A JSON string representing the evidence record.
*   **Security:** Throws an error if the user is not authenticated or does not own the evidence.

### `exportAllData()`

*   **Description:** Exports all evidence and case data for the authenticated user as a single JSON string.
*   **Parameters:** None.
*   **Returns:** `Promise<string>`. A JSON string of all user data.
*   **Security:** Throws an error if the user is not authenticated.

---

## `lib/actions/hedera.ts`

### `timestampOnHedera(evidenceId: string)`

*   **Description:** Submits an evidence hash to the Hedera Consensus Service for immutable timestamping.
*   **Parameters:**
    *   `evidenceId` (`string`): The unique ID of the evidence to timestamp.
*   **Returns:** `Promise<void>`.
*   **Security:** Throws an error if the user is not authenticated or does not own the evidence.
*   **Side Effects:**
    *   Updates the `Evidence` record in the database with the `hederaTransactionId` and `hederaTimestamp`.
    *   Revalidates the path for the parent case (`/dashboard/cases/[caseId]`).
*   **Error Handling:** Throws an error if the evidence has already been timestamped or if the Hedera transaction fails.
