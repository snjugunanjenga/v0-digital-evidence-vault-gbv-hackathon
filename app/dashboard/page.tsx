import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { auth } from '@/lib/actions/auth';
import { getCasesByUser } from '@/lib/actions/evidence';
import { Case } from '@prisma/client';
import { DashboardHeader } from '@/components/dashboard/header';
import { CaseCard } from '@/components/dashboard/case-card'; // Assuming a CaseCard component will be created

export default async function DashboardPage() {
  const { user } = await auth();

  if (!user) {
    notFound();
  }

  // Fetch cases for the logged-in user
  const cases = await getCasesByUser(user.id);

  return (
    <div className="flex flex-col space-y-6">
      <DashboardHeader heading="Dashboard" text="Manage your cases and evidence." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cases.map((_case: Case) => (
          <CaseCard key={_case.id} caseItem={_case} />
        ))}
      </div>
    </div>
  );
}