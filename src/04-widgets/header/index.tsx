"use client"

import { signOut, useSession } from "next-auth/react"
import { Button } from "@/01-shared/ui/button"
import ToggleTheme from "@/03-features/toggle-theme/ui"
import Link from "next/link"
import Image from "next/image"
import Logo from "/public/favicon-64x64.png"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/01-shared/ui/menubar"
import { Separator } from "@/01-shared/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/01-shared/ui/avatar"

const Header = () => {
  const session = useSession()
  // console.log(session)

  return (
    <>
      <header className="w-full flex flex-row items-center justify-between px-8 my-4">
        <Link href="/" className="flex flex-row items-center gap-2">
          <Image src={Logo} height={20} alt="bisky-logo" />
          Dashboard
        </Link>
        <div className="flex flex-row items-center gap-2">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger className="gap-2  ">
                <Avatar className="h-5 w-5">
                  <AvatarImage
                    src={session.data?.user.image ?? ""}
                    alt="avatar"
                  />
                  <AvatarFallback className="text-[9px]">
                    {session.data?.user.username?.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {session.data?.user.username}
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  <ToggleTheme />
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-red-600"
                >
                  Sign out
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </header>
      <Separator />
    </>
  )
}

export default Header
