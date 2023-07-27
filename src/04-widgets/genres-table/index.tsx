import { DataTable } from "@/01-shared/ui/data-table"
import { getGenres } from "@/02-entities/genre/api"

import { columns } from "./columns"

const GenresTable = async () => {
  const data = await getGenres()

  return <DataTable columns={columns} data={JSON.parse(JSON.stringify(data))} />
}

export default GenresTable
