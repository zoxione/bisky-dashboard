"use client"

import { ColumnDef, createColumnHelper } from "@tanstack/react-table"

import { Fact } from "@/02-entities/fact/models/fact"
import { SortButton } from "@/03-features/sort-button"
import { useDeleteOneFactMutation } from "@/02-entities/fact/api"
import { ActionsColumnTable } from "@/03-features/actions-column-table"

const columnHelper = createColumnHelper<Fact>()

export const columns = [
  columnHelper.accessor("_id", {
    meta: {
      type: "text",
      disabled: true,
    },
    header: ({ column }) => {
      return <SortButton column={column} label="_id" />
    },
  }),
  columnHelper.accessor("fact", {
    meta: {
      type: "textarea",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="fact" />
    },
    minSize: 360,
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => {
      const rowData = row.original as any
      return <ActionsColumnTable data={rowData} useDeleteMutation={useDeleteOneFactMutation} />
    },
    header: ({ header }) => {
      return <div role="option" aria-selected />
    },
    maxSize: 30,
  }),
] as ColumnDef<Fact, unknown>[]
