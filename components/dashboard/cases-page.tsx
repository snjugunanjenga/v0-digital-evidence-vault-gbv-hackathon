"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search, FolderOpen, MoreVertical, Calendar } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Case } from "@/lib/types"
import { createCase } from "@/lib/actions/case"
import { useRouter } from 'next/navigation'

interface CasesPageProps {
  cases: Case[]
}

export function CasesPage({ cases: initialCases }: CasesPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  // const [categoryFilter, setCategoryFilter] = useState<string>("all") // Removed category filter
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newCase, setNewCase] = useState({
    title: "",
    description: "",
    // category: "" as CaseCategory, // Removed category
  })
  const [cases, setCases] = useState(initialCases);
  const router = useRouter();

  const filteredCases = cases.filter((caseItem) => {
    const matchesSearch =
      caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (caseItem.description && caseItem.description.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Cases</h1>
          <p className="text-muted-foreground">Manage and organize your evidence by case.</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              New Case
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-card border-border">
            <DialogHeader>
              <DialogTitle>Create New Case</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Case Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Domestic Violence Documentation"
                  value={newCase.title}
                  onChange={(e) => setNewCase({ ...newCase, title: e.target.value })}
                  className="bg-input border-border"
                />
              </div>
              {/* Removed Category selection */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of the case..."
                  value={newCase.description}
                  onChange={(e) => setNewCase({ ...newCase, description: e.target.value })}
                  className="bg-input border-border min-h-[100px]"
                />
              </div>
              <Button
                onClick={async () => {
                  const formData = new FormData();
                  formData.append('title', newCase.title);
                  formData.append('description', newCase.description);

                  try {
                    await createCase(formData);
                    setIsCreateDialogOpen(false);
                    setNewCase({ title: "", description: "" }); // category removed
                    router.refresh();
                  } catch (error) {
                    console.error("Error creating case:", error);
                  }
                }}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Create Case
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search cases..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-input border-border"
          />
        </div>
        {/* Removed Category filter Select */}
      </div>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCases.map((caseItem) => (
          <Card key={caseItem.id} className="glass-card hover:neon-border transition-all group">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FolderOpen className="w-6 h-6 text-primary" />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="glass-card">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Archive</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <Link href={`/dashboard/cases/${caseItem.id}`}>
                <h3 className="font-semibold text-foreground hover:text-primary transition-colors">{caseItem.title}</h3>
              </Link>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{caseItem.description}</p>

              <div className="flex items-center gap-2 mt-4">
                {/* Removed category display as it's no longer on Case */}
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                  {caseItem._count?.evidence || 0} items
                </span>
              </div>

              <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                <span>Updated {new Date(caseItem.updatedAt).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCases.length === 0 && (
        <div className="text-center py-16">
          <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No cases found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery
              ? "Try adjusting your search or filters."
              : "Create your first case to start organizing evidence."}
          </p>
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Case
          </Button>
        </div>
      )}
    </div>
  )
}
