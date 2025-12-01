"use client";

import { Button } from '@/components/ui/button';
import { exportEvidence } from '@/lib/actions/evidence';
import { useState } from 'react';

interface ExportEvidenceButtonProps {
  caseId: string;
}

export function ExportEvidenceButton({ caseId }: ExportEvidenceButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async () => {
    setIsExporting(true);
    setError(null);
    try {
      const jsonData = await exportEvidence(caseId);
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `evidence-case-${caseId}.json`;
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
