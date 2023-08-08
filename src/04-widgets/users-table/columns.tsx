"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ExternalLinkIcon } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/01-shared/ui/badge"
import { User } from "@/02-entities/user/models/user"
import { SortButton } from "@/03-features/sort-button"

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "profile",
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
  },
  {
    accessorKey: "_id",
    meta: {
      type: "text",
      disabled: true,
    },
    header: ({ column }) => {
      return <SortButton column={column} label="_id" />
    },
  },
  {
    accessorKey: "username",
    meta: {
      type: "text",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="username" />
    },
  },
  {
    accessorKey: "password",
    meta: {
      type: "text",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="password" />
    },
  },
  {
    accessorKey: "email",
    meta: {
      type: "email",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="email" />
    },
  },
  {
    accessorKey: "image",
    meta: {
      type: "text",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="image" />
    },
  },
  {
    accessorKey: "role",
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
  },
  {
    accessorKey: "name",
    meta: {
      type: "text",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="name" />
    },
  },
  {
    accessorKey: "refreshToken",
    meta: {
      type: "text",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="refreshToken" />
    },
  },
]
