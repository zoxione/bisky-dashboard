"use client"

import { ColumnDef } from "@tanstack/react-table"

import { AnimeInfo } from "@/02-entities/anime/models/anime-info"
import { SortButton } from "@/03-features/sort-button"

export const columns: ColumnDef<AnimeInfo>[] = [
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
    accessorKey: "id",
    meta: {
      type: "text",
      disabled: true,
    },
    header: ({ column }) => {
      return <SortButton column={column} label="id" />
    },
  },
  {
    accessorKey: "labels",
    meta: {
      type: "object",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="labels" />
    },
  },
  {
    accessorKey: "poster",
    meta: {
      type: "text",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="poster" />
    },
  },
  {
    accessorKey: "kind",
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
  },
  {
    accessorKey: "scores",
    meta: {
      type: "text",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="scores" />
    },
  },
  {
    accessorKey: "anotherScores",
    meta: {
      type: "text",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="anotherScores" />
    },
  },
  {
    accessorKey: "status",
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
  },
  {
    accessorKey: "episodes",
    meta: {
      type: "object",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="episodes" />
    },
  },
  {
    accessorKey: "dates",
    meta: {
      type: "object",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="dates" />
    },
  },
  {
    accessorKey: "rating",
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
  },
  {
    accessorKey: "description",
    meta: {
      type: "textarea",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="description" />
    },
    minSize: 360,
  },
  {
    accessorKey: "screenshots",
    meta: {
      type: "object",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="screenshots" />
    },
  },
  {
    accessorKey: "videos",
    meta: {
      type: "object",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="videos" />
    },
  },
  {
    accessorKey: "genres",
    meta: {
      type: "text",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="genres" />
    },
  },
  {
    accessorKey: "studios",
    meta: {
      type: "text",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="studios" />
    },
  },
  {
    accessorKey: "franchise",
    meta: {
      type: "object",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="franchise" />
    },
  },
  {
    accessorKey: "updateDate",
    meta: {
      type: "text",
    },
    header: ({ column }) => {
      return <SortButton column={column} label="updateDate" />
    },
  },
]
