"use client"

import type React from "react"

import { useCallback, useRef } from "react"
import { Upload, File, X, CheckCircle2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface FileUploadZoneProps {
  file: File | null
  isHashing: boolean
  hashProgress: number
  fileHash: string | null
  onFileSelect: (file: File) => void
  onFileRemove: () => void
}

const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "application/pdf",
]

export function FileUploadZone({
  file,
  isHashing,
  hashProgress,
  fileHash,
  onFileSelect,
  onFileRemove,
}: FileUploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile && ACCEPTED_TYPES.includes(droppedFile.type)) {
        onFileSelect(droppedFile)
      }
    },
    [onFileSelect],
  )

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      onFileSelect(selectedFile)
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  if (file) {
    return (
      <Card className="border-2 border-primary/20 bg-primary/5">
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                <File className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize(file.size)} • {file.type.split("/")[1]?.toUpperCase()}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onFileRemove} disabled={isHashing} className="shrink-0">
              <X className="h-4 w-4" />
              <span className="sr-only">Remove file</span>
            </Button>
          </div>

          {isHashing && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Generating SHA-256 hash...</span>
                <span className="text-muted-foreground">{hashProgress}%</span>
              </div>
              <Progress value={hashProgress} className="h-2" />
            </div>
          )}

          {fileHash && !isHashing && (
            <div className="mt-4 p-4 bg-background rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-foreground">Hash Generated</span>
              </div>
              <code className="text-xs text-muted-foreground break-all font-mono block">{fileHash}</code>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
            "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50",
          )}
        >
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED_TYPES.join(",")}
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="p-4 bg-muted rounded-full mb-4">
            <Upload className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-lg font-medium text-foreground mb-1">Drop your evidence file here</p>
          <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
          <p className="text-xs text-muted-foreground">Supports: Images, Videos, PDFs • Max 100MB</p>
        </div>
      </CardContent>
    </Card>
  )
}
