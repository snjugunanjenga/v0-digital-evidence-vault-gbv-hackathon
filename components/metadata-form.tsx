"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Send } from "lucide-react"
import type { EvidenceMetadata } from "@/lib/types"

interface MetadataFormProps {
  metadata: EvidenceMetadata
  onMetadataChange: (metadata: EvidenceMetadata) => void
  onSubmit: () => void
  isSubmitting: boolean
  isValid: boolean
}

const SOURCE_PLATFORMS = [
  { value: "whatsapp", label: "WhatsApp" },
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "x", label: "X (Twitter)" },
  { value: "telegram", label: "Telegram" },
  { value: "email", label: "Email" },
  { value: "sms", label: "SMS" },
  { value: "other", label: "Other" },
]

export function MetadataForm({ metadata, onMetadataChange, onSubmit, isSubmitting, isValid }: MetadataFormProps) {
  const handleChange = (field: keyof EvidenceMetadata, value: string) => {
    onMetadataChange({ ...metadata, [field]: value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Evidence Details</CardTitle>
        <CardDescription>
          Provide context about this evidence. This metadata will be securely timestamped.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="source-platform">Source Platform *</Label>
            <Select value={metadata.sourcePlatform} onValueChange={(value) => handleChange("sourcePlatform", value)}>
              <SelectTrigger id="source-platform">
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                {SOURCE_PLATFORMS.map((platform) => (
                  <SelectItem key={platform.value} value={platform.value}>
                    {platform.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date-of-incident">Date of Incident *</Label>
            <Input
              id="date-of-incident"
              type="date"
              value={metadata.dateOfIncident}
              onChange={(e) => handleChange("dateOfIncident", e.target.value)}
              max={new Date().toISOString().split("T")[0]}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description (Optional)</Label>
          <Textarea
            id="description"
            placeholder="Describe the context of this evidence..."
            value={metadata.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={3}
          />
        </div>

        <Button onClick={onSubmit} disabled={!isValid || isSubmitting} className="w-full sm:w-auto" size="lg">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Recording to Hedera...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Submit Evidence
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
