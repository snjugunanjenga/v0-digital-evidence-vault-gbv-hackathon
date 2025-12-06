"use client"

import Link from 'next/link'
import type { Case } from '@/lib/types'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { assignEvidenceToCase } from '@/lib/actions/evidence'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

interface CaseCardProps {
  caseItem: Case
}

export function CaseCard({ caseItem }: CaseCardProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const { toast } = useToast()

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const evidenceId = e.dataTransfer.getData("text/plain")

    if (evidenceId) {
      try {
        await assignEvidenceToCase(evidenceId, caseItem.id)
        toast({
          title: "Evidence Assigned",
          description: "Evidence successfully assigned to this case.",
          variant: "default",
        })
      } catch (error) {
        console.error("Failed to assign evidence to case:", error)
        toast({
          title: "Assignment Failed",
          description: "Could not assign evidence to this case. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <Card
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "transition-all",
        isDragOver && "border-primary ring-2 ring-primary/50"
      )}
    >
      <CardHeader>
        <CardTitle>{caseItem.title}</CardTitle>
        <CardDescription>{caseItem.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Created: {new Date(caseItem.createdAt).toLocaleDateString()}</p>
        {/* Add more case details here as needed */}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Link href={`/dashboard/cases/${caseItem.id}`}>
          <Button variant="outline">View Case</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
