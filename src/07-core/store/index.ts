import { configureStore } from "@reduxjs/toolkit"

import { usersAPI } from "@/02-entities/user/api"
import { studiosAPI } from "@/02-entities/studio/api"
import { genresAPI } from "@/02-entities/genre/api"
import { factsAPI } from "@/02-entities/fact/api"
import { animeAPI } from "@/02-entities/anime/api"

export const store = configureStore({
  reducer: {
    [animeAPI.reducerPath]: animeAPI.reducer,
    [usersAPI.reducerPath]: usersAPI.reducer,
    [studiosAPI.reducerPath]: studiosAPI.reducer,
    [genresAPI.reducerPath]: genresAPI.reducer,
    [factsAPI.reducerPath]: factsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      animeAPI.middleware,
      usersAPI.middleware,
      studiosAPI.middleware,
      genresAPI.middleware,
      factsAPI.middleware,
    ),
})
