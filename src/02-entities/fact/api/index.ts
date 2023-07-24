import { clientPromise } from "@/01-shared/libs/mongo"
import { IFact } from "../models"

export const getFacts = async () => {
  const mongoClient = await clientPromise
  const data = await mongoClient
    .db()
    .collection<IFact>("Facts")
    .find({})
    // .skip(3)
    .limit(1000)
    .toArray()

  return data
}
