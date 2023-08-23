"use client"

import { ColumnDef, createColumnHelper } from "@tanstack/react-table"

import { Studio } from "@/02-entities/studio/models/studio"
import { SortButton } from "@/03-features/sort-button"
import { ActionsColumnTable } from "@/03-features/actions-column-table"
import { useDeleteOneStudioMutation } from "@/02-entities/studio/api"

const columnHelper = createColumnHelper<Studio>()

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
  columnHelper.accessor("id", {
    meta: {
      type: "number",
      disabled: true,
    },
    header: ({ column }) => {
      return <SortButton column={column} label="id" />
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
  columnHelper.accessor("img", {
    meta: {
      type: "text",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="img" />
    },
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => {
      const rowData = row.original as any
      return <ActionsColumnTable data={rowData} useDeleteMutation={useDeleteOneStudioMutation} />
    },
    header: ({ header }) => {
      return <div role="option" aria-selected />
    },
    maxSize: 30,
  }),
] as ColumnDef<Studio, unknown>[]
