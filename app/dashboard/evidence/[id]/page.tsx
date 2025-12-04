import { notFound } from 'next/navigation';
import { auth, currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { getEvidenceById } from '@/lib/actions/evidence';
// import { DashboardHeader } from '@/components/dashboard/header'; // Removed as it does not accept title/description props
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExportEvidenceButton as ExportSingleEvidenceButton } from '@/components/dashboard/export-evidence-button';

interface EvidenceDetailPageProps {
  params: { id: string };
}

export default async function EvidenceDetailPage({ params }: EvidenceDetailPageProps) {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId) {
    notFound();
  }

  const evidenceId = params.id;
  const evidence = await getEvidenceById(evidenceId);

  if (!evidence) {
    notFound();
  }

  return (
    <div className="flex flex-col space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Evidence: {evidence.fileName}</h1>
        <p className="text-muted-foreground">Details for evidence ID: {evidence.id}</p>
      </div>
      <div className="flex justify-end">
        <ExportSingleEvidenceButton evidenceId={evidence.id} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{evidence.fileName}</CardTitle>
          <CardDescription>File Type: {evidence.fileType}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center space-x-4 rounded-md border p-4">
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">File Hash</p>
              <p className="text-sm text-muted-foreground">{evidence.fileHash}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 rounded-md border p-4">
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">Upload Date</p>
              <p className="text-sm text-muted-foreground">
                {new Date(evidence.uploadDate).toLocaleString()}
              </p>
            </div>
          </div>
          {/* Add more metadata fields as needed */}
        </CardContent>
      </Card>
    </div>
  );
}
