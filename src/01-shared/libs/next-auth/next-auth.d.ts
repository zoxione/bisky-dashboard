import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    refreshToken?: string
    accessToken?: string
    accessTokenExpires?: number
    error?: string
    user: User
    expires?: string
  }

  interface User {
    id?: string
    _id?: ObjectId
    username?: string
    email?: string
    image?: string | null
    role?: string
    name?: string | null
    accessToken?: string
    refreshToken?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id: string
    user?: User
    role?: string
    username?: string
    refreshToken?: string
    refreshTokenExpires?: number
    accessToken?: string
    accessTokenExpires?: number
  }
}
