import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { AnimeInfo } from "../models/anime-info"

interface IGetAllAnimeInfoResponse {
  stats: {
    count: number
  }
  data: AnimeInfo[]
}

export const animeAPI = createApi({
  reducerPath: "anime",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.APP_URL}/api/database/`,
  }),
  tagTypes: ["AnimeInfo"],
  endpoints: (build) => ({
    getAllAnimeInfo: build.query<IGetAllAnimeInfoResponse, { page: number; limit: number; search: string }>({
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
      providesTags: ["AnimeInfo"],
    }),
    updateOneAnimeInfo: build.mutation<AnimeInfo, AnimeInfo>({
      query: (animeInfo) => ({
        url: `/anime-info/${animeInfo._id}`,
        method: "PUT",
        body: animeInfo,
      }),
      invalidatesTags: (result) => (result ? ["AnimeInfo"] : []),
    }),
    updateManyAnimeInfo: build.mutation<AnimeInfo[], AnimeInfo[]>({
      query: (animeInfos) => ({
        url: `/anime-info`,
        method: "PUT",
        body: animeInfos,
      }),
      invalidatesTags: (result) => (result ? ["AnimeInfo"] : []),
    }),
    deleteOneAnimeInfo: build.mutation<AnimeInfo, AnimeInfo>({
      query: (animeInfo) => ({
        url: `/anime-info/${animeInfo._id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => (result ? ["AnimeInfo"] : []),
    }),
  }),
})

export const {
  usePrefetch,
  useGetAllAnimeInfoQuery,
  useUpdateOneAnimeInfoMutation,
  useUpdateManyAnimeInfoMutation,
  useDeleteOneAnimeInfoMutation,
} = animeAPI
