import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { PlusCircle } from "lucide-react";

export default async function DashboardPage() {
  const { userId } = auth();

  if (!userId) {
    // This should not happen due to middleware protection, but it's good practice
    return <p>You must be logged in to view this page.</p>;
  }

  const cases = await prisma.case.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Cases</h1>
        <Button asChild>
          <Link href="/dashboard/cases/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Case
          </Link>
        </Button>
      </div>

      {cases.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">You haven't created any cases yet.</p>
          <Button asChild className="mt-4">
            <Link href="/dashboard/cases/new">Get Started</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((caseItem) => (
            <Link href={`/dashboard/cases/${caseItem.id}`} key={caseItem.id}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{caseItem.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Created on {new Date(caseItem.createdAt).toLocaleDateString()}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
