import { clientPromise } from "@/01-shared/libs/mongo"
import { IUser } from "@/02-entities/user"
import { NextResponse } from "next/server"

export async function GET() {
  const mongoClient = await clientPromise
  const data = await mongoClient
    .db()
    .collection<IUser>("Users")
    .find({})
    .limit(1000)
    .toArray()

  return NextResponse.json({ data })
}
