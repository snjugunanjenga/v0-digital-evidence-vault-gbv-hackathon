import Link from 'next/link';
import { Case } from '@prisma/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CaseCardProps {
  caseItem: Case;
}

export function CaseCard({ caseItem }: CaseCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{caseItem.title}</CardTitle>
        <CardDescription>{caseItem.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Created: {new Date(caseItem.createdAt).toLocaleDateString()}</p>
        {/* Add more case details here as needed */}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Link href={`/dashboard/cases/${caseItem.id}`}>
          <Button variant="outline">View Case</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
