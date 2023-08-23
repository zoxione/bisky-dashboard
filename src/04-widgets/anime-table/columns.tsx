"use client"

import { ColumnDef, createColumnHelper } from "@tanstack/react-table"

import { AnimeInfo } from "@/02-entities/anime/models/anime-info"
import { SortButton } from "@/03-features/sort-button"
import { useDeleteOneAnimeInfoMutation } from "@/02-entities/anime/api"
import { ActionsColumnTable } from "@/03-features/actions-column-table"

const columnHelper = createColumnHelper<AnimeInfo>()

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
      type: "text",
      disabled: true,
    },
    header: ({ column }) => {
      return <SortButton column={column} label="id" />
    },
  }),
  columnHelper.accessor("labels", {
    meta: {
      type: "object",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="labels" />
    },
  }),
  columnHelper.accessor("poster", {
    meta: {
      type: "text",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="poster" />
    },
  }),
  columnHelper.accessor("kind", {
    meta: {
      type: "select",
      options: [
        { value: "tv", label: "tv" },
        { value: "movie", label: "movie" },
        { value: "ova", label: "ova" },
        { value: "ona", label: "ona" },
        { value: "special", label: "special" },
        { value: "music", label: "music" },
      ],
    },
    header: ({ column }) => {
      return <SortButton column={column} label="kind" />
    },
  }),
  columnHelper.accessor("scores", {
    meta: {
      type: "text",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="scores" />
    },
  }),
  columnHelper.accessor("anotherScores", {
    meta: {
      type: "text",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="anotherScores" />
    },
  }),
  columnHelper.accessor("status", {
    meta: {
      type: "select",
      options: [
        { value: "anons", label: "anons" },
        { value: "ongoing", label: "ongoing" },
        { value: "released", label: "released" },
      ],
    },
    header: ({ column }) => {
      return <SortButton column={column} label="Status" />
    },
  }),
  columnHelper.accessor("episodes", {
    meta: {
      type: "object",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="episodes" />
    },
  }),
  columnHelper.accessor("dates", {
    meta: {
      type: "object",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="dates" />
    },
  }),
  columnHelper.accessor("rating", {
    meta: {
      type: "select",
      options: [
        { value: "none", label: "none" },
        { value: "g", label: "g" },
        { value: "pg", label: "pg" },
        { value: "pg_13", label: "pg_13" },
        { value: "r", label: "r" },
        { value: "r_plus", label: "r_plus" },
        { value: "rx", label: "rx" },
      ],
    },
    header: ({ column }) => {
      return <SortButton column={column} label="rating" />
    },
  }),
  columnHelper.accessor("description", {
    meta: {
      type: "textarea",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="description" />
    },
    minSize: 360,
  }),
  columnHelper.accessor("screenshots", {
    meta: {
      type: "object",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="screenshots" />
    },
  }),
  columnHelper.accessor("videos", {
    meta: {
      type: "object",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="videos" />
    },
  }),
  columnHelper.accessor("genres", {
    meta: {
      type: "text",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="genres" />
    },
  }),
  columnHelper.accessor("studios", {
    meta: {
      type: "text",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="studios" />
    },
  }),
  columnHelper.accessor("franchise", {
    meta: {
      type: "object",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="franchise" />
    },
  }),
  columnHelper.accessor("updateDate", {
    meta: {
      type: "date",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="updateDate" />
    },
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => {
      const rowData = row.original as any
      return (
        <ActionsColumnTable
          data={rowData}
          useDeleteMutation={useDeleteOneAnimeInfoMutation}
          link={`https://dev.bisky.one/anime/${rowData.id}`}
        />
      )
    },
    header: ({ header }) => {
      return <div role="option" aria-selected />
    },
    maxSize: 30,
  }),
] as ColumnDef<AnimeInfo, unknown>[]
