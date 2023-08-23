"use client"

import { DataTable } from "@/03-features/data-table"
import {
  useGetAllGenresQuery,
  usePrefetch,
  useUpdateManyGenresMutation,
} from "@/02-entities/genre/api"

import { columns } from "./columns"

export const GenresTable = () => {
  return (
    <DataTable
      columns={columns}
      useQuery={useGetAllGenresQuery}
      prefetchNextPage={usePrefetch("getAllGenres")}
      useUpdateManyMutation={useUpdateManyGenresMutation}
      filter=""
    />
  )
}
