import { Types } from "mongoose"

export type DbAnimeInfo = {
  _id: Types.ObjectId | string
  id: number
  labels: string[]
  poster: string | null
  kind: "tv" | "movie" | "ova" | "ona" | "special" | "music"
  scores: number
  anotherScores: number[]
  status: "anons" | "ongoing" | "released"
  episodes: {
    count: number | null
    aired: number | null
    duration: number
    nextEpisodeAt: Date | null
  }
  dates: {
    airedOn: Date | null
    releasedOn: Date | null
  }
  rating: "none" | "g" | "pg" | "pg_13" | "r" | "r_plus" | "rx"
  description: string | null
  screenshots: string[]
  videos: string[]
  genres: number[]
  studios: number[]
  franchise: {
    name: string | null
    animes: {
      id: number
      relation: {
        en: string
        ru: string
      }
    }[]
  }
  updateDate: Date
}
