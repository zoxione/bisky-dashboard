import { Types } from "mongoose"

export type DbGenre = {
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
