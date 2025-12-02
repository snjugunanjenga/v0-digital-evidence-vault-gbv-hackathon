import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import type { Case } from '@prisma/client';
import { DashboardHeader } from '@/components/dashboard/header';
import { CaseCard } from '@/components/dashboard/case-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function DashboardPage() {
  const { userId } = auth();

  if (!userId) {
    redirect('/login');
  }

  // Fetch cases for the logged-in user
  const cases = await prisma.case.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: 'desc',
    }
  });

  return (
    <div className="flex flex-col space-y-6">
      <DashboardHeader heading="Dashboard" text="Manage your cases and evidence.">
        <Button asChild>
          <Link href="/dashboard/cases/new">Create New Case</Link>
        </Button>
      </DashboardHeader>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cases.map((_case: Case) => (
          <CaseCard key={_case.id} caseItem={_case} />
        ))}
      </div>
    </div>
  );
}