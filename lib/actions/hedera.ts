'use server';

import hederaClient from '@/lib/hedera';
import { revalidatePath } from 'next/cache';

const HEDERA_TOPIC_ID = process.env.HEDERA_TOPIC_ID!;

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

    const txResponse = await transaction.execute(hederaClient);
    const receipt = await txResponse.getReceipt(hederaClient);

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
