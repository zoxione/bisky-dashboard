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
        onInteractOutside={onDismiss}
        onPointerDownOutside={onDismiss}
      >
        <DialogHeader>
          <DialogTitle>{user.username}</DialogTitle>
          <DialogDescription>{user.email}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default UserModal
