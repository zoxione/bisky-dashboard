/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable unused-imports/no-unused-imports */
import { Types } from "mongoose"
import NextAuth from "next-auth/next"

declare module "next-auth" {
  interface Session {
    user: {
      _id: Types.ObjectId | string
      username: string
      email: string
      image: string | null
      role: string
    }
  }

  interface User {
    id?: string
    _id: Types.ObjectId | string
    username: string
    email: string
    image: string | null
    role: string
  }
}
