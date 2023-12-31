import { ReactNode } from "react"

import { BottomNavigation } from "@/04-widgets/bottom-navigation"
import { Header } from "@/04-widgets/header"
import { Sidebar } from "@/04-widgets/sidebar"


// const Header = dynamic(() => import("@/04-widgets/header").then((module) => module.Header))
// const BottomNavigation = dynamic(() =>
//   import("@/04-widgets/bottom-navigation").then((module) => module.BottomNavigation),
// )
// const Sidebar = dynamic(() => import("@/04-widgets/sidebar").then((module) => module.Sidebar))

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />

      <main className="grid grid-cols-1 lg:grid-cols-5 h-full">
        <Sidebar />
        <BottomNavigation />
        <section className="col-span-3 lg:col-span-4 p-4 pb-[97px] space-y-8">{children}</section>
      </main>
    </>
  )
}
