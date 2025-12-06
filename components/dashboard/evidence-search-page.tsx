"use client"

import { useState, useTransition, useMemo } from "react"
import Link from "next/link"
import type { Evidence, Case } from "@prisma/client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

import { Search, Filter, ImageIcon, Video, FileText, File, Calendar, ExternalLink, X } from "lucide-react"

import { EVIDENCE_CATEGORIES } from "@/lib/types"

import { getEvidence } from "@/lib/actions/evidence"


interface EvidenceSearchPageProps {

  initialEvidence: Evidence[]

  cases: Case[]

}



export function EvidenceSearchPage({ initialEvidence, cases }: EvidenceSearchPageProps) {

  const [searchQuery, setSearchQuery] = useState("")

  const [filters, setFilters] = useState({

    caseId: "all",

    category: "all",

    dateFrom: "",

    dateTo: "",

  })

  const [showFilters, setShowFilters] = useState(false)

  const [serverFetchedEvidence, setServerFetchedEvidence] = useState<Evidence[] | null>(null)

  const [isPending, startTransition] = useTransition()



  const clientFilteredInitialEvidence = useMemo(() => {

    return initialEvidence.filter((evidence) => {

      const matchesSearch =

        searchQuery === "" ||

        evidence.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||

        (evidence.description && evidence.description.toLowerCase().includes(searchQuery.toLowerCase())) ||

        evidence.fileHash.toLowerCase().includes(searchQuery.toLowerCase()) ||

        (evidence.hederaTransactionId && evidence.hederaTransactionId.toLowerCase().includes(searchQuery.toLowerCase()))



      const matchesCase = filters.caseId === "all" || evidence.caseId === filters.caseId



      const matchesCategory = filters.category === "all" || (evidence.category && evidence.category === filters.category)



      const evidenceDate = evidence.dateOfIncident ? new Date(evidence.dateOfIncident) : null

      const matchesDateFrom = !filters.dateFrom || (evidenceDate && evidenceDate >= new Date(filters.dateFrom))

      const matchesDateTo = !filters.dateTo || (evidenceDate && evidenceDate <= new Date(filters.dateTo))



      return matchesSearch && matchesCase && matchesCategory && matchesDateFrom && matchesDateTo

    })

  }, [searchQuery, filters, initialEvidence])



  const handleFilterChange = (key: string, value: string) => {

    setFilters((prev) => ({

      ...prev,

      [key]: value,

    }));

    // Trigger server re-fetch if needed. For now, we update client state.

    // In a real app, this would trigger a `startTransition` with `getEvidence`

  }



  const handleSearch = () => {

    startTransition(async () => {

      const fetchedEvidence = await getEvidence({

        searchQuery,

        caseId: filters.caseId === 'all' ? undefined : filters.caseId === 'null' ? null : filters.caseId,

        category: filters.category === 'all' ? undefined : (filters.category as EvidenceCategory),

        dateFrom: filters.dateFrom ? new Date(filters.dateFrom) : undefined,

        dateTo: filters.dateTo ? new Date(filters.dateTo) : undefined,

      });

      setServerFetchedEvidence(fetchedEvidence);

    });

  };



  const getFileIcon = (fileType: string) => {

    if (fileType.startsWith("image/")) return ImageIcon

    if (fileType.startsWith("video/")) return Video

    if (fileType.startsWith("audio/")) return FileText

    return File

  }



  const getCategoryLabel = (category: EvidenceCategory) => {

    return EVIDENCE_CATEGORIES.find((c) => c.value === category)?.label || category

  }



  const getCaseName = (caseId: string | null) => {

    if (!caseId) return "Evidence Locker"

    return cases.find((c) => c.id === caseId)?.title || "Unknown Case"

  }



  const formatFileSize = (bytes: number) => {

    if (bytes < 1024) return `${bytes} B`

    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`

  }



  const clearFilters = () => {

    setSearchQuery("");

    setFilters({

      caseId: "all",

      category: "all",

      dateFrom: "",

      dateTo: "",

    });

    setServerFetchedEvidence(null); // Reset server fetched evidence

  }



  const hasActiveFilters =

    searchQuery !== "" || filters.caseId !== "all" || filters.category !== "all" || filters.dateFrom !== "" || filters.dateTo !== ""



  const displayedEvidence = serverFetchedEvidence || clientFilteredInitialEvidence;



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

          onClick={handleSearch}

          className={`neon-border bg-transparent hover:bg-primary/10 ${hasActiveFilters ? "text-primary" : ""}`}

          disabled={isPending}

        >

          <Search className="w-4 h-4 mr-2" />

          {isPending ? "Searching..." : "Search"}

        </Button>

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

                <Select value={filters.caseId} onValueChange={(value) => handleFilterChange('caseId', value)}>

                  <SelectTrigger className="bg-input border-border">

                    <SelectValue placeholder="All cases" />

                  </SelectTrigger>

                  <SelectContent className="glass-card">

                    <SelectItem value="all">All Cases</SelectItem>

                    <SelectItem value="null">Evidence Locker</SelectItem> {/* Add option for unassigned evidence */}

                    {cases.map((c) => (

                      <SelectItem key={c.id} value={c.id}>

                        {c.title}

                      </SelectItem>

                    ))}

                  </SelectContent>

                </Select>

              </div>

              <div className="space-y-2">

                <Label>Category</Label>

                <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>

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

                  onChange={(e) => handleFilterChange('dateFrom', e.target.value)}

                  className="bg-input border-border"

                />

              </div>

              <div className="space-y-2">

                <Label>To Date</Label>

                <Input

                  type="date"

                  value={filters.dateTo}

                  onChange={(e) => handleFilterChange('dateTo', e.target.value)}

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

          Showing {displayedEvidence.length} of {initialEvidence.length} evidence items

        </p>

      </div>



      {/* Results Grid */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {displayedEvidence.map((evidence) => {

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

                    {evidence.category ? getCategoryLabel(evidence.category) : "N/A"}

                  </Badge>

                </div>



                <div className="mt-3 space-y-1 text-xs text-muted-foreground">

                  <div className="flex items-center gap-2">

                    <Calendar className="w-3 h-3" />

                    <span>{evidence.dateOfIncident ? new Date(evidence.dateOfIncident).toLocaleDateString() : "N/A"}</span>

                  </div>

                  <p className="truncate">Case: {getCaseName(evidence.caseId)}</p>

                </div>



                <div className="mt-3 p-2 rounded bg-muted/30">

                  <p className="text-xs text-muted-foreground mb-1">Transaction ID</p>

                  <div className="flex items-center gap-2">

                    <p className="text-xs font-mono text-primary truncate flex-1">{evidence.hederaTransactionId}</p>

                    {evidence.hederaTransactionId && (

                      <a

                        href={`https://hashscan.io/mainnet/transaction/${evidence.hederaTransactionId}`}

                        target="_blank"

                        rel="noopener noreferrer"

                        className="text-primary hover:text-primary/80"

                      >

                        <ExternalLink className="w-3 h-3" />

                      </a>

                    )}

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



      {displayedEvidence.length === 0 && (

        <div className="text-center py-16">

          <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />

          <h3 className="text-lg font-medium text-foreground mb-2">No evidence found</h3>

          <p className="text-muted-foreground">Try adjusting your search query or filters.</p>

        </div>

      )

    }


    </div>
  )
}
