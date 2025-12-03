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

export enum CaseCategory {
  "DomesticViolence" = "domestic-violence",
  "SexualAssault" = "sexual-assault",
  "Harassment" = "harassment",
  "Stalking" = "stalking",
  "CyberHarassment" = "cyber-harassment",
  "EconomicAbuse" = "economic-abuse",
  "Other" = "other",
}

export enum CaseStatus {
  "Active" = "active",
  "Archived" = "archived",
  "SubmittedToCourt" = "submitted-to-court",
}

export enum EvidenceCategory {
  "Messages" = "messages",
  "Photos" = "photos",
  "Videos" = "videos",
  "Audio" = "audio",
  "Documents" = "documents",
  "SocialMedia" = "social-media",
  "Financial" = "financial",
  "Other" = "other",
}

export const CASE_CATEGORIES: { value: CaseCategory; label: string }[] = [
  { value: CaseCategory.DomesticViolence, label: "Domestic Violence" },
  { value: CaseCategory.SexualAssault, label: "Sexual Assault" },
  { value: CaseCategory.Harassment, label: "Harassment" },
  { value: CaseCategory.Stalking, label: "Stalking" },
  { value: CaseCategory.CyberHarassment, label: "Cyber Harassment" },
  { value: CaseCategory.EconomicAbuse, label: "Economic Abuse" },
  { value: CaseCategory.Other, label: "Other" },
];

export const EVIDENCE_CATEGORIES: { value: EvidenceCategory; label: string }[] = [
  { value: EvidenceCategory.Messages, label: "Messages/Texts" },
  { value: EvidenceCategory.Photos, label: "Photos" },
  { value: EvidenceCategory.Videos, label: "Videos" },
  { value: EvidenceCategory.Audio, label: "Audio Recordings" },
  { value: EvidenceCategory.Documents, label: "Documents" },
  { value: EvidenceCategory.SocialMedia, label: "Social Media" },
  { value: EvidenceCategory.Financial, label: "Financial Records" },
  { value: EvidenceCategory.Other, label: "Other" },
];
