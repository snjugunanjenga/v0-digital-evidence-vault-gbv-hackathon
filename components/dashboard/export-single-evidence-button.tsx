"use client";

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Evidence } from '@prisma/client';

interface ExportSingleEvidenceButtonProps {
  evidenceData: Evidence;
}

export function ExportSingleEvidenceButton({ evidenceData }: ExportSingleEvidenceButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = () => {
    setIsExporting(true);
    setError(null);
    try {
      const json = JSON.stringify(evidenceData, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `evidence-${evidenceData.id}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to export evidence:', err);
      setError('Failed to export evidence. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div>
      <Button onClick={handleExport} disabled={isExporting}>
        {isExporting ? 'Exporting...' : 'Export Evidence'}
      </Button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
