
import { Suspense } from "react"
import { getEvidence } from "@/lib/actions/evidence"
import { Loader2 } from "lucide-react"
import { EvidenceLockerPage } from "@/components/dashboard/evidence-locker-page"

async function EvidencePageContent() {
  const unassignedEvidence = await getEvidence({ caseId: null })
  return <EvidenceLockerPage initialEvidence={unassignedEvidence} />
}

function EvidencePageFallback() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  )
}

export default function EvidencePage() {
  return (
    <Suspense fallback={<EvidencePageFallback />}>
      <EvidencePageContent />
    </Suspense>
  )
}
