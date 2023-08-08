/* eslint-disable unused-imports/no-unused-vars */
import { Types } from "mongoose"

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
