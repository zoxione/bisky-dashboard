"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

import { IUser } from "@/02-entities/user"
import SortButton from "@/03-features/sort-button/ui"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/01-shared/ui/select"

export const updateUser = async (user: IUser) => {
  const res = await fetch(
    `${process.env.APP_URL}/api/database/users/${user._id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    },
  )

  if (!res.ok) {
    return { data: null, error: true }
  }

  const data = await res.json()

  return { data: data, error: false }
}

export const columns: ColumnDef<IUser>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => {
      return <SortButton column={column} label="Username" />
    },
    cell: ({ row }) => {
      const user = row.original
      return <Link href={`/dashboard/user/${user._id}`}>{user.username}</Link>
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
    cell: ({ row }) => {
      const user = row.original
      return (
        <Select
          value={user.role}
          onValueChange={async (role: string) => {
            user.role = role
            await updateUser(user)
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Roles</SelectLabel>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="moderator">Moderator</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      )
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <SortButton column={column} label="Name" />
    },
  },
]
