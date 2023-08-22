"use client"

import { DataTable } from "@/03-features/data-table"
import {
  factsAPI,
  useDeleteOneFactMutation,
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
      useQueryName={factsAPI.endpoints.getAllFacts.name}
      usePrefetch={usePrefetch}
      useUpdateManyMutation={useUpdateManyFactsMutation}
      filter=""
      // editDataForm={EditUserForm}
      useDeleteOneMutation={useDeleteOneFactMutation}
    />
  )
}
