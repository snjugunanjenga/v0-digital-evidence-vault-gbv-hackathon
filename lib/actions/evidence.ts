'use server';

import { z } from 'zod';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { EvidenceCategory, CaseCategory } from '@/lib/types';
import { timestampOnHedera } from '@/lib/actions/hedera';

const EvidenceSchema = z.object({
  caseId: z.string(),
  fileName: z.string(),
  fileType: z.string(),
  fileHash: z.string(),
  // Add optional fields for `hederaTransactionId`, `timestamp`, `sourcePlatform`, `dateOfIncident`, `description`, `category`
  hederaTransactionId: z.string().nullable().optional(),
  timestamp: z.date().optional(),
  sourcePlatform: z.string().nullable().optional(),
  dateOfIncident: z.date().optional(),
  description: z.string().nullable().optional(),
  category: z.nativeEnum(EvidenceCategory).optional(),
  fileSize: z.number().optional(),
});

type EvidenceMetadata = z.infer<typeof EvidenceSchema>;

export async function storeEvidence(metadata: EvidenceMetadata) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('You must be logged in to store evidence.');
  }

  const validatedData = EvidenceSchema.parse(metadata);

  // Critical Security Check: Verify that the case belongs to the user.
  const caseOwner = await prisma.case.findUnique({
    where: {
      id: validatedData.caseId,
      userId: userId,
    },
  });

  if (!caseOwner) {
    throw new Error('Unauthorized: You do not have permission to add evidence to this case.');
  }

  try {
    const newEvidence = await prisma.evidence.create({
      data: {
        ...validatedData,
        userId: userId, // Ensure userId is explicitly set
      },
    });
    // Call Hedera timestamping action
    await timestampOnHedera(newEvidence.id);
  } catch (error) {
    // Check for unique constraint violation on fileHash
    if (error instanceof Error && 'code' in error && (error as any).code === 'P2002') {
       throw new Error('This file has already been uploaded as evidence.');
    }
    throw new Error('Failed to store evidence in the database.');
  }

  revalidatePath(`/dashboard/cases/${validatedData.caseId}`);
  redirect(`/dashboard/cases/${validatedData.caseId}`);
}

interface GetEvidenceFilters {
  caseId?: string;
  category?: EvidenceCategory;
  dateFrom?: Date;
  dateTo?: Date;
  searchQuery?: string;
}

export async function getEvidence(filters: GetEvidenceFilters = {}) {
  const { userId } = await auth();

  if (!userId) {
    redirect('/signin');
  }

  const whereClause: any = { userId };

  if (filters.caseId && filters.caseId !== 'all') {
    whereClause.caseId = filters.caseId;
  }
  if (filters.category) {
    whereClause.category = filters.category;
  }

  if (filters.dateFrom || filters.dateTo) {
    whereClause.dateOfIncident = {};
    if (filters.dateFrom) {
      whereClause.dateOfIncident.gte = filters.dateFrom;
    }
    if (filters.dateTo) {
      whereClause.dateOfIncident.lte = filters.dateTo;
    }
  }

  if (filters.searchQuery) {
    const search = filters.searchQuery.toLowerCase();
    whereClause.OR = [
      { fileName: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { fileHash: { contains: search, mode: 'insensitive' } },
      { hederaTransactionId: { contains: search, mode: 'insensitive' } },
    ];
  }

  try {
    const evidence = await prisma.evidence.findMany({
      where: whereClause,
      orderBy: { uploadDate: 'desc' },
      include: { case: true },
    });
    return evidence;
  } catch (error) {
    console.error("Database error fetching evidence:", error);
    throw new Error('Failed to fetch evidence.');
  }
}

export async function getEvidenceById(evidenceId: string) {
  const { userId } = await auth();

  if (!userId) {
    redirect('/signin');
  }

  try {
    const evidence = await prisma.evidence.findUnique({
      where: { id: evidenceId, userId },
      include: { case: true }, // Include related case data
    });

    if (!evidence) {
      throw new Error('Evidence not found or unauthorized access.');
    }

    return evidence;
  } catch (error) {
    console.error("Database error fetching evidence by ID:", error);
    throw new Error('Failed to fetch evidence details.');
  }
}

export async function exportEvidence(evidenceId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const evidence = await prisma.evidence.findUnique({
    where: { id: evidenceId, userId },
  });

  if (!evidence) {
    throw new Error('Evidence not found or unauthorized.');
  }

  return JSON.stringify(evidence, null, 2);
}

export async function exportAllData() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  try {
    const allEvidence = await prisma.evidence.findMany({
      where: { userId },
      include: { case: true }, // Include related case data
      orderBy: { uploadDate: 'desc' },
    });
    return JSON.stringify(allEvidence, null, 2);
  } catch (error) {
    console.error("Database error exporting all evidence:", error);
    throw new Error('Failed to export all evidence.');
  }
}