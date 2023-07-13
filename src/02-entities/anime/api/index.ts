import { clientPromise } from "@/01-shared/libs/mongo"
import { IAnimeInfo } from "../models"

export const getAllAnime = async () => {
  const mongoClient = await clientPromise
  const data = await mongoClient
    .db()
    .collection<IAnimeInfo>("AnimeInfo")
    .find({})
    // .skip(3)
    .limit(100)
    .toArray()

  return data
}
