"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import Image from "next/image"

import { cn } from "@/01-shared/libs/shadcn"
import { Button } from "@/01-shared/ui/button"
import { Separator } from "@/01-shared/ui/separator"
import { generalList, tablesList } from "@/01-shared/data"
import { Avatar, AvatarFallback, AvatarImage } from "@/01-shared/ui/avatar"
import { Badge } from "@/01-shared/ui/badge"
import { getInitialsFromUsername } from "@/02-entities/user/utils/get-initials-from-username"

interface ISidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Sidebar = ({ className }: ISidebarProps) => {
  const pathname = usePathname()

  const { data: session, status, update } = useSession()

  const initials = getInitialsFromUsername(session?.user?.username ?? "")

  return (
    <aside
      className={cn(
        "hidden lg:flex sticky top-[69px] h-[calc(100vh-69px)] box-border overflow-y-auto flex-row justify-between",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-4 px-3 py-6">
        <div className="flex flex-col items-center justify-center gap-2">
          <Avatar className="w-[120px] h-[120px]">
            <AvatarImage src={session?.user.image ?? ""} alt={initials} asChild>
              <Image src={session?.user.image ?? ""} fill alt={initials} quality={100} />
            </AvatarImage>
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <span className="text-lg font-semibold">{session?.user.username}</span>
          <Badge variant="secondary">{session?.user.role}</Badge>
        </div>
        <div className="space-y-4 grow">
          <div>
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight ">General</h2>
            <div className="space-y-1">
              {generalList.map((item) => (
                <Button
                  asChild
                  key={item.id}
                  variant={item.path === pathname ? "secondary" : "ghost"}
                  className="w-full justify-start gap-2"
                >
                  <Link href={item.path}>
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
          <div>
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Tables</h2>
            <div className="space-y-1">
              {tablesList.map((item) => (
                <Button
                  asChild
                  key={item.id}
                  variant={item.path === pathname ? "secondary" : "ghost"}
                  className="w-full justify-start gap-2"
                >
                  <Link href={item.path}>
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center">
          Created by{" "}
          <a href="https://github.com/zoxione" target="_blank" className="text-pink-500 hover:underline">
            zoxione
          </a>
          , {new Date().getFullYear()}
        </div>
      </div>
      <Separator orientation="vertical" />
    </aside>
  )
}
