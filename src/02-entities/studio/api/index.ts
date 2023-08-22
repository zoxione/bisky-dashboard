import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { Studio } from "../models/studio"

interface IGetAllStudiosResponse {
  stats: {
    count: number
  }
  data: Studio[]
}

export const studiosAPI = createApi({
  reducerPath: "studios",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.APP_URL}/api/database/`,
  }),
  tagTypes: ["Studios"],
  endpoints: (build) => ({
    getAllStudios: build.query<IGetAllStudiosResponse, { page: number; limit: number; search: string }>({
      query: (args) => {
        const { page = 0, limit = 10, search = "" } = args
        return {
          url: "/studios",
          method: "GET",
          params: {
            page,
            limit,
            search,
          },
        }
      },
      providesTags: ["Studios"],
    }),
    updateOneStudio: build.mutation<Studio, Studio>({
      query: (studio) => ({
        url: `/studios/${studio._id}`,
        method: "PUT",
        body: studio,
      }),
      invalidatesTags: (result) => (result ? ["Studios"] : []),
    }),
    updateManyStudios: build.mutation<Studio[], Studio[]>({
      query: (studios) => ({
        url: `/studios`,
        method: "PUT",
        body: studios,
      }),
      invalidatesTags: (result) => (result ? ["Studios"] : []),
    }),
    deleteOneStudio: build.mutation<Studio, Studio>({
      query: (studio) => ({
        url: `/studios/${studio._id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => (result ? ["Studios"] : []),
    }),
  }),
})

export const {
  usePrefetch,
  useGetAllStudiosQuery,
  useUpdateOneStudioMutation,
  useUpdateManyStudiosMutation,
  useDeleteOneStudioMutation,
} = studiosAPI
