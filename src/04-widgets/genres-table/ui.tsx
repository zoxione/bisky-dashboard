"use client"

import { DataTable } from "@/03-features/data-table"
import {
  genresAPI,
  useDeleteOneGenreMutation,
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
      useQueryName={genresAPI.endpoints.getAllGenres.name}
      usePrefetch={usePrefetch}
      useUpdateManyMutation={useUpdateManyGenresMutation}
      filter=""
      // editDataForm={EditUserForm}
      useDeleteOneMutation={useDeleteOneGenreMutation}
    />
  )
}
