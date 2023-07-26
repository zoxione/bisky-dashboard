import { clientPromise } from "@/01-shared/libs/mongo"
import { DataTable } from "@/01-shared/ui/data-table"
import { IFact } from "@/02-entities/fact"
import { getFacts } from "@/02-entities/fact/api"

import { columns } from "./columns"

const FactsTable = async () => {
  const data = await getFacts()

  let editData = data.map((obj) => {
    return { _id: obj._id.toString(), fact: obj.fact }
  })

  return <DataTable columns={columns} data={editData} columnFilter="fact" />
}

export default FactsTable
