"use client"

import { IAnimeInfo } from "@/02-entities/anime"
import { IStudio } from "@/02-entities/studio"
import SortButton from "@/03-features/sort-button/ui"
import { ColumnDef } from "@tanstack/react-table"
import dayjs from "dayjs"

export const columns: ColumnDef<Omit<IStudio, "_id">>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return <SortButton column={column} label="Id" />
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <SortButton column={column} label="Name" />
    },
  },
  {
    accessorKey: "img",
    header: ({ column }) => {
      return <SortButton column={column} label="Img" />
    },
  },
]
