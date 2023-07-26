import { NextResponse } from "next/server"

import { clientPromise } from "@/01-shared/libs/mongo"
import { IUser } from "@/02-entities/user"

export async function GET() {
  const mongoClient = await clientPromise
  const data = await mongoClient
    .db()
    .collection<IUser>("Users")
    .find({})
    .limit(1000)
    .toArray()

  const res = [
    {
      name: "admin",
      value: 0,
    },
    {
      name: "moderator",
      value: 0,
    },
    {
      name: "user",
      value: 0,
    },
  ]

  data.forEach((item) => {
    switch (item.role) {
      case "admin":
        res[0].value++
        break
      case "moderator":
        res[1].value++
        break
      case "user":
        res[2].value++
        break
      default:
        break
    }
  })

  return NextResponse.json(res)
}
