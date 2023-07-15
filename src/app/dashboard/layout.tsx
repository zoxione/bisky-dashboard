import BottomNavigation from "@/04-widgets/bottom-navigation"
import Header from "@/04-widgets/header"
import Sidebar from "@/04-widgets/sidebar"
import { ReactNode } from "react"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />

      <main className="grid lg:grid-cols-5 h-full">
        <Sidebar />
        <BottomNavigation />
        <section className="col-span-3 lg:col-span-4 p-4">{children}</section>
      </main>
    </>
  )
}
