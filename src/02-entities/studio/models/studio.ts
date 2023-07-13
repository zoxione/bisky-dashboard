import { Types } from "mongoose"

export interface IStudio {
  _id: Types.ObjectId
  id: number
  name: string
  img: string | null
}
