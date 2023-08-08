import { Types } from "mongoose"

export type DbFact = {
  _id: Types.ObjectId
  fact: string
}
