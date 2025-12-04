'use server';

import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { Client, TopicMessageSubmitTransaction, TopicId, TransactionRecord } from "@hashgraph/sdk";
import hederaClient from '@/lib/hedera';
import { revalidatePath } from 'next/cache';

import { checkSubscription } from '@/lib/subscription';

const HEDERA_TOPIC_ID = process.env.HEDERA_TOPIC_ID!;
const HEDERA_TIMESTAMP_LIMIT = 5; // Example limit for free tier

export async function timestampOnHedera(evidenceId: string) {
  const { userId } = auth();
  if (!userId) {
    throw new Error('You must be logged in to timestamp evidence.');
  }

  const { isPro, userUsage } = await checkSubscription();

  // Create usage record if it doesn't exist, even for pro users to track usage
  let currentUserUsage = userUsage;
  if (!currentUserUsage) {
    currentUserUsage = await prisma.userUsage.create({
      data: {
        userId,
      },
    });
  }

  // Free tier is subject to a limit
  if (!isPro && currentUserUsage.timestampCount >= HEDERA_TIMESTAMP_LIMIT) {
    throw new Error('You have reached your Hedera timestamp limit. Please upgrade your plan.');
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

  try {
    const transaction = new TopicMessageSubmitTransaction({
      topicId: TopicId.fromString(HEDERA_TOPIC_ID),
      message: evidence.fileHash,
    });

    const txResponse = await transaction.execute(hederaClient);
    const transactionRecord = await txResponse.getRecord(hederaClient);
    
    const transactionId = txResponse.transactionId.toString();
    const consensusTimestamp = transactionRecord.consensusTimestamp?.toDate();

    await prisma.evidence.update({
      where: { id: evidenceId },
      data: {
        hederaTransactionId: transactionId,
        hederaTimestamp: consensusTimestamp,
      },
    });

    // Increment usage count and update lastUsedAt
    await prisma.userUsage.update({
      where: { userId },
      data: {
        timestampCount: {
          increment: 1,
        },
        lastUsedAt: new Date(),
      },
    });

    revalidatePath(`/dashboard/cases/${evidence.caseId}`);
  } catch (error) {
    console.error('Error timestamping on Hedera:', error);
    throw new Error('Failed to timestamp evidence on Hedera.');
  }
}
