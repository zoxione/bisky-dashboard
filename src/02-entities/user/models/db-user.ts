import { Types } from "mongoose"

import { UserRole } from "./user-role"

export type DbUser = {
  _id: Types.ObjectId
  username: string
  password: string
  email: string
  image: string | null
  role: UserRole
  name: string | null
  refreshToken: string | null
}
