'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { storeEvidence } from '@/lib/actions/evidence';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';

export default function UploadForm() {
  const searchParams = useSearchParams();
  const caseId = searchParams.get('caseId');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const calculateHash = async (fileToHash: File): Promise<string> => {
    setProgress(0);
    const buffer = await fileToHash.arrayBuffer();
    // Simulate progress for hashing
    setProgress(50);
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    setProgress(100);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file || !caseId) {
      alert('Please select a file and ensure Case ID is present.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const fileHash = await calculateHash(file);
      
      const metadata = {
        caseId,
        fileName: file.name,
        fileType: file.type,
        fileHash,
      };

      await storeEvidence(metadata);
      // On success, the server action will redirect.
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };
  
  if (!caseId) {
    return (
      <div className="container mx-auto py-8 text-center">
        <p className="text-red-500">Case ID is missing. Please return to your case and try again.</p>
        <Button asChild variant="link" className="mt-4">
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Upload Evidence</CardTitle>
          <CardDescription>Select a file to upload. A unique, secure hash (SHA-256) will be generated in your browser. The file itself never leaves your device.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="hidden" name="caseId" value={caseId} />
            <div>
              <label htmlFor="file" className="block text-sm font-medium mb-1">Evidence File</label>
              <Input id="file" type="file" required onChange={handleFileChange} disabled={isSubmitting} />
            </div>
            
            {isSubmitting && <Progress value={progress} className="w-full" />}

            <div className="flex justify-end gap-2">
              <Button variant="outline" asChild>
                <Link href={`/dashboard/cases/${caseId}`}>Cancel</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting || !file}>
                {isSubmitting ? 'Processing...' : 'Securely Upload Evidence Hash'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
