"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Genre } from "@/02-entities/genre/models/genre"
import { SortButton } from "@/03-features/sort-button"

export const columns: ColumnDef<Genre>[] = [
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
    accessorKey: "name",
    meta: {
      type: "object",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="name" />
    },
  },
  {
    accessorKey: "hentai",
    meta: {
      type: "text",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="hentai" />
    },
  },
  {
    accessorKey: "linkId",
    meta: {
      type: "object",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="linkId" />
    },
  },
]
