import { clientPromise } from "@/01-shared/libs/mongo"
import { LIMIT_MONGODB_ITEMS } from "@/01-shared/data"

import { IGenre } from "../models"

export const getGenres = async () => {
  const mongoClient = await clientPromise
  const data = await mongoClient
    .db()
    .collection<IGenre>("Genres")
    .find({})
    .limit(LIMIT_MONGODB_ITEMS)
    .toArray()

  return data
}
