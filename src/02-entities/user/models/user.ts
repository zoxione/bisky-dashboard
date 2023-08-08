import { UserRole } from "./user-role"

export type User = {
  _id: string
  username: string
  password: string
  email: string
  image: string | null
  role: UserRole
  name: string | null
  refreshToken: string | null
}
