'use client';

import { useEffect, useState, useTransition } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Download, Clock } from 'lucide-react';
import type { Case, Evidence } from '@prisma/client';
import { timestampOnHedera } from '@/lib/actions/evidence';

interface CaseWithEvidence extends Case {
  evidence: Evidence[];
}

function ExportButton({ caseItem }: { caseItem: CaseWithEvidence }) {
  const handleExport = () => {
    const dataToExport = {
      caseTitle: caseItem.title,
      caseDescription: caseItem.description,
      createdAt: caseItem.createdAt,
      evidence: caseItem.evidence.map(e => ({
        fileName: e.fileName,
        fileType: e.fileType,
        fileHash: e.fileHash,
        uploadDate: e.uploadDate,
        hederaTransactionId: e.hederaTransactionId,
        hederaTimestamp: e.hederaTimestamp,
      })),
    };

    const jsonString = JSON.stringify(dataToExport, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `case-${caseItem.id}-export.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={handleExport} variant="outline">
      <Download className="mr-2 h-4 w-4" />
      Export Case
    </Button>
  );
}

function TimestampButton({ evidenceId }: { evidenceId: string }) {
    const [isPending, startTransition] = useTransition();

    const handleTimestamp = () => {
        startTransition(async () => {
            await timestampOnHedera(evidenceId);
        });
    };

    return (
        <Button onClick={handleTimestamp} disabled={isPending} size="sm">
            <Clock className="mr-2 h-4 w-4" />
            {isPending ? 'Timestamping...' : 'Timestamp with Hedera'}
        </Button>
    );
}

// We will assume the data is fetched and passed to this client component
export default function CaseDetailPageClient({ caseItem }: { caseItem: CaseWithEvidence | null }) {
  if (!caseItem) {
    return (
        <div className="container mx-auto py-8">
            <p>Case not found or you do not have permission to view it.</p>
        </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-3xl">{caseItem.title}</CardTitle>
            <CardDescription>{caseItem.description}</CardDescription>
          </div>
          <ExportButton caseItem={caseItem} />
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Evidence</h2>
            <Button asChild>
              <Link href={`/dashboard/evidence/upload?caseId=${caseItem.id}`}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Upload New Evidence
              </Link>
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File Name</TableHead>
                <TableHead>File Hash</TableHead>
                <TableHead>Hedera Timestamp</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {caseItem.evidence.length > 0 ? (
                caseItem.evidence.map((evidenceItem) => (
                  <TableRow key={evidenceItem.id}>
                    <TableCell>{evidenceItem.fileName}</TableCell>
                    <TableCell className="font-mono text-xs">{evidenceItem.fileHash}</TableCell>
                    <TableCell>
                      {evidenceItem.hederaTimestamp ? (
                        <div className="text-xs">
                          <p>{new Date(evidenceItem.hederaTimestamp).toLocaleString()}</p>
                          <p className="font-mono text-muted-foreground">{evidenceItem.hederaTransactionId}</p>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">Not timestamped</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {!evidenceItem.hederaTimestamp && <TimestampButton evidenceId={evidenceItem.id} />}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No evidence uploaded for this case yet.
                  </TableCell>
                </TableRow>
              )}
            </Body>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
