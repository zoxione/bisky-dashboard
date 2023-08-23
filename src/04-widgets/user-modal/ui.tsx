"use client"

import { useRouter } from "next/navigation"
import { useCallback } from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/01-shared/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/01-shared/ui/avatar"
import { Button } from "@/01-shared/ui/button"
import { Label } from "@/01-shared/ui/label"
import { Input } from "@/01-shared/ui/input"
import { getInitialsFromUsername } from "@/02-entities/user/utils/get-initials-from-username"
import { User } from "@/02-entities/user/models/user"

interface IUserModalProps {
  user: User
}

export const UserModal = ({ user }: IUserModalProps) => {
  const router = useRouter()

  const onOpen = useCallback(() => {
    window.location.reload()
  }, [])

  const onDismiss = useCallback(() => {
    router.back()
  }, [router])

  const initials = getInitialsFromUsername(user.username)

  return (
    <Dialog open>
      <DialogContent onCloseButton={onDismiss} onEscapeKeyDown={onDismiss} onPointerDownOutside={onDismiss}>
        <DialogHeader>
          <DialogTitle>{user.username}</DialogTitle>
          <DialogDescription>
            <Avatar className="w-[120px] h-[120px] mx-auto">
              <AvatarImage src={user.image ?? ""} alt={user.username} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" type="text" value={user.username} disabled readOnly className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" type="email" value={user.email} disabled readOnly className="col-span-3" />
          </div>
          {user.name && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" type="text" value={user.name} disabled readOnly className="col-span-3" />
            </div>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Role
            </Label>
            <Input id="role" type="text" value={user.role} disabled readOnly className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input id="password" type="password" value={user.password} disabled readOnly className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onDismiss} variant="outline">
            Close
          </Button>
          <Button onClick={onOpen} variant="default">
            Open
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
