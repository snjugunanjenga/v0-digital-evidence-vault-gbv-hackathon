'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { storeEvidence } from '@/lib/actions/evidence';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EVIDENCE_CATEGORIES, EvidenceCategory } from '@/lib/types';
import dynamic from 'next/dynamic';

// Helper function to convert ArrayBuffer to hex string
function bufferToHex(buffer: ArrayBuffer) {
  return [...new Uint8Array(buffer)]
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

function UploadEvidenceContent() {
  const searchParams = useSearchParams();
  const caseId = searchParams.get('caseId');

  const [file, setFile] = useState<File | null>(null);
  const [isHashing, setIsHashing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<EvidenceCategory | "">("");
  const [sourcePlatform, setSourcePlatform] = useState("");
  const [dateOfIncident, setDateOfIncident] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file || !caseId || !category || !dateOfIncident) {
      setError('Please select a file, a category, date of incident and ensure you have a valid case ID.');
      return;
    }

    setIsHashing(true);
    setProgress(30);

    try {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        if (e.target?.result) {
          const arrayBuffer = e.target.result as ArrayBuffer;
          setProgress(60);
          
          // Generate SHA-256 hash
          const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
          const fileHash = bufferToHex(hashBuffer);
          setProgress(90);

          // Prepare metadata for server action
          const metadata = {
            caseId,
            fileName: file.name,
            fileType: file.type,
            fileSize: file.size,
            fileHash,
            description: description || null,
            category,
            sourcePlatform: sourcePlatform || null,
                        dateOfIncident: new Date(dateOfIncident),
            timestamp: new Date(), // Current timestamp of upload
          };
          
          // Call server action
          await storeEvidence(metadata);
          // Redirect will be handled by the server action on success
        }
      };
      
      reader.onerror = () => {
        setError('Failed to read the file.');
        setIsHashing(false);
      }

      reader.readAsArrayBuffer(file);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred during hashing.');
      setIsHashing(false);
    }
  };

  if (!caseId) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>
            A case ID is required to upload evidence. Please go back to a case and try again.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Upload Evidence</CardTitle>
          <CardDescription>
            Select a file from your device. Its SHA-256 hash will be calculated in your browser and stored as evidence. The file itself will not be uploaded.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="file">Select File</Label>
              <Input id="file" name="file" type="file" required onChange={handleFileChange} disabled={isHashing} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={category}
                onValueChange={(value: EvidenceCategory) => setCategory(value)}
                disabled={isHashing}
              >
                <SelectTrigger className="bg-input border-border">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="glass-card">
                  {EVIDENCE_CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Brief description of the evidence..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isHashing}
                className="bg-input border-border min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sourcePlatform">Source Platform (Optional)</Label>
              <Input
                id="sourcePlatform"
                placeholder="e.g., WhatsApp, Camera, Email"
                value={sourcePlatform}
                onChange={(e) => setSourcePlatform(e.target.value)}
                disabled={isHashing}
                className="bg-input border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfIncident">Date of Incident</Label>
              <Input
                id="dateOfIncident"
                type="date"
                value={dateOfIncident}
                onChange={(e) => setDateOfIncident(e.target.value)}
                required
                disabled={isHashing}
                className="bg-input border-border"
              />
            </div>
            
            {isHashing && (
              <div className="space-y-2">
                <Label>Hashing Progress</Label>
                <Progress value={progress} />
                <p className="text-sm text-muted-foreground">
                  Processing file and generating secure hash... Please do not close this window.
                </p>
              </div>
            )}

            {error && (
              <p className="text-sm font-medium text-destructive">{error}</p>
            )}

            <div className="flex justify-end">
              <Button type="submit" disabled={!file || isHashing || !category || !dateOfIncident}>
                {isHashing ? 'Processing...' : 'Hash and Store Evidence'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="max-w-2xl mx-auto mt-6">
        <CardHeader>
          <CardTitle>Upload from Cloud Platforms</CardTitle>
          <CardDescription>
            Integrate with Google Drive, Dropbox, and other cloud services to upload evidence directly.
            This feature is coming soon!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button variant="outline" className="w-full" disabled>
              Connect Google Drive
            </Button>
            <Button variant="outline" className="w-full" disabled>
              Connect Dropbox
            </Button>
            {/* Add more cloud platforms as needed */}
            <p className="text-center text-sm text-muted-foreground">
              (Cloud integration requires separate authorization and is under development)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const DynamicUploadEvidenceContent = dynamic(() => Promise.resolve(UploadEvidenceContent), {
  ssr: false,
});

export default function UploadEvidencePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DynamicUploadEvidenceContent />
    </Suspense>
  );
}
