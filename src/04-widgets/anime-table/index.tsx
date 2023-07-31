"use client"

import { DataTable } from "@/01-shared/ui/data-table"
import { useGetAllAnimeInfoQuery } from "@/02-entities/anime/api"

import { columns } from "./columns"

const AnimeTable = () => {
  // let editData = data.map((obj) => {
  //   let label = ""
  //   if (obj.labels[0] !== "") {
  //     label = obj.labels[0]
  //   } else if (obj.labels[1] !== "") {
  //     label = obj.labels[1]
  //   }
  //   return { label, ...obj }
  // })

  return (
    <DataTable
      columns={columns}
      useQuery={useGetAllAnimeInfoQuery}
      filter="labels"
    />
  )
}

export default AnimeTable
