"use client"

import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"
import { LogOutIcon } from "lucide-react"

import Logo from "/public/favicon-64x64.png"

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/01-shared/ui/menubar"
import { Separator } from "@/01-shared/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/01-shared/ui/avatar"
import { toast } from "@/01-shared/ui/use-toast"
import { Skeleton } from "@/01-shared/ui/skeleton"
import { getInitialsFromUsername } from "@/02-entities/user/utils/get-initials-from-username"
import { ToggleTheme } from "@/03-features/toggle-theme"

export const Header = () => {
  const { data: session, status, update } = useSession()

  const initials = getInitialsFromUsername(session?.user?.username ?? "")

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" })
    toast({
      variant: "default",
      title: "Logged out",
      description: "You have successfully logged out. See you next time!",
    })
  }

  return (
    <header className="w-full sticky top-0 bg-background z-50">
      <div className="flex flex-row items-center justify-between px-8 py-4">
        <Link href="/" className="flex flex-row items-center gap-2">
          <Image src={Logo} height={20} alt="bisky-logo" />
          Dashboard
        </Link>
        <div className="flex flex-row items-center gap-2">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger className="gap-2">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={session?.user?.image ?? ""} alt={initials} asChild>
                    <Image src={session?.user?.image ?? ""} fill alt={initials} />
                  </AvatarImage>
                  <AvatarFallback className="text-[9px]">{initials}</AvatarFallback>
                </Avatar>
                {status === "loading" ? (
                  <Skeleton className="w-[80px] h-[16px]" />
                ) : status === "authenticated" ? (
                  <>{session?.user?.username}</>
                ) : (
                  <>Untitled</>
                )}
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  <ToggleTheme />
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem onClick={handleSignOut} className="text-red-600">
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  Sign out
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
      <Separator />
    </header>
  )
}
