"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/01-shared/ui/avatar"
import { useGetOneUserQuery } from "@/02-entities/user/api"
import { getInitialsFromUsername } from "@/02-entities/user/utils/get-initials-from-username"
import { EditUserForm } from "@/03-features/edit-user-form"

export default function Page({ params: { id } }: { params: { id: string } }) {
  const { data: user } = useGetOneUserQuery(id)
  if (!user) {
    return null
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 justify-items-center gap-y-8">
      <Avatar className="h-52 w-52">
        <AvatarImage src={user.image ?? ""} />
        <AvatarFallback>{getInitialsFromUsername(user.username)}</AvatarFallback>
      </Avatar>
      <EditUserForm defaultData={user} />
    </div>
  )
}
