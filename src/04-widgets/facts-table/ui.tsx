"use client"

import { DataTable } from "@/03-features/data-table"
import {
  useGetAllFactsQuery,
  usePrefetch,
  useUpdateManyFactsMutation,
} from "@/02-entities/fact/api"

import { columns } from "./columns"

export const FactsTable = () => {
  return (
    <DataTable
      columns={columns}
      useQuery={useGetAllFactsQuery}
      prefetchNextPage={usePrefetch("getAllFacts")}
      useUpdateManyMutation={useUpdateManyFactsMutation}
      filter=""
    />
  )
}
