# Hedera Integration Plan & SaaS Monetization

This document details the plan for integrating the Hedera Consensus Service (HCS) for immutable evidence timestamping and the establishment of a SaaS billing model using Clerk and Stripe to manage operational costs.

## 1. Hedera Consensus Service (HCS) for Timestamping

### Objective
Implement immutable timestamping via Hedera Consensus Service (HCS) to provide verifiable proof of existence for digital evidence at a specific point in time.

### Cost Analysis (Initial)
Hedera HCS transactions are designed to be extremely low-cost, typically costing fractions of a U.S. cent per transaction. While individual costs are minimal, cumulative costs from high-volume usage could become notable. This necessitates a strategic approach to cover operational expenses, leading to the implementation of a tiered SaaS model.

### Implementation Steps

#### 1.1. Update Database for Hedera Data
- **Action:** Add fields to the `Evidence` model to store the Hedera transaction details.
- **File to Edit:** `prisma/schema.prisma`.
- **Schema:**
    ```prisma
    model Evidence {
      // ... existing fields
      hederaTransactionId String?
      hederaTimestamp     DateTime?
    }
    ```
- **Migration:** Run `npx prisma migrate dev --name add_hedera_fields` to apply the changes.

#### 1.2. Implement Hedera Timestamping Server Action
- **Action:** Create the core logic for submitting a file hash to Hedera.
- **File to Create:** `lib/actions/hedera.ts`.
- **Dependencies:** Install `@hashgraph/sdk` (`npm install @hashgraph/sdk`).
- **Environment Variables:** Add `HEDERA_ACCOUNT_ID`, `HEDERA_PRIVATE_KEY`, and `HEDERA_TOPIC_ID` to `.env` and `.env.example`. The `HEDERA_TOPIC_ID` should refer to a pre-created Hedera topic.
- **Server Action Logic (`lib/actions/hedera.ts`):**
    ```typescript
    'use server';

    import { auth } from '@clerk/nextjs/server';
    import prisma from '@/lib/prisma';
    import {
      Client,
      TopicMessageSubmitTransaction,
      PrivateKey,
    } from '@hashgraph/sdk';
    import { revalidatePath } from 'next/cache';

    // Ensure these are set in your .env file
    const HEDERA_TOPIC_ID = process.env.HEDERA_TOPIC_ID!; // Pre-create a topic for this
    const hederaAccountId = process.env.HEDERA_ACCOUNT_ID!;
    const hederaPrivateKey = PrivateKey.fromString(process.env.HEDERA_PRIVATE_KEY!);

    const client = Client.forTestnet().setOperator(hederaAccountId, hederaPrivateKey);

    export async function timestampOnHedera(evidenceId: string) {
      const { userId } = auth();
      if (!userId) {
        throw new Error('You must be logged in to timestamp evidence.');
      }

      const evidence = await prisma.evidence.findFirst({
        where: { id: evidenceId, userId },
      });

      if (!evidence) {
        throw new Error('Evidence not found or you do not have permission.');
      }

      if (evidence.hederaTransactionId) {
         throw new Error('This evidence has already been timestamped.');
      }

      const tx = await new TopicMessageSubmitTransaction({
        topicId: HEDERA_TOPIC_ID,
        message: evidence.fileHash,
      }).execute(client);

      const receipt = await tx.getReceipt(client);
      const transactionId = tx.transactionId.toString();
      const consensusTimestamp = receipt.topicSequenceNumber
        ? new Date(receipt.topicSequenceNumber.toNumber() * 1000)
        : new Date();


      await prisma.evidence.update({
        where: { id: evidenceId },
        data: {
          hederaTransactionId: transactionId,
          hederaTimestamp: consensusTimestamp,
        },
      });

      revalidatePath(`/dashboard/cases/${evidence.caseId}`);
      return { success: true, transactionId };
    }
    ```

#### 1.3. Integrate Timestamping Button in UI
- **Action:** Add a button to the Case Detail page (`app/dashboard/cases/[id]/page.tsx`) that triggers the Hedera server action.
- **Logic:** For each piece of evidence, display the `hederaTransactionId` if it exists. Otherwise, show a button to call `timestampOnHedera` for that evidence, with a pending state.

## 2. SaaS Monetization with Clerk Billing & Stripe

### Objective
Establish a sustainable SaaS model to manage operational costs associated with Hedera transactions and provide tiered access to platform features.

### Subscription Tiers
- **Free:** 5 Hedera timestamps per month.
- **Pro:** 50 Hedera timestamps per month.
- **Enterprise:** Unlimited timestamps, advanced support, custom features.

### Implementation Steps

#### 2.1. Define Usage Tracking Model
- **Action:** Create a new model to track monthly usage for each user.
- **File to Edit:** `prisma/schema.prisma`.
- **Schema:**
    ```prisma
    model UserUsage {
      id        String   @id @default(cuid())
      userId    String   @unique
      month     Int      // e.g., 202512 for December 2025
      count     Int      @default(0)
      createdAt DateTime @default(now())
      updatedAt DateTime @updatedAt
    }
    ```
- **Migration:** Run `npx prisma migrate dev --name add_user_usage_model`.

#### 2.2. Implement Usage Tracking & Gating
- **Action:** Modify the `timestampOnHedera` action to check the user's subscription plan and current usage before performing a Hedera transaction.
- **File to Edit:** `lib/actions/hedera.ts`.
- **Logic:**
    1. Retrieve the user's subscription plan from Clerk's `privateMetadata`.
    2. Define usage limits based on the plan (e.g., Free = 5, Pro = 50).
    3. Calculate the current month in `YYYYMM` format.
    4. Query or `upsert` the `UserUsage` model to get/update the user's timestamp count for the current month.
    5. If the `usage.count` exceeds the `limit`, throw an error prompting the user to upgrade their plan.
    6. If the transaction proceeds, increment the `UserUsage.count`.

#### 2.3. Create Billing Page
- **Action:** Develop a dedicated page for users to view subscription plans, upgrade/downgrade, and manage billing.
- **File to Create:** `app/dashboard/settings/billing/page.tsx`.
- **Integration:** Utilize Clerk's billing features, which seamlessly integrate with Stripe. The UI will display the various tiers and provide calls-to-action that initiate Stripe checkout flows. Webhooks from Stripe (handled by a new API route in your app) will update the user's `privateMetadata` in Clerk upon successful subscription changes.
