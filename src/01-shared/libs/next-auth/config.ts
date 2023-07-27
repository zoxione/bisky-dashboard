import Credentials from "next-auth/providers/credentials"
import { NextAuthOptions } from "next-auth"
import bcrypt from "bcryptjs"

import { IUser } from "@/02-entities/user"

import { clientPromise } from "../mongo"

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
      return { ...token, ...user }
    },
    async session({ session, token }) {
      const { _id, username, email, role, image } = token as any
      session.user = {
        _id,
        username,
        email,
        role,
        image,
      }
      return session
    },
  },
  pages: {
    signIn: "/auth",
  },
}
