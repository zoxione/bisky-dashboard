import { clientPromise } from "@/01-shared/libs/mongo"
import { IStudio } from "../models"

export const getStudios = async () => {
  const mongoClient = await clientPromise
  const data = await mongoClient
    .db()
    .collection<IStudio>("Studios")
    .find({})
    // .skip(3)
    .limit(100)
    .toArray()

  return data
}
