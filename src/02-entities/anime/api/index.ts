import { clientPromise } from "@/01-shared/libs/mongo"
import { LIMIT_MONGODB_ITEMS } from "@/01-shared/data"

import { IAnimeInfo } from "../models"

export const getAllAnime = async () => {
  const mongoClient = await clientPromise
  const data = await mongoClient
    .db()
    .collection<IAnimeInfo>("AnimeInfo")
    .find({})
    .limit(LIMIT_MONGODB_ITEMS)
    .toArray()

  return data
}
