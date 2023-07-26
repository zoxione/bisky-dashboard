import { clientPromise } from "@/01-shared/libs/mongo"

import { IGenre } from "../models"

export const getGenres = async () => {
  const mongoClient = await clientPromise
  const data = await mongoClient
    .db()
    .collection<IGenre>("Genres")
    .find({})
    // .skip(3)
    .limit(1000)
    .toArray()

  return data
}
