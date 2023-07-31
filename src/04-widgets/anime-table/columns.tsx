"use client"

import { ColumnDef } from "@tanstack/react-table"
import dayjs from "dayjs"
import { MoreHorizontal } from "lucide-react"

import { IAnimeInfo } from "@/02-entities/anime"
import SortButton from "@/03-features/sort-button/ui"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/01-shared/ui/dropdown-menu"
import { Button } from "@/01-shared/ui/button"
import { useAddAnimeInfoMutation } from "@/02-entities/anime/api"

export const columns: ColumnDef<IAnimeInfo>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return <SortButton column={column} label="Id" />
    },
  },
  {
    accessorKey: "labels",
    header: ({ column }) => {
      return <SortButton column={column} label="Labels" />
    },
    cell: ({ row }) => {
      const labels: string[] = row.getValue("labels")
      return labels.join(" / ")
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
  {
    id: "actions",
    cell: ({ row }) => {
      const anime = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={async () => {
                const [addNewAnimeInfo, {}] = useAddAnimeInfoMutation()

                // await addNewAnimeInfo({
                //   _id: new ObjectId("da"),
                //   id: 0,
                //   labels: [],
                //   poster: null,
                //   kind: "tv",
                //   scores: 0,
                //   anotherScores: [],
                //   status: "anons",
                //   episodes: {
                //     count: null,
                //     aired: null,
                //     duration: 0,
                //     nextEpisodeAt: null
                //   },
                //   dates: {
                //     airedOn: null,
                //     releasedOn: null
                //   },
                //   rating: "g",
                //   description: null,
                //   screenshots: [],
                //   videos: [],
                //   genres: [],
                //   studios: [],
                //   franchise: {
                //     name: null,
                //     animes: []
                //   },
                //   updateDate: new Date()
                // })
              }}
            >
              Add new item
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}}>Edit data</DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => {
                console.log(anime)
              }}
            >
              Delete from database
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Check on bisky</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
