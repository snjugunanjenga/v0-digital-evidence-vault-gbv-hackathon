"use client"

import { useState, useEffect } from "react"
import { getEvidence, assignEvidenceToCase } from "@/lib/actions/evidence"
import type { Evidence, Case } from "@prisma/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Loader2, FolderOpen } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

interface EvidenceLockerProps {
  initialEvidence: Evidence[]
}

export function EvidenceLockerPage({ initialEvidence }: EvidenceLockerProps) {
  const [evidence, setEvidence] = useState<Evidence[]>(initialEvidence)
  const [loading, setLoading] = useState(false)
  const [draggingEvidenceId, setDraggingEvidenceId] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    setEvidence(initialEvidence)
  }, [initialEvidence])

  const handleDragStart = (e: React.DragEvent, evidenceId: string) => {
    e.dataTransfer.setData("text/plain", evidenceId)
    setDraggingEvidenceId(evidenceId)
  }

  const handleDragEnd = () => {
    setDraggingEvidenceId(null)
  }

  const handleDrop = async (e: React.DragEvent, caseId: string) => {
    e.preventDefault()
    const evidenceId = e.dataTransfer.getData("text/plain")

    if (evidenceId && caseId) {
      setLoading(true)
      try {
        await assignEvidenceToCase(evidenceId, caseId)
        setEvidence((prev) => prev.filter((ev) => ev.id !== evidenceId)) // Remove from locker
        toast({
          title: "Evidence Assigned",
          description: "Evidence successfully assigned to the case.",
          variant: "default",
        })
      } catch (error) {
        console.error("Failed to assign evidence to case:", error)
        toast({
          title: "Assignment Failed",
          description: "Could not assign evidence to the case. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Evidence Locker</h1>
          <p className="text-muted-foreground">
            Manage unassigned evidence. Drag and drop evidence to your cases.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/upload">
            <PlusCircle className="w-4 h-4 mr-2" />
            Upload New Evidence
          </Link>
        </Button>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}

      {!loading && evidence.length === 0 && (
        <div className="text-center py-16 border-2 border-dashed border-border rounded-lg">
          <FolderOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg font-medium text-foreground">No unassigned evidence found.</p>
          <p className="text-muted-foreground">Upload new evidence to get started.</p>
          <Button asChild className="mt-6">
            <Link href="/dashboard/upload">Upload Evidence</Link>
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {evidence.map((ev) => (
          <Card
            key={ev.id}
            draggable
            onDragStart={(e) => handleDragStart(e, ev.id)}
            onDragEnd={handleDragEnd}
            className={cn(
              "glass-card transition-all cursor-grab",
              draggingEvidenceId === ev.id && "opacity-50 border-primary",
            )}
          >
            <CardHeader>
              <CardTitle className="text-lg truncate">{ev.fileName}</CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Uploaded: {new Date(ev.uploadDate).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-mono break-all text-muted-foreground">Hash: {ev.fileHash.slice(0, 20)}...</p>
              {/* Add more evidence details here if needed */}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Placeholder for draggable target (e.g., case cards) - will be implemented in CaseCard */}
      <div className="mt-8 p-4 border border-dashed rounded-lg text-center text-muted-foreground">
        Drop evidence onto a case card to assign it.
      </div>
    </div>
  )
}
