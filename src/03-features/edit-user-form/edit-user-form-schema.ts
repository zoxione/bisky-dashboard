import { z } from "zod"

export const editUserFormSchema = z.object({
  _id: z.string(),
  username: z.string(),
  password: z.string(),
  email: z.string().email(),
  image: z.string(),
  role: z.union([z.literal("admin"), z.literal("moderator"), z.literal("user")]),
  name: z.string(),
  refreshToken: z.string(),
})
