"use client"

import { useDeleteOneUserMutation, useGetAllUsersQuery, useUpdateManyUsersMutation } from "@/02-entities/user/api"
import { EditUserForm } from "@/03-features/edit-user-form"
import { DataTable } from "@/03-features/data-table"

import { columns } from "./columns"

export const UsersTable = () => {
  return (
    <DataTable
      columns={columns}
      useQuery={useGetAllUsersQuery}
      useUpdateManyMutation={useUpdateManyUsersMutation}
      filter=""
      editDataForm={EditUserForm}
      useDeleteOneMutation={useDeleteOneUserMutation}
    />
  )
}
