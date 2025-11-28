import { Suspense } from "react"
import { EvidenceUploadPage } from "@/components/dashboard/evidence-upload-page"
import { Loader2 } from "lucide-react"

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
      <EvidenceUploadPage />
    </Suspense>
  )
}
