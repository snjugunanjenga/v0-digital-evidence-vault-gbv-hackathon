import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

// Define a basic type for a Case to avoid type errors.
// This will be consistent with the Prisma schema.
interface Case {
  id: string;
  title: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    // This case should ideally be handled by middleware,
    // but it's good practice to have a check here as well.
    return <p>You must be logged in to view this page.</p>;
  }

  const cases: Case[] = await prisma.case.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your Cases</h1>
        <Button asChild>
          <Link href="/dashboard/cases/new">Create New Case</Link>
        </Button>
      </div>

      {cases.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              You haven&#39;t created any cases yet.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cases.map((caseItem) => (
            <Link href={`/dashboard/cases/${caseItem.id}`} key={caseItem.id}>
              <Card className="hover:border-primary transition-colors h-full">
                <CardHeader>
                  <CardTitle>{caseItem.title}</CardTitle>
                  <CardDescription>
                    Created on {new Date(caseItem.createdAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {caseItem.description || 'No description provided.'}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}