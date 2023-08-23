"use client"

import { useGetAllUsersQuery, usePrefetch, useUpdateManyUsersMutation } from "@/02-entities/user/api"
import { DataTable } from "@/03-features/data-table"

import { columns } from "./columns"

export const UsersTable = () => {
  return (
    <DataTable
      columns={columns}
      useQuery={useGetAllUsersQuery}
      prefetchNextPage={usePrefetch("getAllUsers")}
      useUpdateManyMutation={useUpdateManyUsersMutation}
      filter=""
    />
  )
}
