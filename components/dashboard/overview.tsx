"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FolderOpen, FileCheck, Clock, Shield, Plus, ArrowRight } from "lucide-react"
import type { Case, Evidence } from "@/lib/types"

// Mock data
const mockStats = {
  totalCases: 3,
  totalEvidence: 12,
  pendingVerification: 2,
  verifiedEvidence: 10,
}

const mockRecentCases: Case[] = [
  {
    id: "1",
    title: "Domestic Violence Case",
    description: "Documenting ongoing abuse incidents",
    category: "domestic-violence",
    status: "active",
    createdAt: "2025-01-15",
    updatedAt: "2025-01-28",
    evidenceCount: 5,
  },
  {
    id: "2",
    title: "Workplace Harassment",
    description: "Collection of inappropriate messages",
    category: "harassment",
    status: "active",
    createdAt: "2025-01-20",
    updatedAt: "2025-01-27",
    evidenceCount: 4,
  },
]

const mockRecentEvidence: Evidence[] = [
  {
    id: "1",
    caseId: "1",
    fileName: "threatening_message.png",
    fileType: "image/png",
    fileSize: 245000,
    hash: "a1b2c3d4e5f6...",
    hederaTransactionId: "0.0.123456@1706439000",
    timestamp: "2025-01-28T10:30:00Z",
    sourcePlatform: "WhatsApp",
    dateOfIncident: "2025-01-27",
    description: "Threatening message received",
    category: "messages",
  },
  {
    id: "2",
    caseId: "1",
    fileName: "bruise_photo.jpg",
    fileType: "image/jpeg",
    fileSize: 1200000,
    hash: "f6e5d4c3b2a1...",
    hederaTransactionId: "0.0.123457@1706439100",
    timestamp: "2025-01-28T11:00:00Z",
    sourcePlatform: "Camera",
    dateOfIncident: "2025-01-28",
    description: "Documentation of injury",
    category: "photos",
  },
]

export function DashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back, Sarah</h1>
          <p className="text-muted-foreground">Your evidence vault is secure and up to date.</p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/dashboard/upload">
            <Plus className="w-4 h-4 mr-2" />
            Add Evidence
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-card neon-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <FolderOpen className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{mockStats.totalCases}</p>
                <p className="text-sm text-muted-foreground">Active Cases</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card neon-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                <FileCheck className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{mockStats.totalEvidence}</p>
                <p className="text-sm text-muted-foreground">Evidence Items</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card neon-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{mockStats.verifiedEvidence}</p>
                <p className="text-sm text-muted-foreground">Verified on Hedera</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card neon-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-chart-4/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-chart-4" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{mockStats.pendingVerification}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Cases & Evidence */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Cases */}
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Cases</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/cases" className="text-primary">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockRecentCases.map((caseItem) => (
              <Link
                key={caseItem.id}
                href={`/dashboard/cases/${caseItem.id}`}
                className="block p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">{caseItem.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{caseItem.description}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                    {caseItem.evidenceCount} items
                  </span>
                </div>
              </Link>
            ))}
            {mockRecentCases.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No cases yet. Create your first case to start.</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Evidence */}
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Evidence</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/search" className="text-primary">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockRecentEvidence.map((evidence) => (
              <div key={evidence.id} className="p-4 rounded-lg bg-muted/30">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">{evidence.fileName}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{evidence.description}</p>
                    <p className="text-xs text-primary mt-2 font-mono">{evidence.hederaTransactionId}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-500">Verified</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="glass-card neon-border">
        <CardContent className="p-6">
          <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-auto py-4 flex-col gap-2 neon-border bg-transparent hover:bg-primary/10"
              asChild
            >
              <Link href="/dashboard/cases/new">
                <FolderOpen className="w-6 h-6 text-primary" />
                <span>Create New Case</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex-col gap-2 neon-border bg-transparent hover:bg-primary/10"
              asChild
            >
              <Link href="/dashboard/upload">
                <FileCheck className="w-6 h-6 text-primary" />
                <span>Upload Evidence</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex-col gap-2 neon-border bg-transparent hover:bg-primary/10"
              asChild
            >
              <Link href="/dashboard/search">
                <Shield className="w-6 h-6 text-primary" />
                <span>Search Evidence</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
