import Credentials from "next-auth/providers/credentials"

import { NextAuthOptions } from "next-auth"
import { clientPromise } from "../mongo"
import { IUser } from "@/02-entities/user"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUH_SECRET,
  providers: [
    Credentials({
      credentials: {
        username: {
          label: "Username",
          type: "username",
          required: true,
        },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        const username: string = credentials.username
        const password: string = credentials.password

        const mongoClient = await clientPromise
        const user = await mongoClient
          .db()
          .collection<IUser>("Users")
          .findOne({ username: username })

        if (user && bcrypt.compareSync(password, user.password)) {
          if (user.role === "admin") {
            return {
              _id: user._id,
              username: user.username,
              email: user.email,
              role: user.role,
              image: user.image,
            }
          } else {
            return null
          }
        } else {
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) {
        token._id = user._id
      }
      if (user?.username) {
        token.username = user.username
      }
      if (user?.role) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token?._id) {
        session.user._id = token._id
      }
      if (token?.username) {
        session.user.username = token.username
      }
      if (token?.role) {
        session.user.role = token.role
      }
      return session
    },
  },
  pages: {
    signIn: "/auth",
  },
}
