import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

import { clientPromise } from "@/01-shared/libs/mongo"
import { IAnimeInfo } from "@/02-entities/anime"

export async function GET(req: NextRequest) {
  const session = await getServerSession()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const page = Number(searchParams.get("page")) || 0
  const limit = Number(searchParams.get("limit")) || 10
  const search = searchParams.get("search") || ""

  const mongoClient = await clientPromise

  const stats = await mongoClient.db().command({ collStats: "AnimeInfo" })

  const data = await mongoClient
    .db()
    .collection<IAnimeInfo>("AnimeInfo")
    .find(
      search !== ""
        ? {
            $text: { $search: search },
          }
        : {},
    )
    .skip(page * limit)
    .limit(limit)
    .toArray()

  return NextResponse.json({ stats, data })
}
