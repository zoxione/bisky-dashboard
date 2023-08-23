"use client"

import {
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
      prefetchNextPage={usePrefetch("getAllAnimeInfo")}
      useUpdateManyMutation={useUpdateManyAnimeInfoMutation}
      filter="labels"
    />
  )
}
