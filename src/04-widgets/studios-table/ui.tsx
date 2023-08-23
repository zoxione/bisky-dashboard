"use client"

import { DataTable } from "@/03-features/data-table"
import {
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
      prefetchNextPage={usePrefetch("getAllStudios")}
      useUpdateManyMutation={useUpdateManyStudiosMutation}
      filter=""
    />
  )
}
