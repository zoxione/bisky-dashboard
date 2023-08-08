import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { Types } from "mongoose"

import { clientPromise } from "@/01-shared/libs/mongo"
import { authOptions } from "@/01-shared/libs/next-auth"
import { DbAnimeInfo } from "@/02-entities/anime/models/db-anime-info"

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

  const matchingDocumentsCount = await mongoClient.db().collection<DbAnimeInfo>("AnimeInfo").countDocuments(searchQuery)
  const stats = {
    count: matchingDocumentsCount,
  }

  const data = await mongoClient
    .db()
    .collection<DbAnimeInfo>("AnimeInfo")
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

  const body: DbAnimeInfo[] = await req.json()

  const operations = body.map((item) => {
    return {
      updateOne: {
        filter: { _id: new Types.ObjectId(item._id) },
        update: {
          $set: {
            id: item.id,
            labels: item.labels,
            poster: item.poster,
            kind: item.kind,
            scores: item.scores,
            anotherScores: item.anotherScores,
            status: item.status,
            episodes: item.episodes,
            dates: item.dates,
            rating: item.rating,
            description: item.description,
            screenshots: item.screenshots,
            videos: item.videos,
            genres: item.genres,
            studios: item.studios,
            franchise: item.franchise,
            updateDate: item.updateDate,
          },
        },
      },
    }
  })

  const mongoClient = await clientPromise
  const data = await mongoClient.db().collection<DbAnimeInfo>("AnimeInfo").bulkWrite(operations)

  return NextResponse.json(data)
}
