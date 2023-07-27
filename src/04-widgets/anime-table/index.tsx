import { DataTable } from "@/01-shared/ui/data-table"
import { getAllAnime } from "@/02-entities/anime/api"

import { columns } from "./columns"

const AnimeTable = async () => {
  const data = await getAllAnime()

  let editData = data.map((obj) => {
    let label = ""
    if (obj.labels[0] !== "") {
      label = obj.labels[0]
    } else if (obj.labels[1] !== "") {
      label = obj.labels[1]
    }
    return { label, ...obj }
  })

  return (
    <DataTable
      columns={columns}
      data={JSON.parse(JSON.stringify(editData))}
      columnFilter="label"
    />
  )
}

export default AnimeTable
