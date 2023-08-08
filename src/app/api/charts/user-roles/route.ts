import { NextResponse } from "next/server"

import { clientPromise } from "@/01-shared/libs/mongo"
import { LIMIT_MONGODB_ITEMS } from "@/01-shared/data"
import { DbUser } from "@/02-entities/user/models/db-user"

export async function GET() {
  // const session = await getServerSession(authOptions)
  // if (!session) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  // }

  const mongoClient = await clientPromise
  const data = await mongoClient.db().collection<DbUser>("Users").find({}).limit(LIMIT_MONGODB_ITEMS).toArray()

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
