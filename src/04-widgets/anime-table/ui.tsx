"use client"

import {
  animeAPI,
  useDeleteOneAnimeInfoMutation,
  useGetAllAnimeInfoQuery,
  usePrefetch,
  useUpdateManyAnimeInfoMutation,
} from "@/02-entities/anime/api"
import { DataTable } from "@/03-features/data-table"

import { columns } from "./columns"

export const AnimeTable = () => {
  return (
    <DataTable
      columns={columns}
      useQuery={useGetAllAnimeInfoQuery}
      useQueryName={animeAPI.endpoints.getAllAnimeInfo.name}
      usePrefetch={usePrefetch}
      useUpdateManyMutation={useUpdateManyAnimeInfoMutation}
      filter="labels"
      // editDataForm={EditUserForm}
      useDeleteOneMutation={useDeleteOneAnimeInfoMutation}
    />
  )
}
