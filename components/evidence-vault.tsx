"use client"

import { useState } from "react"
import { HeroSection } from "./hero-section"
import { FileUploadZone } from "./file-upload-zone"
import { MetadataForm } from "./metadata-form"
import { ResultsCard } from "./results-card"
import type { EvidenceMetadata, SubmissionResult } from "@/lib/types"

export function EvidenceVault() {
  const [file, setFile] = useState<File | null>(null)
  const [fileHash, setFileHash] = useState<string | null>(null)
  const [isHashing, setIsHashing] = useState(false)
  const [hashProgress, setHashProgress] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null)
  const [metadata, setMetadata] = useState<EvidenceMetadata>({
    sourcePlatform: "",
    dateOfIncident: "",
    description: "",
  })

  const hashFile = async (selectedFile: File): Promise<string> => {
    setIsHashing(true)
    setHashProgress(0)

    const arrayBuffer = await selectedFile.arrayBuffer()

    // Simulate progress for UX (actual hashing is very fast)
    const progressInterval = setInterval(() => {
      setHashProgress((prev) => Math.min(prev + 15, 90))
    }, 100)

    const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer)

    clearInterval(progressInterval)
    setHashProgress(100)

    // Convert hash to hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")

    setTimeout(() => {
      setIsHashing(false)
    }, 300)

    return hashHex
  }

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile)
    setSubmissionResult(null)
    const hash = await hashFile(selectedFile)
    setFileHash(hash)
  }

  const handleFileRemove = () => {
    setFile(null)
    setFileHash(null)
    setSubmissionResult(null)
    setHashProgress(0)
  }

  // Mock server submission - simulates sending hash to backend
  const submitEvidence = async (): Promise<SubmissionResult> => {
    setIsSubmitting(true)

    // Simulate network latency and Hedera transaction
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock Hedera transaction ID format
    const mockHederaTxId = `0.0.${Math.floor(Math.random() * 1000000)}@${Math.floor(Date.now() / 1000)}.${Math.floor(Math.random() * 1000000000)}`

    const result: SubmissionResult = {
      success: true,
      hash: fileHash!,
      hederaTransactionId: mockHederaTxId,
      timestamp: new Date().toISOString(),
      sequenceNumber: Math.floor(Math.random() * 100000),
    }

    setIsSubmitting(false)
    return result
  }

  const handleSubmit = async () => {
    if (!fileHash || !metadata.sourcePlatform || !metadata.dateOfIncident) {
      return
    }

    const result = await submitEvidence()
    setSubmissionResult(result)
  }

  const isFormValid = file && fileHash && metadata.sourcePlatform && metadata.dateOfIncident

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <HeroSection />

      <div className="mt-12 space-y-8">
        <FileUploadZone
          file={file}
          isHashing={isHashing}
          hashProgress={hashProgress}
          fileHash={fileHash}
          onFileSelect={handleFileSelect}
          onFileRemove={handleFileRemove}
        />

        {file && fileHash && (
          <MetadataForm
            metadata={metadata}
            onMetadataChange={setMetadata}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            isValid={!!isFormValid}
          />
        )}

        {submissionResult && <ResultsCard result={submissionResult} />}
      </div>
    </div>
  )
}
