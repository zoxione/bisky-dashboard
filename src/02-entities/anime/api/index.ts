import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Document } from "bson"

import { IAnimeInfo } from "../models"

interface IGetAllAnimeInfoResponse {
  stats: Document
  data: IAnimeInfo[]
}

export const animeAPI = createApi({
  reducerPath: "anime",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.APP_URL}/api/database/`,
  }),
  endpoints: (build) => ({
    getAllAnimeInfo: build.query<
      IGetAllAnimeInfoResponse,
      { page: number; limit: number; search: string }
    >({
      query: (args) => {
        const { page = 0, limit = 10, search = "" } = args
        return {
          url: "/anime-info",
          method: "GET",
          params: {
            page,
            limit,
            search,
          },
        }
      },
    }),
    addAnimeInfo: build.mutation<IAnimeInfo, IAnimeInfo>({
      query: (animeInfo) => ({
        url: "/anime-info",
        method: "POST",
        body: animeInfo,
      }),
    }),
  }),
})

export const { useGetAllAnimeInfoQuery, useAddAnimeInfoMutation } = animeAPI
