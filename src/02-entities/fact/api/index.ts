import { clientPromise } from "@/01-shared/libs/mongo"
import { LIMIT_MONGODB_ITEMS } from "@/01-shared/data"

import { IFact } from "../models"

export const getFacts = async () => {
  const mongoClient = await clientPromise
  const data = await mongoClient
    .db()
    .collection<IFact>("Facts")
    .find({})
    .limit(LIMIT_MONGODB_ITEMS)
    .toArray()

  return data
}
