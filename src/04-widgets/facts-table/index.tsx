import { DataTable } from "@/01-shared/ui/data-table"
import { getFacts } from "@/02-entities/fact/api"

import { columns } from "./columns"

const FactsTable = async () => {
  const data = await getFacts()

  return (
    <DataTable
      columns={columns}
      data={JSON.parse(JSON.stringify(data))}
      columnFilter="fact"
    />
  )
}

export default FactsTable
