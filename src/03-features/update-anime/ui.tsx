"use client"

import { Loader2 } from "lucide-react"
import { useState } from "react"

import { Button } from "@/01-shared/ui/button"

export const UpdateAnimeButton = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleUpdateAnime = async () => {
    setIsLoading(true)

    try {
      const res = await fetch(process.env.GITHUB_UPDATEANIME_URL ?? "", {
        method: "POST",
        headers: {
          Authorization: `token ${process.env.GITHUB_ACCESSTOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
        body: JSON.stringify({
          ref: "master",
        }),
      })
    } catch (error: any) {
      console.error(error)
    }

    setIsLoading(false)
  }

  return (
    <Button onClick={handleUpdateAnime} disabled={isLoading}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Update Anime
    </Button>
  )
}
