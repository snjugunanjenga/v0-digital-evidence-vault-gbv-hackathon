'use server';

import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import {
  Client,
  TopicMessageSubmitTransaction,
  PrivateKey,
  TopicId,
  AccountId,
} from '@hashgraph/sdk';
import { revalidatePath } from 'next/cache';

// Ensure these are set in your .env file
// You will need to create a Hedera Topic ID manually or via a separate script for now.
const HEDERA_TOPIC_ID = process.env.HEDERA_TOPIC_ID!;
const hederaAccountId = process.env.HEDERA_ACCOUNT_ID!;
const hederaPrivateKey = PrivateKey.fromString(process.env.HEDERA_PRIVATE_KEY!);

// Configure the client for the Hedera testnet or mainnet
// For production, use Client.forMainnet()
const client = Client.forTestnet().setOperator(AccountId.fromString(hederaAccountId), hederaPrivateKey);

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

  try {
    const transaction = new TopicMessageSubmitTransaction({
      topicId: TopicId.fromString(HEDERA_TOPIC_ID),
      message: evidence.fileHash,
    });

    const txResponse = await transaction.execute(client);
    const receipt = await txResponse.getReceipt(client);

    const transactionId = txResponse.transactionId.toString();
    // Hedera timestamps are in nanoseconds since the epoch. Convert to milliseconds for Date.
    const consensusTimestampNs = receipt.consensusTimestamp?.asString();
    let consensusTimestamp: Date | undefined;
    if (consensusTimestampNs) {
      const seconds = parseInt(consensusTimestampNs.substring(0, 10));
      const nanos = parseInt(consensusTimestampNs.substring(10, 19));
      consensusTimestamp = new Date(seconds * 1000 + nanos / 1_000_000);
    }

    await prisma.evidence.update({
      where: { id: evidenceId },
      data: {
        hederaTransactionId: transactionId,
        hederaTimestamp: consensusTimestamp,
      },
    });

    revalidatePath(`/dashboard/cases/${evidence.caseId}`);
    return { success: true, transactionId };
  } catch (error) {
    console.error('Error timestamping on Hedera:', error);
    throw new Error('Failed to timestamp evidence on Hedera.');
  }
}
