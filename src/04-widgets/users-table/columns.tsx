"use client"

import { ColumnDef } from "@tanstack/react-table"

import { IUser } from "@/02-entities/user"
import SortButton from "@/03-features/sort-button/ui"

export const columns: ColumnDef<Omit<IUser, "_id">>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => {
      return <SortButton column={column} label="Username" />
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return <SortButton column={column} label="Email" />
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return <SortButton column={column} label="Role" />
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <SortButton column={column} label="Name" />
    },
  },
]
