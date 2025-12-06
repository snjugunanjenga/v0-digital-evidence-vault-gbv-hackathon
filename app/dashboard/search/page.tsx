import { Evidence } from "@prisma/client"
import { EvidenceSearchPage } from "@/components/dashboard/evidence-search-page"
import { getEvidence } from "@/lib/actions/evidence"
import { getCases } from "@/lib/actions/case"

export default async function SearchPage() {
  const initialEvidence: Evidence[] = await getEvidence()
  const cases = await getCases()
  return <EvidenceSearchPage initialEvidence={initialEvidence} cases={cases} />
}
