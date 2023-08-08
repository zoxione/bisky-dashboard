import { Avatar, AvatarFallback, AvatarImage } from "@/01-shared/ui/avatar"
import { Input } from "@/01-shared/ui/input"
import { Label } from "@/01-shared/ui/label"
import { getOneUserById } from "@/02-entities/user/db/get-user-by-id"
import { getInitialsFromUsername } from "@/02-entities/user/utils/get-initials-from-username"

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const user = await getOneUserById(id)

  return (
    <div className="grid grid-cols-4">
      <Avatar className="h-64 w-64">
        <AvatarImage src={user.image ?? ""} />
        <AvatarFallback>{getInitialsFromUsername(user.username)}</AvatarFallback>
      </Avatar>
      <div className="col-span-3 grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="_id" className="text-right">
            _Id
          </Label>
          <Input id="_id" type="text" value={user._id} disabled readOnly className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Username
          </Label>
          <Input id="username" type="text" value={user.username} disabled readOnly className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="password" className="text-right">
            Password
          </Label>
          <Input id="password" type="password" value={user.password} disabled readOnly className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <Input id="email" type="email" value={user.email} disabled readOnly className="col-span-3" />
        </div>
        {user.image && (
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Image source
            </Label>
            <Input id="image" type="text" value={user.image} disabled readOnly className="col-span-3" />
          </div>
        )}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="role" className="text-right">
            Role
          </Label>
          <Input id="role" type="text" value={user.role} disabled readOnly className="col-span-3" />
        </div>
        {user.name && (
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" type="text" value={user.name} disabled readOnly className="col-span-3" />
          </div>
        )}
        {user.refreshToken && (
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="refreshToken" className="text-right">
              Refresh token
            </Label>
            <Input id="refreshToken" type="text" value={user.refreshToken} disabled readOnly className="col-span-3" />
          </div>
        )}
      </div>
    </div>
  )
}
