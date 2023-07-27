import { clientPromise } from "@/01-shared/libs/mongo"
import { LIMIT_MONGODB_ITEMS } from "@/01-shared/data"

import { IStudio } from "../models"

export const getStudios = async () => {
  const mongoClient = await clientPromise
  const data = await mongoClient
    .db()
    .collection<IStudio>("Studios")
    .find({})
    .limit(LIMIT_MONGODB_ITEMS)
    .toArray()

  return data
}
