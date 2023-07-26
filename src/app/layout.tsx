import { ReactNode } from "react"
import { Inter } from "next/font/google"

import "@/07-core/styles/globals.css"
import { cn } from "@/01-shared/libs/shadcn"
import { Toaster } from "@/01-shared/ui/toaster"
import Providers from "@/07-core/providers"

import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Bisky Dashboard",
  description: "Bisky Dashboard",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="flex min-h-full" suppressHydrationWarning={true}>
      <body className={cn(inter.className, "flex flex-col flex-auto m-0 p-0")}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
