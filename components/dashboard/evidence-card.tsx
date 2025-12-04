import Link from 'next/link';
import type { Evidence } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface EvidenceCardProps {
  evidenceItem: Evidence;
}

export function EvidenceCard({ evidenceItem }: EvidenceCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{evidenceItem.fileName}</CardTitle>
        <CardDescription>{evidenceItem.fileType}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Upload Date: {new Date(evidenceItem.uploadDate).toLocaleDateString()}</p>
        <p>Hash: {evidenceItem.fileHash.substring(0, 10)}...</p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Link href={`/dashboard/evidence/${evidenceItem.id}`}>
          <Button variant="outline">View Evidence</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
