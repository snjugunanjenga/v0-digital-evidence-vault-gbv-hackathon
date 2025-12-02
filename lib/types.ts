export interface EvidenceMetadata {
  sourcePlatform: string
  dateOfIncident: string
  description: string
}

export interface SubmissionResult {
  success: boolean
  hash: string
  hederaTransactionId: string
  timestamp: string
  sequenceNumber: number
}

export interface Case {
  id: string
  title: string
  description: string | null
  category: CaseCategory
  status: CaseStatus
  createdAt: Date
  updatedAt: Date
  _count?: { evidence: number } // Added for getCases result
}

export interface Evidence {
  id: string
  caseId: string
  fileName: string
  fileType: string
  fileSize: number
  hash: string
  hederaTransactionId: string | null
  timestamp: Date
  sourcePlatform: string
  dateOfIncident: Date
  description: string | null
  category: EvidenceCategory
  thumbnailUrl?: string
  case: Case // This is included from Prisma query
}

export type CaseCategory =
  | "domestic-violence"
  | "sexual-assault"
  | "harassment"
  | "stalking"
  | "cyber-harassment"
  | "economic-abuse"
  | "other"

export type CaseStatus = "active" | "archived" | "submitted-to-court"

export type EvidenceCategory =
  | "messages"
  | "photos"
  | "videos"
  | "audio"
  | "documents"
  | "social-media"
  | "financial"
  | "other"

export const CASE_CATEGORIES: { value: CaseCategory; label: string }[] = [
  { value: "domestic-violence", label: "Domestic Violence" },
  { value: "sexual-assault", label: "Sexual Assault" },
  { value: "harassment", label: "Harassment" },
  { value: "stalking", label: "Stalking" },
  { value: "cyber-harassment", label: "Cyber Harassment" },
  { value: "economic-abuse", label: "Economic Abuse" },
  { value: "other", label: "Other" },
]

export const EVIDENCE_CATEGORIES: { value: EvidenceCategory; label: string }[] = [
  { value: "messages", label: "Messages/Texts" },
  { value: "photos", label: "Photos" },
  { value: "videos", label: "Videos" },
  { value: "audio", label: "Audio Recordings" },
  { value: "documents", label: "Documents" },
  { value: "social-media", label: "Social Media" },
  { value: "financial", label: "Financial Records" },
  { value: "other", label: "Other" },
]
