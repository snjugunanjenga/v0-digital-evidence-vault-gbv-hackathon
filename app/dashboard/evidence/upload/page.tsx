import { Suspense } from 'react';
import UploadForm from './upload-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function UploadSkeleton() {
  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Upload Evidence</CardTitle>
          <CardDescription>Select a file to upload. A unique, secure hash (SHA-256) will be generated in your browser. The file itself never leaves your device.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <div className="flex justify-end gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-48" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function UploadEvidencePage() {
  return (
    <Suspense fallback={<UploadSkeleton />}>
      <UploadForm />
    </Suspense>
  );
}
