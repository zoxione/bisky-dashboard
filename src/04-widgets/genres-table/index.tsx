import { clientPromise } from "@/01-shared/libs/mongo"
import { DataTable } from "@/01-shared/ui/data-table"
import { IAnimeInfo } from "@/02-entities/anime"
import { ColumnDef } from "@tanstack/react-table"
import { columns } from "./columns"
import { IGenre } from "@/02-entities/genre"
import { getGenres } from "@/02-entities/genre/api"

const GenresTable = async () => {
  const data = await getGenres()

  let editData = data.map((obj) => {
    const { _id, ...newObj } = obj
    return newObj
  })

  return <DataTable columns={columns} data={editData} />
}

export default GenresTable
