import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ExportCaseButton } from '@/components/dashboard/export-case-button';
import { timestampOnHedera } from '@/lib/actions/hedera';
import { Check, Loader2 } from 'lucide-react';
import { formatDate } from '@/lib/utils'; // Assuming you have a utility function for formatting dates

interface CaseDetailPageProps {
  params: {
    id: string;
  };
}

export default async function CaseDetailPage({ params }: CaseDetailPageProps) {
  const { userId } = auth();

  if (!userId) {
    return notFound();
  }

  const caseData = await prisma.case.findUnique({
    where: {
      id: params.id,
      userId: userId, // Security: Ensure the user owns this case
    },
    include: {
      evidence: true, // Include all related evidence
    },
  });

  if (!caseData) {
    return notFound();
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{caseData.title}</CardTitle>
          <CardDescription>
            Created on {new Date(caseData.createdAt).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{caseData.description}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle>Evidence</CardTitle>
            <CardDescription>
              All evidence associated with this case.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <ExportCaseButton caseData={caseData} />
            <Button asChild>
              <Link href={`/dashboard/evidence/upload?caseId=${caseData.id}`}>
                Upload New Evidence
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File Name</TableHead>
                <TableHead>File Type</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead className="text-center">Hedera Timestamp</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {caseData.evidence.length > 0 ? (
                caseData.evidence.map((evidence) => (
                  <TableRow key={evidence.id}>
                    <TableCell>{evidence.fileName}</TableCell>
                    <TableCell>{evidence.fileType}</TableCell>
                    <TableCell>
                      {new Date(evidence.uploadDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-center text-xs">
                      {evidence.hederaTransactionId ? (
                        <span className="flex items-center justify-center gap-1">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>{formatDate(evidence.hederaTimestamp)}</span>
                          <br/>
                          <span className="text-muted-foreground">Tx: {evidence.hederaTransactionId.substring(0, 10)}...</span>
                        </span>
                      ) : (
                        <span className="text-muted-foreground">Not timestamped</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {!evidence.hederaTransactionId && (
                        <form action={timestampOnHedera.bind(null, evidence.id)}>
                          <Button variant="outline" size="sm" type="submit">
                            Timestamp with Hedera
                          </Button>
                        </form>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No evidence has been uploaded for this case yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}