"use client"

import { ColumnDef } from "@tanstack/react-table"
import dayjs from "dayjs"

import { IAnimeInfo } from "@/02-entities/anime"
import { IGenre } from "@/02-entities/genre"
import SortButton from "@/03-features/sort-button/ui"

export const columns: ColumnDef<Omit<IGenre, "_id">>[] = [
  {
    accessorKey: "name.en",
    header: ({ column }) => {
      return <SortButton column={column} label="Name EN" />
    },
  },
  {
    accessorKey: "name.ru",
    header: ({ column }) => {
      return <SortButton column={column} label="Name RU" />
    },
  },
  {
    accessorKey: "hentai",
    header: ({ column }) => {
      return <SortButton column={column} label="Hentai" />
    },
  },
]
