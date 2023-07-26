import { DataTable } from "@/01-shared/ui/data-table"
import { getAllAnime } from "@/02-entities/anime/api"

import { columns } from "./columns"

const AnimeTable = async () => {
  const data = await getAllAnime()

  let editData = data.map((obj) => {
    const { _id, franchise, ...newObj } = obj
    let label = ""
    if (newObj.labels[0] !== "") {
      label = newObj.labels[0]
    } else if (newObj.labels[1] !== "") {
      label = newObj.labels[1]
    }
    return { label, ...newObj }
  })

  return <DataTable columns={columns} data={editData} columnFilter="label" />
}

export default AnimeTable
