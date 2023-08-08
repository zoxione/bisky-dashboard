"use client"

import { DataTable } from "@/03-features/data-table"
import { useDeleteOneGenreMutation, useGetAllGenresQuery, useUpdateManyGenresMutation } from "@/02-entities/genre/api"

import { columns } from "./columns"

export const GenresTable = () => {
  return (
    <DataTable
      columns={columns}
      useQuery={useGetAllGenresQuery}
      useUpdateManyMutation={useUpdateManyGenresMutation}
      filter=""
      // editDataForm={EditUserForm}
      useDeleteOneMutation={useDeleteOneGenreMutation}
    />
  )
}
