import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/01-shared/libs/next-auth"

import calculateUsersByMonth from "./calculate-users-by-month"

const users = [
  {
    _id: "sada",
    username: "dasd",
    password: "dsada",
    email: "",
    image: "",
    role: "",
    name: "",
    refreshToken: "",
    created_at: new Date(2011, 0, 1, 0, 0, 0, 0),
    updated_at: new Date(2011, 0, 1, 0, 0, 0, 0),
  },
  {
    _id: "sada",
    username: "dasd",
    password: "dsada",
    email: "",
    image: "",
    role: "",
    name: "",
    refreshToken: "",
    created_at: new Date(2023, 11, 1, 0, 0, 0, 0),
    updated_at: new Date(2023, 0, 1, 0, 0, 0, 0),
  },
  {
    _id: "sada",
    username: "dasd",
    password: "dsada",
    email: "",
    image: "",
    role: "",
    name: "",
    refreshToken: "",
    created_at: new Date(2023, 0, 1, 0, 0, 0, 0),
    updated_at: new Date(2023, 0, 1, 0, 0, 0, 0),
  },
  {
    _id: "sada",
    username: "dasd",
    password: "dsada",
    email: "",
    image: "",
    role: "",
    name: "",
    refreshToken: "",
    created_at: new Date(2023, 0, 1, 0, 0, 0, 0),
    updated_at: new Date(2023, 0, 1, 0, 0, 0, 0),
  },
  {
    _id: "sada",
    username: "dasd",
    password: "dsada",
    email: "",
    image: "",
    role: "",
    name: "",
    refreshToken: "",
    created_at: new Date(2023, 0, 1, 0, 0, 0, 0),
    updated_at: new Date(2023, 0, 1, 0, 0, 0, 0),
  },
]

export async function GET() {
  // const session = await getServerSession(authOptions)
  // if (!session) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  // }

  // const mongoClient = await clientPromise
  // const data = await mongoClient
  //   .db()
  //   .collection<IUser>("Users")
  //   .find({})
  //   .limit(1000)
  //   .toArray()

  const res = calculateUsersByMonth(users)

  return NextResponse.json(res)
}
