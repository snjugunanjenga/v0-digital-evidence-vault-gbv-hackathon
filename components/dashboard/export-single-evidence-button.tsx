"use client";

import { Button } from '@/components/ui/button';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { Download, Share2 } from 'lucide-react';
import { exportSingleEvidence } from '@/lib/actions/evidence';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

interface ExportSingleEvidenceButtonProps {
  evidenceId: string;
}

export function ExportSingleEvidenceButton({ evidenceId }: ExportSingleEvidenceButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleExport = () => {
    startTransition(async () => {
      try {
        const { downloadUrl } = await exportSingleEvidence(evidenceId);
        // Trigger file download
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = `evidence-${evidenceId}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        toast.success("Evidence export initiated!");
      } catch (error: any) {
        toast.error(error.message || "Failed to export evidence.");
      }
    });
  };

  const handleShare = () => {
    startTransition(async () => {
      try {
        const { shareableLink } = await exportSingleEvidence(evidenceId);
        await navigator.clipboard.writeText(shareableLink);
        toast.success("Shareable link copied to clipboard!");
      } catch (error: any) {
        toast.error(error.message || "Failed to generate shareable link.");
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" disabled={isPending}>
          <Share2 className="w-4 h-4 mr-2" />
          {isPending ? "Processing..." : "Share/Export"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass-card">
        <DropdownMenuItem onClick={handleExport} disabled={isPending}>
          <Download className="w-4 h-4 mr-2" />
          Export Evidence
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleShare} disabled={isPending}>
          <Share2 className="w-4 h-4 mr-2" />
          Copy Shareable Link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
