"use client"

import { DataTable } from "@/03-features/data-table"
import { useDeleteOneFactMutation, useGetAllFactsQuery, useUpdateManyFactsMutation } from "@/02-entities/fact/api"

import { columns } from "./columns"

export const FactsTable = () => {
  return (
    <DataTable
      columns={columns}
      useQuery={useGetAllFactsQuery}
      useUpdateManyMutation={useUpdateManyFactsMutation}
      filter=""
      // editDataForm={EditUserForm}
      useDeleteOneMutation={useDeleteOneFactMutation}
    />
  )
}
