import { clientPromise } from "@/01-shared/libs/mongo"
import { IUser } from "../models"

export const getUsers = async () => {
  const mongoClient = await clientPromise
  const data = await mongoClient
    .db()
    .collection<IUser>("Users")
    .find({})
    // .skip(3)
    .limit(100)
    .toArray()

  return data
}

export const getCountUsersByMonth = async () => {
  const res = await fetch(`${process.env.APP_URL}/api/charts/new-users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    throw new Error("[getCountUsersByMonth] Failed to fetch data")
  }

  return res.json()
}
