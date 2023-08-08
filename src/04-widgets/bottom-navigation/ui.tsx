"use client"

import { HomeIcon, TableIcon } from "lucide-react"
import Link from "next/link"

import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/01-shared/ui/menubar"
import { Separator } from "@/01-shared/ui/separator"
import { generalList, tablesList } from "@/01-shared/data"

export const BottomNavigation = () => {
  return (
    <>
      <div className="w-full bg-white dark:bg-neutral-950 fixed z-50 bottom-0 block lg:hidden pb-3">
        <Separator className="mb-3" />
        <Menubar className="border-0 justify-evenly w-full h-fit p-0 shadow-none">
          <MenubarMenu>
            <MenubarTrigger className="flex flex-col justify-center items-center gap-1 w-fit">
              <HomeIcon />
              General
            </MenubarTrigger>
            <MenubarContent side="top">
              {generalList.map((item) => (
                <MenubarItem asChild key={item.id}>
                  <Link href={item.path}>{item.title}</Link>
                </MenubarItem>
              ))}
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className="flex flex-col justify-center items-center gap-1 w-fit">
              <TableIcon />
              Tables
            </MenubarTrigger>
            <MenubarContent side="top">
              {tablesList.map((item) => (
                <MenubarItem asChild key={item.id}>
                  <Link href={item.path}>{item.title}</Link>
                </MenubarItem>
              ))}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </>
  )
}
