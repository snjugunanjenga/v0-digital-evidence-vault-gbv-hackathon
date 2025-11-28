"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Upload, FileCheck, Shield, X, CheckCircle, AlertCircle, Loader2, ExternalLink, ArrowLeft } from "lucide-react"
import type { EvidenceCategory } from "@/lib/types"
import { EVIDENCE_CATEGORIES } from "@/lib/types"

interface FileWithHash {
  file: File
  hash: string | null
  status: "pending" | "hashing" | "hashed" | "submitting" | "submitted" | "error"
  progress: number
  hederaTransactionId?: string
  error?: string
}

// Mock cases for selection
const mockCases = [
  { id: "1", title: "Domestic Violence Case" },
  { id: "2", title: "Workplace Harassment" },
  { id: "3", title: "Online Stalking Case" },
]

const SOURCE_PLATFORMS = [
  "WhatsApp",
  "SMS",
  "Facebook",
  "Instagram",
  "Twitter/X",
  "Email",
  "Camera",
  "Voice Recording",
  "Other",
]

export function EvidenceUploadPage() {
  const searchParams = useSearchParams()
  const preselectedCaseId = searchParams.get("caseId")

  const [files, setFiles] = useState<FileWithHash[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [formData, setFormData] = useState({
    caseId: preselectedCaseId || "",
    sourcePlatform: "",
    dateOfIncident: "",
    description: "",
    category: "" as EvidenceCategory,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // SHA-256 hashing using Web Crypto API
  const hashFile = async (file: File): Promise<string> => {
    const buffer = await file.arrayBuffer()
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
  }

  const processFiles = useCallback(
    async (newFiles: File[]) => {
      const fileEntries: FileWithHash[] = newFiles.map((file) => ({
        file,
        hash: null,
        status: "pending" as const,
        progress: 0,
      }))

      setFiles((prev) => [...prev, ...fileEntries])

      // Process each file
      for (let i = 0; i < newFiles.length; i++) {
        const fileIndex = files.length + i

        setFiles((prev) => prev.map((f, idx) => (idx === fileIndex ? { ...f, status: "hashing", progress: 30 } : f)))

        try {
          const hash = await hashFile(newFiles[i])

          setFiles((prev) =>
            prev.map((f, idx) => (idx === fileIndex ? { ...f, hash, status: "hashed", progress: 100 } : f)),
          )
        } catch (error) {
          setFiles((prev) =>
            prev.map((f, idx) => (idx === fileIndex ? { ...f, status: "error", error: "Failed to hash file" } : f)),
          )
        }
      }
    },
    [files.length],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      const droppedFiles = Array.from(e.dataTransfer.files)
      processFiles(droppedFiles)
    },
    [processFiles],
  )

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(Array.from(e.target.files))
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    if (!formData.caseId || files.length === 0) return

    setIsSubmitting(true)

    // Update all files to submitting
    setFiles((prev) => prev.map((f) => ({ ...f, status: "submitting" as const })))

    // Mock Hedera submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock successful submission
    setFiles((prev) =>
      prev.map((f) => ({
        ...f,
        status: "submitted" as const,
        hederaTransactionId: `0.0.${Math.floor(100000 + Math.random() * 900000)}@${Date.now()}.${Math.floor(Math.random() * 1000000000)}`,
      })),
    )

    setIsSubmitting(false)
    setSubmitSuccess(true)
  }

  const canSubmit =
    formData.caseId &&
    formData.sourcePlatform &&
    formData.dateOfIncident &&
    formData.category &&
    files.length > 0 &&
    files.every((f) => f.status === "hashed")

  if (submitSuccess) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="glass-card neon-border">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Evidence Submitted Successfully</h2>
            <p className="text-muted-foreground mb-6">
              Your evidence has been cryptographically verified and timestamped on the Hedera blockchain.
            </p>

            <div className="space-y-3 mb-8">
              {files.map((f, index) => (
                <div key={index} className="p-4 rounded-lg bg-muted/30 text-left">
                  <p className="font-medium text-foreground text-sm">{f.file.name}</p>
                  <p className="text-xs text-muted-foreground mt-1 font-mono break-all">
                    Hash: {f.hash?.slice(0, 32)}...
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <p className="text-xs text-primary font-mono">{f.hederaTransactionId}</p>
                    <a
                      href={`https://hashscan.io/mainnet/transaction/${f.hederaTransactionId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href={`/dashboard/cases/${formData.caseId}`}>View Case</Link>
              </Button>
              <Button
                variant="outline"
                className="neon-border bg-transparent hover:bg-primary/10"
                onClick={() => {
                  setFiles([])
                  setFormData({
                    caseId: preselectedCaseId || "",
                    sourcePlatform: "",
                    dateOfIncident: "",
                    description: "",
                    category: "" as EvidenceCategory,
                  })
                  setSubmitSuccess(false)
                }}
              >
                Upload More Evidence
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Upload Evidence</h1>
          <p className="text-muted-foreground">Files are processed locally. Only hashes are stored.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Zone */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-primary" />
              Select Files
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Drop Zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault()
                setIsDragOver(true)
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              className={`
                border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer
                ${isDragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}
              `}
              onClick={() => document.getElementById("file-input")?.click()}
            >
              <input
                id="file-input"
                type="file"
                multiple
                className="hidden"
                onChange={handleFileSelect}
                accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
              />
              <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
              <p className="text-foreground font-medium mb-1">Drop files here or click to browse</p>
              <p className="text-sm text-muted-foreground">Images, videos, audio, PDFs, and documents</p>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="mt-6 space-y-3">
                <h4 className="text-sm font-medium text-foreground">Selected Files ({files.length})</h4>
                {files.map((f, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{f.file.name}</p>
                      <p className="text-xs text-muted-foreground">{(f.file.size / 1024).toFixed(1)} KB</p>
                      {f.status === "hashing" && <Progress value={f.progress} className="h-1 mt-2" />}
                      {f.hash && (
                        <p className="text-xs text-primary font-mono mt-1 truncate">{f.hash.slice(0, 24)}...</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {f.status === "hashing" && <Loader2 className="w-4 h-4 text-primary animate-spin" />}
                      {f.status === "hashed" && <CheckCircle className="w-4 h-4 text-green-500" />}
                      {f.status === "error" && <AlertCircle className="w-4 h-4 text-destructive" />}
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeFile(index)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Privacy Notice */}
            <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Privacy Protected</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Your files never leave your device. Only the SHA-256 hash is sent to our servers and recorded on the
                    Hedera blockchain.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metadata Form */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-primary" />
              Evidence Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="case">Assign to Case *</Label>
              <Select value={formData.caseId} onValueChange={(value) => setFormData({ ...formData, caseId: value })}>
                <SelectTrigger className="bg-input border-border">
                  <SelectValue placeholder="Select a case" />
                </SelectTrigger>
                <SelectContent className="glass-card">
                  {mockCases.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Evidence Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value as EvidenceCategory })}
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
              <Label htmlFor="source">Source Platform *</Label>
              <Select
                value={formData.sourcePlatform}
                onValueChange={(value) => setFormData({ ...formData, sourcePlatform: value })}
              >
                <SelectTrigger className="bg-input border-border">
                  <SelectValue placeholder="Where did this come from?" />
                </SelectTrigger>
                <SelectContent className="glass-card">
                  {SOURCE_PLATFORMS.map((platform) => (
                    <SelectItem key={platform} value={platform}>
                      {platform}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date of Incident *</Label>
              <Input
                id="date"
                type="date"
                value={formData.dateOfIncident}
                onChange={(e) => setFormData({ ...formData, dateOfIncident: e.target.value })}
                className="bg-input border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Describe what this evidence shows..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-input border-border min-h-[100px]"
              />
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!canSubmit || isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Recording on Hedera...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 mr-2" />
                  Submit Evidence
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
