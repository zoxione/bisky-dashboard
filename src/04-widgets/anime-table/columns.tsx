"use client"

import { ColumnDef } from "@tanstack/react-table"
import dayjs from "dayjs"
import {
  ExternalLinkIcon,
  MoreHorizontal,
  PencilIcon,
  Trash2Icon,
} from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/01-shared/ui/alert-dialog"
import { Button } from "@/01-shared/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/01-shared/ui/dropdown-menu"
import { IAnimeInfo } from "@/02-entities/anime"
import EditAnimeForm from "@/03-features/edit-anime-form"
import SortButton from "@/03-features/sort-button/ui"

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
      const animeInfo = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault()
                  }}
                >
                  <PencilIcon className="mr-2 h-4 w-4" />
                  Edit data
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Edit data</AlertDialogTitle>
                  <EditAnimeForm />
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      console.log(animeInfo)
                    }}
                  >
                    Update
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  className="text-red-600"
                  onSelect={(e) => {
                    e.preventDefault()
                  }}
                >
                  <Trash2Icon className="mr-2 h-4 w-4" />
                  Delete from database
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the item from the database and remove its data from our
                    servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      console.log(animeInfo)
                    }}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <ExternalLinkIcon className="mr-2 h-4 w-4" />
              <a
                href={`https://dev.bisky.one/anime/${animeInfo.id}`}
                target="_blank"
              >
                Check on bisky
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
