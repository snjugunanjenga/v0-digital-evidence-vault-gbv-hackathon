'use client';

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

// Define the types for the data we expect, mirroring the Prisma schema
interface Evidence {
  id: string;
  fileName: string;
  fileType: string;
  fileHash: string;
  uploadDate: Date;
  hederaTransactionId?: string | null;
  hederaTimestamp?: Date | null;
}

interface CaseData {
  id: string;
  title: string;
  description: string | null;
  createdAt: Date;
  evidence: Evidence[];
}

interface ExportCaseButtonProps {
  caseData: CaseData;
  className?: string;
}

export function ExportCaseButton({ caseData, className }: ExportCaseButtonProps) {
  const handleExport = () => {
    // Sanitize the case title to create a valid filename
    const filename = `evidence-export-${caseData.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;

    // Create a Blob from the JSON data
    const jsonData = JSON.stringify(caseData, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });

    // Create a link element and trigger the download
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();

    // Clean up the object URL
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={handleExport} variant="outline" size="sm" className={className}>
      <Download className="mr-2 h-4 w-4" />
      Export Case
    </Button>
  );
}
