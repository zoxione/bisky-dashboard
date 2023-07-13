import { Types } from "mongoose"

export interface IUser {
  _id: Types.ObjectId
  username: string
  password: string
  email: string
  image: string | null
  role: string
  name: string | null
  refreshToken: string | null
}
