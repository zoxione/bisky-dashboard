"use client"

import { DataTable } from "@/03-features/data-table"
import {
  studiosAPI,
  useDeleteOneStudioMutation,
  useGetAllStudiosQuery,
  usePrefetch,
  useUpdateManyStudiosMutation,
} from "@/02-entities/studio/api"

import { columns } from "./columns"

export const StudiosTable = () => {
  return (
    <DataTable
      columns={columns}
      useQuery={useGetAllStudiosQuery}
      useQueryName={studiosAPI.endpoints.getAllStudios.name}
      usePrefetch={usePrefetch}
      useUpdateManyMutation={useUpdateManyStudiosMutation}
      filter=""
      // editDataForm={EditUserForm}
      useDeleteOneMutation={useDeleteOneStudioMutation}
    />
  )
}
