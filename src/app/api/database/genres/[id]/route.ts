import { Types } from "mongoose"
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { clientPromise } from "@/01-shared/libs/mongo"
import { authOptions } from "@/01-shared/libs/next-auth"
import { DbGenre } from "@/02-entities/genre/models/db-genre"

export async function GET(req: NextRequest, context: { params: any }) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const id = new Types.ObjectId(context.params.id)

  const mongoClient = await clientPromise
  const data = await mongoClient.db().collection<DbGenre>("Genres").findOne({ _id: id })

  return NextResponse.json(data)
}

export async function PUT(req: NextRequest, context: { params: any }) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const id = new Types.ObjectId(context.params.id)
  const { _id, ...genre } = await req.json()

  const mongoClient = await clientPromise
  const data = await mongoClient
    .db()
    .collection<DbGenre>("Genres")
    .findOneAndUpdate({ _id: new Types.ObjectId(id) }, { $set: genre })

  return NextResponse.json(data)
}

export async function DELETE(req: NextRequest, context: { params: any }) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const id = new Types.ObjectId(context.params.id)

  const mongoClient = await clientPromise
  const data = await mongoClient
    .db()
    .collection<DbGenre>("Genres")
    .deleteOne({ _id: new Types.ObjectId(id) })

  return NextResponse.json(data)
}
