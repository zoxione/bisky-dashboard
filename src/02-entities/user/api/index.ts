import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { User } from "../models/user"

interface IGetAllUsersResponse {
  stats: {
    count: number
  }
  data: User[]
}

export const usersAPI = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.APP_URL}/api/database/`,
  }),
  tagTypes: ["Users"],
  endpoints: (build) => ({
    getAllUsers: build.query<IGetAllUsersResponse, { page: number; limit: number; search: string }>({
      query: (args) => {
        const { page = 0, limit = 10, search = "" } = args
        return {
          url: "/users",
          method: "GET",
          params: {
            page,
            limit,
            search,
          },
        }
      },
      providesTags: ["Users"],
    }),
    getOneUser: build.query<User, string>({
      query: (id) => {
        return {
          url: `/users/${id}`,
          method: "GET",
        }
      },
      providesTags: ["Users"],
    }),
    updateOneUser: build.mutation<User, User>({
      query: (user) => ({
        url: `/users/${user._id}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: (result) => (result ? ["Users"] : []),
    }),
    updateManyUsers: build.mutation<User[], User[]>({
      query: (users) => ({
        url: `/users`,
        method: "PUT",
        body: users,
      }),
      invalidatesTags: (result) => (result ? ["Users"] : []),
    }),
    deleteOneUser: build.mutation<User, User>({
      query: (user) => ({
        url: `/users/${user._id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => (result ? ["Users"] : []),
    }),
  }),
})

export const {
  usePrefetch,
  useGetAllUsersQuery,
  useGetOneUserQuery,
  useUpdateOneUserMutation,
  useDeleteOneUserMutation,
  useUpdateManyUsersMutation,
} = usersAPI
