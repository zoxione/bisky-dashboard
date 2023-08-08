"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Studio } from "@/02-entities/studio/models/studio"
import { SortButton } from "@/03-features/sort-button"

export const columns: ColumnDef<Studio>[] = [
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
    accessorKey: "id",
    meta: {
      type: "number",
      disabled: true,
    },
    header: ({ column }) => {
      return <SortButton column={column} label="id" />
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
    accessorKey: "img",
    meta: {
      type: "text",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="img" />
    },
  },
]
