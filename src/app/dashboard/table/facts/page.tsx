import { Badge } from "@/01-shared/ui/badge"
import { getFacts } from "@/02-entities/fact/api"
import FactsTable from "@/04-widgets/facts-table"

export default async function Page() {
  const data = await getFacts()

  return (
    <>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-2">
        Facts table from mongoDB
        <Badge variant="secondary" className="ml-4">
          Only reading
        </Badge>
      </h3>
      <FactsTable />

      <span className="">Count rows: {data.length}</span>
    </>
  )
}
