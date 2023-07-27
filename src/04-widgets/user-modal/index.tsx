"use client"

import { useRouter } from "next/navigation"
import { useCallback } from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/01-shared/ui/dialog"
import { IUser } from "@/02-entities/user"
import { Avatar, AvatarFallback, AvatarImage } from "@/01-shared/ui/avatar"

interface IUserModalProps {
  user: IUser
}

const UserModal = ({ user }: IUserModalProps) => {
  const router = useRouter()

  const onDismiss = useCallback(() => {
    router.back()
  }, [router])

  return (
    <Dialog open>
      <DialogContent
        onCloseButton={onDismiss}
        onEscapeKeyDown={onDismiss}
        // onInteractOutside={onDismiss}
        onPointerDownOutside={onDismiss}
      >
        <DialogHeader>
          <DialogTitle>{user.username}</DialogTitle>
          <DialogDescription>
            <Avatar>
              <AvatarImage src={user.image ?? ""} alt={user.username} />
              <AvatarFallback>
                {user.username.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {user.email}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default UserModal
