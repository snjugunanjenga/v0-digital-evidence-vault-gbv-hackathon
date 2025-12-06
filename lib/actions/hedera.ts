'use server';

import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { Client, TopicMessageSubmitTransaction, TopicId, TransactionRecord } from "@hashgraph/sdk";
import hederaClient from '@/lib/hedera';
import { revalidatePath } from 'next/cache';

import { checkSubscription } from '@/lib/subscription';

const HEDERA_TOPIC_ID = process.env.HEDERA_TOPIC_ID!;

export async function timestampOnHedera(evidenceId: string) {
  const { userId } = await auth(); // Await auth() to get userId
  if (!userId) {
    throw new Error('You must be logged in to timestamp evidence.');
  }

  const subscription = await checkSubscription();

  if (subscription === false || !subscription?.isActive) { // Handle false explicitly
    throw new Error('You must have an active subscription to timestamp evidence.');
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
