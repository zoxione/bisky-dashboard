"use client"

import {
  BackpackIcon,
  BarChartIcon,
  HomeIcon,
  InfoCircledIcon,
  PersonIcon,
} from "@radix-ui/react-icons"
import {
  FlagTriangleRightIcon,
  LineChartIcon,
  VenetianMaskIcon,
  VideoIcon,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Separator } from "@/01-shared/ui/separator"
import { Button } from "@/01-shared/ui/button"
import { cn } from "@/01-shared/libs/shadcn"

interface ISidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

const Sidebar = ({ className }: ISidebarProps) => {
  const pathname = usePathname()

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
      <aside
        className={cn(
          "hidden lg:flex sticky top-[69px] h-[calc(100vh-69px)] box-border overflow-y-auto flex-row justify-between",
          className,
        )}
      >
        <div className="flex flex-col justify-between items-center px-3 py-4">
          <div className="space-y-4">
            <div>
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight ">
                General
              </h2>
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
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Tables
              </h2>
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
          <div className="p-4 text-center">
            Created by{" "}
            <a
              href="https://github.com/zoxione"
              target="_blank"
              className="text-pink-500 hover:underline"
            >
              zoxione
            </a>
            , {new Date().getFullYear()}
          </div>
        </div>
        <Separator orientation="vertical" />
      </aside>
    </>
  )
}

export default Sidebar
