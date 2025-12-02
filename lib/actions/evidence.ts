'use server';

import { z } from 'zod';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';

const EvidenceSchema = z.object({
  caseId: z.string(),
  fileName: z.string(),
  fileType: z.string(),
  fileHash: z.string(),
});

type EvidenceMetadata = z.infer<typeof EvidenceSchema>;

export async function storeEvidence(metadata: EvidenceMetadata) {
  const { userId } = auth();

  if (!userId) {
    throw new Error('You must be logged in to store evidence.');
  }

  const validatedMetadata = EvidenceSchema.safeParse(metadata);

  if (!validatedMetadata.success) {
    throw new Error('Invalid evidence metadata.');
  }

  const { caseId, fileName, fileType, fileHash } = validatedMetadata.data;

  // Critical Security Check: Verify case ownership
  const caseItem = await prisma.case.findUnique({
    where: { id: caseId, userId },
  });

  if (!caseItem) {
    throw new Error('Unauthorized: You do not have permission to add evidence to this case.');
  }

  try {
    await prisma.evidence.create({
      data: {
        caseId,
        userId,
        fileName,
        fileType,
        fileHash,
        uploadDate: new Date(),
      },
    });
  } catch (error) {
    throw new Error('Failed to store evidence metadata.');
  }

  revalidatePath(`/dashboard/cases/${caseId}`);
  redirect(`/dashboard/cases/${caseId}`);
}

export async function timestampOnHedera(evidenceId: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error('You must be logged in.');
  }

  const evidence = await prisma.evidence.findUnique({
    where: { id: evidenceId, userId },
  });

  if (!evidence) {
    throw new Error('Evidence not found or you do not have permission.');
  }

  // Placeholder for Hedera SDK interaction
  // In a real implementation, you would use the Hedera SDK here
  // to submit the evidence.fileHash to the Hedera Consensus Service.
  
  const hederaTransactionId = `placeholder-tx-id-${Date.now()}`;
  const hederaTimestamp = new Date();

  await prisma.evidence.update({
    where: { id: evidenceId },
    data: {
      hederaTransactionId,
      hederaTimestamp,
    },
  });

  revalidatePath(`/dashboard/cases/${evidence.caseId}`);
}
