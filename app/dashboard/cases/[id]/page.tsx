import { CaseDetailPage } from "@/components/dashboard/case-detail-page"

export default async function CaseDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <CaseDetailPage caseId={id} />
}
