"use client"

import { ReactNode } from "react"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"
import { Provider } from "react-redux"

import { store } from "../store"

interface IProviders {
  children: ReactNode
}

const Providers = ({ children }: IProviders) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Provider store={store}>
        <SessionProvider>{children}</SessionProvider>
      </Provider>
    </ThemeProvider>
  )
}

export default Providers
