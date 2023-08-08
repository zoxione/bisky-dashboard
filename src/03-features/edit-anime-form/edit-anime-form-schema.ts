import { z } from "zod"

const franchiseSchema = z.object({
  name: z.string(),
  animes: z.array(
    z.object({
      id: z.number(),
      relation: z.object({
        en: z.string(),
        ru: z.string(),
      }),
    }),
  ),
})

const episodesSchema = z.object({
  count: z.number(),
  aired: z.number(),
  duration: z.number(),
  nextEpisodeAt: z.date().optional(),
})

export const editAnimeFormSchema = z.object({
  _id: z.string(),
  id: z.number(),
  labels: z.array(z.string()),
  poster: z.string(),
  kind: z.union([
    z.literal("tv"),
    z.literal("movie"),
    z.literal("ova"),
    z.literal("ona"),
    z.literal("special"),
    z.literal("music"),
  ]),
  scores: z.number(),
  // anotherScores: z.array(z.number()),
  status: z.union([z.literal("anons"), z.literal("ongoing"), z.literal("released")]),
  // episodes: episodesSchema,
  // dates: z.object({
  //   airedOn: z.string().datetime({ precision: 3 }),
  //   releasedOn: z.string().datetime({ precision: 3 }),
  // }),
  rating: z.union([
    z.literal("none"),
    z.literal("g"),
    z.literal("pg"),
    z.literal("pg_13"),
    z.literal("r"),
    z.literal("r_plus"),
    z.literal("rx"),
  ]),
  description: z.string(),
  // screenshots: z.array(z.string()),
  // videos: z.array(z.string()),
  // genres: z.array(z.number()),
  // studios: z.array(z.number()),
  // franchise: franchiseSchema,
  updateDate: z.string().datetime({ precision: 3 }),
})
