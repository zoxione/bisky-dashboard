"use client"

import { useGetOneUserQuery } from "@/02-entities/user/api"
import { UserModal } from "@/04-widgets/user-modal"

export default function Page({ params: { id } }: { params: { id: string } }) {
  const { data } = useGetOneUserQuery(id)
  if (!data) {
    return null
  }

  return <UserModal user={data} />
}
