import { Types } from "mongoose"
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { clientPromise } from "@/01-shared/libs/mongo"
import { authOptions } from "@/01-shared/libs/next-auth"
import { DbStudio } from "@/02-entities/studio/models/db-studio"

export async function GET(req: NextRequest, context: { params: any }) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const id = new Types.ObjectId(context.params.id)

  const mongoClient = await clientPromise
  const data = await mongoClient.db().collection<DbStudio>("Studios").findOne({ _id: id })

  return NextResponse.json(data)
}

export async function PUT(req: NextRequest, context: { params: any }) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const id = new Types.ObjectId(context.params.id)
  const { _id, ...studio } = await req.json()

  const mongoClient = await clientPromise
  const data = await mongoClient
    .db()
    .collection<DbStudio>("Studios")
    .findOneAndUpdate({ _id: new Types.ObjectId(id) }, { $set: studio })

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
    .collection<DbStudio>("Studios")
    .deleteOne({ _id: new Types.ObjectId(id) })

  return NextResponse.json(data)
}
