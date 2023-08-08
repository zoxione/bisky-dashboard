"use client"

import { DataTable } from "@/03-features/data-table"
import {
  useDeleteOneStudioMutation,
  useGetAllStudiosQuery,
  useUpdateManyStudiosMutation,
} from "@/02-entities/studio/api"

import { columns } from "./columns"

export const StudiosTable = () => {
  return (
    <DataTable
      columns={columns}
      useQuery={useGetAllStudiosQuery}
      useUpdateManyMutation={useUpdateManyStudiosMutation}
      filter=""
      // editDataForm={EditUserForm}
      useDeleteOneMutation={useDeleteOneStudioMutation}
    />
  )
}
