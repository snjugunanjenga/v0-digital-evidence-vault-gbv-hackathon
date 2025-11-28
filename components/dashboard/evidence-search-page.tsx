"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, ImageIcon, Video, FileText, File, Calendar, ExternalLink, X } from "lucide-react"
import type { Evidence, EvidenceCategory } from "@/lib/types"
import { EVIDENCE_CATEGORIES } from "@/lib/types"

// Mock data
const mockAllEvidence: Evidence[] = [
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
    description: "Threatening message received",
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
  {
    id: "4",
    caseId: "2",
    fileName: "email_harassment.pdf",
    fileType: "application/pdf",
    fileSize: 500000,
    hash: "abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789",
    hederaTransactionId: "0.0.123459@1706439300.111222333",
    timestamp: "2025-01-26T09:00:00Z",
    sourcePlatform: "Email",
    dateOfIncident: "2025-01-25",
    description: "Inappropriate emails from supervisor",
    category: "documents",
  },
  {
    id: "5",
    caseId: "2",
    fileName: "slack_messages.png",
    fileType: "image/png",
    fileSize: 320000,
    hash: "9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba",
    hederaTransactionId: "0.0.123460@1706439400.444555666",
    timestamp: "2025-01-25T14:00:00Z",
    sourcePlatform: "Other",
    dateOfIncident: "2025-01-24",
    description: "Screenshots of inappropriate Slack messages",
    category: "messages",
  },
  {
    id: "6",
    caseId: "3",
    fileName: "instagram_dm.png",
    fileType: "image/png",
    fileSize: 180000,
    hash: "fedcba9876543210fedcba9876543210fedcba9876543210fedcba9876543210",
    hederaTransactionId: "0.0.123461@1706439500.777888999",
    timestamp: "2025-01-24T18:00:00Z",
    sourcePlatform: "Instagram",
    dateOfIncident: "2025-01-23",
    description: "Unwanted DMs from stalker",
    category: "social-media",
  },
]

const mockCases = [
  { id: "1", title: "Domestic Violence Case" },
  { id: "2", title: "Workplace Harassment" },
  { id: "3", title: "Online Stalking Case" },
]

export function EvidenceSearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    caseId: "all",
    category: "all",
    dateFrom: "",
    dateTo: "",
  })
  const [showFilters, setShowFilters] = useState(false)

  const filteredEvidence = mockAllEvidence.filter((evidence) => {
    // Search query
    const matchesSearch =
      searchQuery === "" ||
      evidence.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evidence.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evidence.hash.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evidence.hederaTransactionId.toLowerCase().includes(searchQuery.toLowerCase())

    // Case filter
    const matchesCase = filters.caseId === "all" || evidence.caseId === filters.caseId

    // Category filter
    const matchesCategory = filters.category === "all" || evidence.category === filters.category

    // Date range filter
    const evidenceDate = new Date(evidence.dateOfIncident)
    const matchesDateFrom = !filters.dateFrom || evidenceDate >= new Date(filters.dateFrom)
    const matchesDateTo = !filters.dateTo || evidenceDate <= new Date(filters.dateTo)

    return matchesSearch && matchesCase && matchesCategory && matchesDateFrom && matchesDateTo
  })

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) return ImageIcon
    if (fileType.startsWith("video/")) return Video
    if (fileType.startsWith("audio/")) return FileText
    return File
  }

  const getCategoryLabel = (category: EvidenceCategory) => {
    return EVIDENCE_CATEGORIES.find((c) => c.value === category)?.label || category
  }

  const getCaseName = (caseId: string) => {
    return mockCases.find((c) => c.id === caseId)?.title || "Unknown Case"
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const clearFilters = () => {
    setFilters({
      caseId: "all",
      category: "all",
      dateFrom: "",
      dateTo: "",
    })
  }

  const hasActiveFilters =
    filters.caseId !== "all" || filters.category !== "all" || filters.dateFrom !== "" || filters.dateTo !== ""

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Search Evidence</h1>
        <p className="text-muted-foreground">Find evidence across all your cases.</p>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by filename, description, hash, or transaction ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-input border-border"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className={`neon-border bg-transparent hover:bg-primary/10 ${hasActiveFilters ? "text-primary" : ""}`}
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
          {hasActiveFilters && <span className="ml-2 w-2 h-2 rounded-full bg-primary" />}
        </Button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-foreground">Filters</h3>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
                  <X className="w-4 h-4 mr-1" />
                  Clear all
                </Button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Case</Label>
                <Select value={filters.caseId} onValueChange={(value) => setFilters({ ...filters, caseId: value })}>
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue placeholder="All cases" />
                  </SelectTrigger>
                  <SelectContent className="glass-card">
                    <SelectItem value="all">All Cases</SelectItem>
                    {mockCases.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent className="glass-card">
                    <SelectItem value="all">All Categories</SelectItem>
                    {EVIDENCE_CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>From Date</Label>
                <Input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-2">
                <Label>To Date</Label>
                <Input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                  className="bg-input border-border"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredEvidence.length} of {mockAllEvidence.length} evidence items
        </p>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvidence.map((evidence) => {
          const FileIcon = getFileIcon(evidence.fileType)
          return (
            <Card key={evidence.id} className="glass-card hover:neon-border transition-all group">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FileIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground text-sm truncate">{evidence.fileName}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{evidence.description}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30 text-xs">
                    Verified
                  </Badge>
                  <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/30 text-xs">
                    {getCategoryLabel(evidence.category)}
                  </Badge>
                </div>

                <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(evidence.dateOfIncident).toLocaleDateString()}</span>
                  </div>
                  <p className="truncate">Case: {getCaseName(evidence.caseId)}</p>
                </div>

                <div className="mt-3 p-2 rounded bg-muted/30">
                  <p className="text-xs text-muted-foreground mb-1">Transaction ID</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-mono text-primary truncate flex-1">{evidence.hederaTransactionId}</p>
                    <a
                      href={`https://hashscan.io/mainnet/transaction/${evidence.hederaTransactionId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <Button variant="ghost" size="sm" className="w-full mt-3 text-primary hover:bg-primary/10" asChild>
                  <Link href={`/dashboard/cases/${evidence.caseId}`}>View Case</Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredEvidence.length === 0 && (
        <div className="text-center py-16">
          <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No evidence found</h3>
          <p className="text-muted-foreground">Try adjusting your search query or filters.</p>
        </div>
      )}
    </div>
  )
}
