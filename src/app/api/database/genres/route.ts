import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { Types } from "mongoose"

import { clientPromise } from "@/01-shared/libs/mongo"
import { authOptions } from "@/01-shared/libs/next-auth"
import { DbGenre } from "@/02-entities/genre/models/db-genre"

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const page = Number(searchParams.get("page")) || 0
  const limit = Number(searchParams.get("limit")) || 10
  const search = searchParams.get("search") || ""
  const searchQuery = search !== "" ? { $text: { $search: search } } : {}

  const mongoClient = await clientPromise

  const matchingDocumentsCount = await mongoClient.db().collection<DbGenre>("Genres").countDocuments(searchQuery)
  const stats = {
    count: matchingDocumentsCount,
  }

  const data = await mongoClient
    .db()
    .collection<DbGenre>("Genres")
    .find(searchQuery)
    .skip(page * limit)
    .limit(limit)
    .toArray()

  return NextResponse.json({ stats, data })
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body: DbGenre[] = await req.json()

  const operations = body.map((item) => {
    return {
      updateOne: {
        filter: { _id: new Types.ObjectId(item._id) },
        update: {
          $set: {
            hentai: item.hentai,
            linkId: item.linkId,
            name: item.name,
          },
        },
      },
    }
  })

  const mongoClient = await clientPromise
  const data = await mongoClient.db().collection<DbGenre>("Genres").bulkWrite(operations)

  return NextResponse.json(data)
}
