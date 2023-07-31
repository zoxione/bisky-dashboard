import { configureStore } from "@reduxjs/toolkit"

import { animeAPI } from "@/02-entities/anime/api"

export const store = configureStore({
  reducer: {
    [animeAPI.reducerPath]: animeAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(animeAPI.middleware),
})
