import { Suspense } from "react"
import { EvidenceUploadForm } from "@/components/dashboard/evidence-upload-form"
import { Loader2 } from "lucide-react"
import { getCases } from "@/lib/actions/case"

async function EvidenceUploadPageContent() {
  const cases = await getCases()
  return <EvidenceUploadForm cases={cases} />
}

function UploadPageFallback() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  )
}

export default function UploadPage() {
  return (
    <Suspense fallback={<UploadPageFallback />}>
      <EvidenceUploadPageContent />
    </Suspense>
  )
}
