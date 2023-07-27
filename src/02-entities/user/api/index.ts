import { Types } from "mongoose"

import { clientPromise } from "@/01-shared/libs/mongo"

import { IUser } from "../models"

export const getUsers = async () => {
  const mongoClient = await clientPromise
  const data = await mongoClient
    .db()
    .collection<IUser>("Users")
    .find({})
    .limit(1000)
    .toArray()

  return data
}

export const getOneUserById = async (id: string) => {
  const mongoClient = await clientPromise
  const data = await mongoClient
    .db()
    .collection<IUser>("Users")
    .findOne({
      _id: new Types.ObjectId(id),
    })

  return data as IUser
}

export const updateUser = async (user: IUser) => {
  const res = await fetch(
    `${process.env.APP_URL}/api/database/users/${user._id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    },
  )

  if (!res.ok) {
    return { data: null, error: true }
  }

  const data = await res.json()

  return { data: data, error: false }
}

export const getCountUsersByMonth = async () => {
  const res = await fetch(`${process.env.APP_URL}/api/charts/new-users`, {
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
