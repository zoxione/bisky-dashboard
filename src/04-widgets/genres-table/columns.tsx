"use client"

import { ColumnDef, createColumnHelper } from "@tanstack/react-table"

import { Genre } from "@/02-entities/genre/models/genre"
import { SortButton } from "@/03-features/sort-button"
import { ActionsColumnTable } from "@/03-features/actions-column-table"
import { useDeleteOneGenreMutation } from "@/02-entities/genre/api"

const columnHelper = createColumnHelper<Genre>()

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
  columnHelper.accessor("name", {
    meta: {
      type: "object",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="name" />
    },
  }),
  columnHelper.accessor("hentai", {
    meta: {
      type: "text",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="hentai" />
    },
  }),
  columnHelper.accessor("linkId", {
    meta: {
      type: "object",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="linkId" />
    },
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => {
      const rowData = row.original as any
      return <ActionsColumnTable data={rowData} useDeleteMutation={useDeleteOneGenreMutation} />
    },
    header: ({ header }) => {
      return <div role="option" aria-selected />
    },
    maxSize: 30,
  }),
] as ColumnDef<Genre, unknown>[]
