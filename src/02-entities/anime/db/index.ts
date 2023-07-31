import { ColumnSort, SortingState } from "@tanstack/react-table"

import { clientPromise } from "@/01-shared/libs/mongo"

import { IAnimeInfo } from "../models"

export const getAllAnimeInfo = async (
  limit: number | undefined = 100,
  skip: number | undefined = 0,
  sorting: SortingState,
) => {
  "use server"

  const mongoClient = await clientPromise
  let data = []

  if (sorting.length) {
    const sort = sorting[0] as ColumnSort
    const { id, desc } = sort as { id: keyof IAnimeInfo; desc: boolean }

    data = await mongoClient
      .db()
      .collection<IAnimeInfo>("AnimeInfo")
      .find({})
      .sort({ id: desc ? -1 : 1 })
      .skip(skip)
      .limit(limit)
      .toArray()
  } else {
    data = await mongoClient
      .db()
      .collection<IAnimeInfo>("AnimeInfo")
      .find({})
      .skip(skip)
      .limit(limit)
      .toArray()
  }

  return data
}
