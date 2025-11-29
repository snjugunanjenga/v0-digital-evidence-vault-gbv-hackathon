import prisma from './prisma';

interface EvidenceRecordData {
  evidenceHash: string;
  metadata: any;
  hederaTransactionId: string;
  consensusTimestamp: Date;
}

export async function saveEvidenceRecord(data: EvidenceRecordData) {
  const evidenceRecord = await prisma.evidenceRecord.create({
    data,
  });
  return evidenceRecord;
}
