import { Types } from "mongoose"

export interface IGenre {
  _id: Types.ObjectId
  linkId: {
    anime: number | null
    manga: number
  }
  name: {
    en: string
    ru: string
  }
  hentai: boolean
}
