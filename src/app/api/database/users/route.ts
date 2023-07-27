import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { clientPromise } from "@/01-shared/libs/mongo"
import { IUser } from "@/02-entities/user"

export async function GET(req: NextRequest) {
  const session = await getServerSession()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const limit = Number(searchParams.get("limit")) ?? 1000
  const skip = Number(searchParams.get("skip")) ?? 0

  const mongoClient = await clientPromise
  const data = await mongoClient
    .db()
    .collection<IUser>("Users")
    .find({})
    .skip(skip)
    .limit(limit)
    .toArray()

  return NextResponse.json(data)
}
