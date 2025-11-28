"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Plus,
  FileText,
  ImageIcon,
  Video,
  File,
  Download,
  ExternalLink,
  Calendar,
  Shield,
} from "lucide-react"
import type { Case, Evidence, EvidenceCategory } from "@/lib/types"
import { CASE_CATEGORIES, EVIDENCE_CATEGORIES } from "@/lib/types"

// Mock data
const mockCase: Case = {
  id: "1",
  title: "Domestic Violence Case",
  description:
    "Documenting ongoing abuse incidents from partner including threats, physical evidence, and harassing messages.",
  category: "domestic-violence",
  status: "active",
  createdAt: "2025-01-15",
  updatedAt: "2025-01-28",
  evidenceCount: 5,
}

const mockEvidence: Evidence[] = [
  {
    id: "1",
    caseId: "1",
    fileName: "threatening_message.png",
    fileType: "image/png",
    fileSize: 245000,
    hash: "a1b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef1234567890",
    hederaTransactionId: "0.0.123456@1706439000.123456789",
    timestamp: "2025-01-28T10:30:00Z",
    sourcePlatform: "WhatsApp",
    dateOfIncident: "2025-01-27",
    description: "Threatening message received late at night",
    category: "messages",
  },
  {
    id: "2",
    caseId: "1",
    fileName: "bruise_documentation.jpg",
    fileType: "image/jpeg",
    fileSize: 1200000,
    hash: "f6e5d4c3b2a1098765432109876543210987654321098765432109876543210f",
    hederaTransactionId: "0.0.123457@1706439100.987654321",
    timestamp: "2025-01-28T11:00:00Z",
    sourcePlatform: "Camera",
    dateOfIncident: "2025-01-28",
    description: "Documentation of injury on left arm",
    category: "photos",
  },
  {
    id: "3",
    caseId: "1",
    fileName: "voice_threat.mp3",
    fileType: "audio/mpeg",
    fileSize: 3500000,
    hash: "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
    hederaTransactionId: "0.0.123458@1706439200.456789123",
    timestamp: "2025-01-27T15:00:00Z",
    sourcePlatform: "Voice Recording",
    dateOfIncident: "2025-01-27",
    description: "Voice message with threats",
    category: "audio",
  },
]

interface CaseDetailPageProps {
  caseId: string
}

export function CaseDetailPage({ caseId }: CaseDetailPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const filteredEvidence = mockEvidence.filter((e) => selectedCategory === "all" || e.category === selectedCategory)

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) return ImageIcon
    if (fileType.startsWith("video/")) return Video
    if (fileType.startsWith("audio/")) return FileText
    return File
  }

  const getCategoryLabel = (category: EvidenceCategory) => {
    return EVIDENCE_CATEGORIES.find((c) => c.value === category)?.label || category
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-2">
        <Link href="/dashboard/cases">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Cases
        </Link>
      </Button>

      {/* Case Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-foreground">{mockCase.title}</h1>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
              {CASE_CATEGORIES.find((c) => c.value === mockCase.category)?.label}
            </Badge>
          </div>
          <p className="text-muted-foreground max-w-2xl">{mockCase.description}</p>
          <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Created {new Date(mockCase.createdAt).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-primary" />
              {mockCase.evidenceCount} evidence items
            </span>
          </div>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href={`/dashboard/upload?caseId=${caseId}`}>
            <Plus className="w-4 h-4 mr-2" />
            Add Evidence
          </Link>
        </Button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory("all")}
          className={
            selectedCategory === "all"
              ? "bg-primary text-primary-foreground"
              : "neon-border bg-transparent hover:bg-primary/10"
          }
        >
          All ({mockEvidence.length})
        </Button>
        {EVIDENCE_CATEGORIES.map((cat) => {
          const count = mockEvidence.filter((e) => e.category === cat.value).length
          if (count === 0) return null
          return (
            <Button
              key={cat.value}
              variant={selectedCategory === cat.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat.value)}
              className={
                selectedCategory === cat.value
                  ? "bg-primary text-primary-foreground"
                  : "neon-border bg-transparent hover:bg-primary/10"
              }
            >
              {cat.label} ({count})
            </Button>
          )
        })}
      </div>

      {/* Evidence List */}
      <div className="space-y-4">
        {filteredEvidence.map((evidence) => {
          const FileIcon = getFileIcon(evidence.fileType)
          return (
            <Card key={evidence.id} className="glass-card hover:neon-border transition-all">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  {/* File Icon */}
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FileIcon className="w-8 h-8 text-primary" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <h3 className="font-semibold text-foreground truncate">{evidence.fileName}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30">
                          Verified
                        </Badge>
                        <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/30">
                          {getCategoryLabel(evidence.category)}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mt-1">{evidence.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Source</p>
                        <p className="text-foreground">{evidence.sourcePlatform}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Incident Date</p>
                        <p className="text-foreground">{new Date(evidence.dateOfIncident).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">File Size</p>
                        <p className="text-foreground">{formatFileSize(evidence.fileSize)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Verified On</p>
                        <p className="text-foreground">{new Date(evidence.timestamp).toLocaleDateString()}</p>
                      </div>
                    </div>

                    {/* Hash & Transaction */}
                    <div className="mt-4 p-3 rounded-lg bg-muted/30">
                      <div className="mb-2">
                        <p className="text-xs text-muted-foreground mb-1">SHA-256 Hash</p>
                        <p className="text-xs font-mono text-foreground break-all">{evidence.hash}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Hedera Transaction ID</p>
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-mono text-primary">{evidence.hederaTransactionId}</p>
                          <Button variant="ghost" size="sm" className="h-6 px-2" asChild>
                            <a
                              href={`https://hashscan.io/mainnet/transaction/${evidence.hederaTransactionId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex lg:flex-col gap-2">
                    <Button variant="outline" size="sm" className="neon-border bg-transparent hover:bg-primary/10">
                      <Download className="w-4 h-4 mr-2" />
                      Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredEvidence.length === 0 && (
        <div className="text-center py-16">
          <File className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No evidence found</h3>
          <p className="text-muted-foreground mb-4">
            {selectedCategory !== "all"
              ? "No evidence in this category. Try selecting a different filter."
              : "Start adding evidence to this case."}
          </p>
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href={`/dashboard/upload?caseId=${caseId}`}>
              <Plus className="w-4 h-4 mr-2" />
              Add Evidence
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}
