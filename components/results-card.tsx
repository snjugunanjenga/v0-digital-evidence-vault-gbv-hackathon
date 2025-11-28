"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { SubmissionResult } from "@/lib/types"

interface ResultsCardProps {
  result: SubmissionResult
}

export function ResultsCard({ result }: ResultsCardProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const formatTimestamp = (iso: string): string => {
    return new Date(iso).toLocaleString("en-KE", {
      dateStyle: "long",
      timeStyle: "medium",
    })
  }

  return (
    <Card className="border-2 border-green-500/30 bg-green-50/50 dark:bg-green-950/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
            Evidence Recorded
          </CardTitle>
          <Badge variant="default" className="bg-green-600 hover:bg-green-700">
            Verified
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">SHA-256 Hash</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 p-3 bg-background rounded-md border text-xs font-mono break-all">
                {result.hash}
              </code>
              <Button variant="outline" size="icon" onClick={() => copyToClipboard(result.hash)} className="shrink-0">
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy hash</span>
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Hedera Transaction ID</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 p-3 bg-background rounded-md border text-xs font-mono break-all">
                {result.hederaTransactionId}
              </code>
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(result.hederaTransactionId)}
                className="shrink-0"
              >
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy transaction ID</span>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Timestamp</p>
              <p className="text-sm text-foreground">{formatTimestamp(result.timestamp)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Sequence Number</p>
              <p className="text-sm text-foreground">{result.sequenceNumber}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button variant="outline" size="sm" asChild>
            <a
              href={`https://hashscan.io/mainnet/transaction/${result.hederaTransactionId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              View on HashScan
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
