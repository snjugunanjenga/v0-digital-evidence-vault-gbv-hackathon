import { CasesPage } from "@/components/dashboard/cases-page"
import { getCases } from "@/lib/actions/case"

export default async function Cases() {
  const cases = await getCases()
  return <CasesPage cases={cases} />
}
