import { DataTable } from "@/01-shared/ui/data-table"
import { getAllAnime } from "@/02-entities/anime/api"
import { columns } from "./columns"

const AnimeTable = async () => {
  const data = await getAllAnime()

  let editData = data.map((obj) => {
    const { _id, franchise, ...newObj } = obj
    const labels = obj.labels
    if (labels[0] !== "") {
      newObj.poster = labels[0]
    } else if (labels[1] !== "") {
      newObj.poster = labels[1]
    }
    return newObj
  })

  return <DataTable columns={columns} data={editData} columnFilter="" />
}

export default AnimeTable
