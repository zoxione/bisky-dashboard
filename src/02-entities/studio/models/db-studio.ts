import { Types } from "mongoose"

export type DbStudio = {
  _id: Types.ObjectId
  id: number
  name: string
  img: string | null
}
