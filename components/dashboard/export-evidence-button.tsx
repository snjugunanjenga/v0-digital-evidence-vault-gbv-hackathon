"use client";

import { Button } from '@/components/ui/button';
import { exportEvidence } from '@/lib/actions/evidence';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { Download } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface ExportEvidenceButtonProps {
  evidenceId: string;
}

export function ExportEvidenceButton({ evidenceId }: ExportEvidenceButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleExport = () => {
    startTransition(async () => {
      try {
        const jsonData = await exportEvidence(evidenceId); // Assuming this now returns JSON string for single evidence
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `evidence-${evidenceId}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url); // Clean up the object URL
        toast.success("Evidence export initiated!");
      } catch (error: any) {
        toast.error(error.message || "Failed to export evidence.");
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" disabled={isPending}>
          <Download className="w-4 h-4 mr-2" />
          {isPending ? "Processing..." : "Export Evidence"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass-card">
        <DropdownMenuItem onClick={handleExport} disabled={isPending}>
          <Download className="w-4 h-4 mr-2" />
          Export Evidence (JSON)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
