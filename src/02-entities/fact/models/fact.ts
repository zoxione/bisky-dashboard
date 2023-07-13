import { Types } from "mongoose"

export interface IFact {
  _id: Types.ObjectId
  fact: string
}
