import { Types } from "mongoose"

import { clientPromise } from "@/01-shared/libs/mongo"

import { DbUser } from "../models/db-user"
import { User } from "../models/user"

export const getOneUserById = async (id: string) => {
  "use server"

  const mongoClient = await clientPromise
  const data = await mongoClient
    .db()
    .collection<DbUser>("Users")
    .findOne({
      _id: new Types.ObjectId(id),
    })

  return data as unknown as User
}
