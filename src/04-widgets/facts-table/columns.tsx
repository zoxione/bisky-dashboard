"use client"

import { IFact } from "@/02-entities/fact"
import SortButton from "@/03-features/sort-button/ui"
import { ColumnDef } from "@tanstack/react-table"

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
