"use client"

import { IAnimeInfo } from "@/02-entities/anime"
import SortButton from "@/03-features/sort-button/ui"
import { ColumnDef } from "@tanstack/react-table"
import dayjs from "dayjs"

export const columns: ColumnDef<
  Omit<IAnimeInfo, "_id" | "franchise"> | "label"
>[] = [
  {
    accessorKey: "label",
    header: ({ column }) => {
      return <SortButton column={column} label="Label" />
    },
  },
  {
    accessorKey: "kind",
    header: ({ column }) => {
      return <SortButton column={column} label="Kind" />
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <SortButton column={column} label="Status" />
    },
  },
  {
    accessorKey: "episodes.count",
    header: ({ column }) => {
      return <SortButton column={column} label="Count episodes" />
    },
  },
  {
    accessorKey: "anotherScores",
    header: ({ column }) => {
      return <SortButton column={column} label="Score" />
    },
    cell: ({ row }) => {
      const scores: number[] = row.getValue("anotherScores")
      return scores[0]
    },
  },
  {
    accessorKey: "dates",
    header: ({ column }) => {
      return <SortButton column={column} label="Aired on" />
    },
    cell: ({ row }) => {
      const dates: { airedOn: Date; releasedOn: Date } = row.getValue("dates")
      return dayjs(dates?.airedOn).format("DD/MM/YYYY")
    },
  },
]
