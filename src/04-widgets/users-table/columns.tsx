"use client"

import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { ExternalLinkIcon } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/01-shared/ui/badge"
import { User } from "@/02-entities/user/models/user"
import { SortButton } from "@/03-features/sort-button"
import { ActionsColumnTable } from "@/03-features/actions-column-table"
import { useDeleteOneUserMutation } from "@/02-entities/user/api"

const columnHelper = createColumnHelper<User>()

export const columns = [
  columnHelper.display({
    id: "profile",
    meta: {
      type: "profile",
    },
    header: () => <span className="p-2">User</span>,
    cell: ({ row }) => {
      const user = row.original
      return (
        <Link href={`/dashboard/user/${user._id}`}>
          <Badge variant="secondary">
            {user.username}
            <ExternalLinkIcon className="w-3 h-3 ml-2" />
          </Badge>
        </Link>
      )
    },
  }),
  columnHelper.accessor("_id", {
    meta: {
      type: "text",
      disabled: true,
    },
    header: ({ column }) => {
      return <SortButton column={column} label="_id" />
    },
  }),
  columnHelper.accessor("username", {
    meta: {
      type: "text",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="username" />
    },
  }),
  columnHelper.accessor("password", {
    meta: {
      type: "text",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="password" />
    },
  }),
  columnHelper.accessor("email", {
    meta: {
      type: "email",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="email" />
    },
  }),
  columnHelper.accessor("image", {
    meta: {
      type: "text",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="image" />
    },
  }),
  columnHelper.accessor("role", {
    meta: {
      type: "select",
      options: [
        { value: "admin", label: "Admin" },
        { value: "moderator", label: "Moderator" },
        { value: "user", label: "User" },
      ],
    },
    header: ({ column }) => {
      return <SortButton column={column} label="role" />
    },
  }),
  columnHelper.accessor("name", {
    meta: {
      type: "text",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="name" />
    },
  }),
  columnHelper.accessor("refreshToken", {
    meta: {
      type: "text",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="refreshToken" />
    },
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => {
      const rowData = row.original as any
      return <ActionsColumnTable data={rowData} useDeleteMutation={useDeleteOneUserMutation} />
    },
    header: ({ header }) => {
      return <div role="option" aria-selected />
    },
    maxSize: 30,
  }),
] as ColumnDef<User, unknown>[]
