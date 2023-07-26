import { clientPromise } from "@/01-shared/libs/mongo"

import { IUser } from "../models"

export const getUsers = async () => {
  const mongoClient = await clientPromise
  const data = await mongoClient
    .db()
    .collection<IUser>("Users")
    .find({})
    // .skip(3)
    .limit(1000)
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

export const getCountUserRoles = async () => {
  const res = await fetch(`${process.env.APP_URL}/api/charts/user-roles`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    return { data: null, error: true }
  }

  const data = await res.json()

  return { data: data, error: false }
}
