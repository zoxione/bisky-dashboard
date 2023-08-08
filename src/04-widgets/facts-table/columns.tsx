"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Fact } from "@/02-entities/fact/models/fact"
import { SortButton } from "@/03-features/sort-button"

export const columns: ColumnDef<Fact>[] = [
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
    accessorKey: "fact",
    meta: {
      type: "textarea",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="fact" />
    },
    minSize: 360,
  },
]
