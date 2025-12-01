import { notFound } from 'next/navigation';
import { auth } from '@/lib/actions/auth';
import { getCasesByUser, getEvidenceByCaseId } from '@/lib/actions/evidence';
import { DashboardHeader } from '@/components/dashboard/header';
import { Evidence } from '@prisma/client';
import { EvidenceCard } from '@/components/dashboard/evidence-card';
import { ExportEvidenceButton } from '@/components/dashboard/export-evidence-button'; // Import the new component

interface CaseDetailPageProps {
  params: { id: string };
}

export default async function CaseDetailPage({ params }: CaseDetailPageProps) {
  const { user } = await auth();

  if (!user) {
    notFound();
  }

  const caseId = params.id;

  // Fetch the specific case and evidence for it
  const cases = await getCasesByUser(user.id);
  const currentCase = cases.find((c) => c.id === caseId);

  if (!currentCase) {
    notFound();
  }

  const evidenceRecords = await getEvidenceByCaseId(caseId);

  return (
    <div className="flex flex-col space-y-6">
      <DashboardHeader
        heading={currentCase.title}
        text={currentCase.description || "Case details and associated evidence."}
      />
      <div className="flex justify-end">
        <ExportEvidenceButton caseId={caseId} /> {/* Use the new component */}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {evidenceRecords.map((evidence: Evidence) => (
          <EvidenceCard key={evidence.id} evidenceItem={evidence} />
        ))}
      </div>
    </div>
  );
}