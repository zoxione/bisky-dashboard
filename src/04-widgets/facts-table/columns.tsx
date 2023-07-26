"use client"

import { ColumnDef } from "@tanstack/react-table"

import { IFact } from "@/02-entities/fact"
import SortButton from "@/03-features/sort-button/ui"

export const columns: ColumnDef<Omit<IFact, "_id">>[] = [
  {
    accessorKey: "_id",
    header: ({ column }) => {
      return <SortButton column={column} label="Id" />
    },
  },
  {
    accessorKey: "fact",
    header: ({ column }) => {
      return <SortButton column={column} label="Fact" />
    },
  },
]
