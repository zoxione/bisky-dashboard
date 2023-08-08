import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { Fact } from "../models/fact"

interface IGetAllFactsResponse {
  stats: {
    count: number
  }
  data: Fact[]
}

export const factsAPI = createApi({
  reducerPath: "facts",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.APP_URL}/api/database/`,
  }),
  tagTypes: ["Facts"],
  endpoints: (build) => ({
    getAllFacts: build.query<IGetAllFactsResponse, { page: number; limit: number; search: string }>({
      query: (args) => {
        const { page = 0, limit = 10, search = "" } = args
        return {
          url: "/facts",
          method: "GET",
          params: {
            page,
            limit,
            search,
          },
        }
      },
    }),
    updateOneFact: build.mutation<Fact, Fact>({
      query: (fact) => ({
        url: `/facts/${fact._id}`,
        method: "PUT",
        body: fact,
      }),
      invalidatesTags: (result) => (result ? ["Facts"] : []),
    }),
    updateManyFacts: build.mutation<Fact[], Fact[]>({
      query: (facts) => ({
        url: `/facts`,
        method: "PUT",
        body: facts,
      }),
      invalidatesTags: (result) => (result ? ["Facts"] : []),
    }),
    deleteOneFact: build.mutation<Fact, Fact>({
      query: (fact) => ({
        url: `/facts/${fact._id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => (result ? ["Facts"] : []),
    }),
  }),
})

export const { useGetAllFactsQuery, useUpdateOneFactMutation, useUpdateManyFactsMutation, useDeleteOneFactMutation } =
  factsAPI
