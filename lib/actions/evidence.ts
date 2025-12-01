import { prisma } from '@/lib/prisma';
import { Evidence } from '@prisma/client';

interface EvidenceRecordData {
  evidenceHash: string;
  metadata: any;
  hederaTransactionId: string;
  consensusTimestamp: Date;
}

export async function getCasesByUser(userId: string) {
  const cases = await prisma.case.findMany({
    where: {
      userId: userId,
    },
  });
  return cases;
}

export async function getEvidenceByCaseId(caseId: string) {
  const evidenceRecords = await prisma.evidence.findMany({
    where: {
      caseId: caseId,
    },
  });
  return evidenceRecords;
}

export async function getEvidenceById(evidenceId: string) {
  const evidenceRecord = await prisma.evidence.findUnique({
    where: {
      id: evidenceId,
    },
  });
  return evidenceRecord;
}

export async function exportEvidence(caseId: string) {
  const evidenceRecords = await prisma.evidence.findMany({
    where: {
      caseId: caseId,
    },
    select: {
      id: true,
      fileName: true,
      fileType: true,
      fileHash: true,
      uploadDate: true,
    },
  });

  // For a real application, you might want to generate a CSV, a zip file with actual evidence files, etc.
  // For this example, we'll return a JSON string of the evidence metadata.
  return JSON.stringify(evidenceRecords, null, 2);
}

export async function saveEvidenceRecord(data: EvidenceRecordData) {
  const evidenceRecord = await prisma.evidenceRecord.create({
    data,
  });
  return evidenceRecord;
}
