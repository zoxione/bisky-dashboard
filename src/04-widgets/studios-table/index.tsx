import { clientPromise } from "@/01-shared/libs/mongo"
import { DataTable } from "@/01-shared/ui/data-table"
import { IAnimeInfo } from "@/02-entities/anime"
import { ColumnDef } from "@tanstack/react-table"
import { columns } from "./columns"
import { IStudio } from "@/02-entities/studio"
import { getStudios } from "@/02-entities/studio/api"

const StudiosTable = async () => {
  const data = await getStudios()

  let editData = data.map((obj) => {
    const { _id, ...newObj } = obj
    return newObj
  })

  return <DataTable columns={columns} data={editData} columnFilter="name" />
}

export default StudiosTable
