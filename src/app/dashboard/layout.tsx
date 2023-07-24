import BottomNavigation from "@/04-widgets/bottom-navigation"
import Header from "@/04-widgets/header"
import Sidebar from "@/04-widgets/sidebar"
import { ReactNode } from "react"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />

      <main className="grid grid-cols-1 lg:grid-cols-5 h-full">
        <Sidebar />
        <BottomNavigation />
        <section className="col-span-3 lg:col-span-4 p-4 pb-[81px]">
          {children}
        </section>
      </main>
    </>
  )
}
