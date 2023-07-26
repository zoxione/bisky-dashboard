"use client"

import { InfoCircledIcon, PersonIcon } from "@radix-ui/react-icons"
import {
  BackpackIcon,
  FlagTriangleRightIcon,
  HomeIcon,
  LineChartIcon,
  TableIcon,
  VenetianMaskIcon,
  VideoIcon,
} from "lucide-react"
import Link from "next/link"

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/01-shared/ui/menubar"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/01-shared/ui/navigation-menu"
import { Separator } from "@/01-shared/ui/separator"

const BottomNavigation = () => {
  const generalList = [
    {
      id: 1,
      title: "Overview",
      path: "/dashboard/overview",
      icon: HomeIcon,
    },
    {
      id: 2,
      title: "Analytics",
      path: "/dashboard/analytics",
      icon: LineChartIcon,
    },
    {
      id: 3,
      title: "Reports",
      path: "/dashboard/reports",
      icon: FlagTriangleRightIcon,
    },
  ]

  const tablesList = [
    {
      id: 1,
      title: "Users",
      path: "/dashboard/table/users",
      icon: PersonIcon,
    },
    {
      id: 2,
      title: "AnimeInfo",
      path: "/dashboard/table/anime-info",
      icon: VideoIcon,
    },
    {
      id: 3,
      title: "Genres",
      path: "/dashboard/table/genres",
      icon: VenetianMaskIcon,
    },
    {
      id: 4,
      title: "Studios",
      path: "/dashboard/table/studios",
      icon: BackpackIcon,
    },
    {
      id: 5,
      title: "Facts",
      path: "/dashboard/table/facts",
      icon: InfoCircledIcon,
    },
  ]

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

export default BottomNavigation
