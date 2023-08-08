"use client"

import {
  useDeleteOneAnimeInfoMutation,
  useGetAllAnimeInfoQuery,
  useUpdateManyAnimeInfoMutation,
} from "@/02-entities/anime/api"
import { DataTable } from "@/03-features/data-table"

import { columns } from "./columns"

export const AnimeTable = () => {
  return (
    <DataTable
      columns={columns}
      useQuery={useGetAllAnimeInfoQuery}
      useUpdateManyMutation={useUpdateManyAnimeInfoMutation}
      filter="labels"
      // editDataForm={EditUserForm}
      useDeleteOneMutation={useDeleteOneAnimeInfoMutation}
    />
  )
}
