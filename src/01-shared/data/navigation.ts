import {
  BackpackIcon,
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

export const generalList = [
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

export const tablesList = [
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
