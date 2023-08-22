import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { Genre } from "../models/genre"

interface IGetAllGenresResponse {
  stats: {
    count: number
  }
  data: Genre[]
}

export const genresAPI = createApi({
  reducerPath: "genres",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.APP_URL}/api/database/`,
  }),
  tagTypes: ["Genres"],
  endpoints: (build) => ({
    getAllGenres: build.query<IGetAllGenresResponse, { page: number; limit: number; search: string }>({
      query: (args) => {
        const { page = 0, limit = 10, search = "" } = args
        return {
          url: "/genres",
          method: "GET",
          params: {
            page,
            limit,
            search,
          },
        }
      },
      providesTags: ["Genres"],
    }),
    updateOneGenre: build.mutation<Genre, Genre>({
      query: (genre) => ({
        url: `/genres/${genre._id}`,
        method: "PUT",
        body: genre,
      }),
      invalidatesTags: (result) => (result ? ["Genres"] : []),
    }),
    updateManyGenres: build.mutation<Genre[], Genre[]>({
      query: (genres) => ({
        url: `/genres`,
        method: "PUT",
        body: genres,
      }),
      invalidatesTags: (result) => (result ? ["Genres"] : []),
    }),
    deleteOneGenre: build.mutation<Genre, Genre>({
      query: (genre) => ({
        url: `/genres/${genre._id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => (result ? ["Genres"] : []),
    }),
  }),
})

export const {
  usePrefetch,
  useGetAllGenresQuery,
  useUpdateOneGenreMutation,
  useUpdateManyGenresMutation,
  useDeleteOneGenreMutation,
} = genresAPI
