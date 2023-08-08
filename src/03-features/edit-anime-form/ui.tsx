import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/01-shared/ui/button"
import { Form } from "@/01-shared/ui/form"
import { useToast } from "@/01-shared/ui/use-toast"
import { AnimeInfo } from "@/02-entities/anime/models/anime-info"
import { useUpdateOneAnimeInfoMutation } from "@/02-entities/anime/api"

import { editAnimeFormSchema } from "./edit-anime-form-schema"

interface IEditAnimeFormProps {
  animeInfo: AnimeInfo
}

export const EditAnimeForm = ({ animeInfo }: IEditAnimeFormProps) => {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [updateAnimeInfo] = useUpdateOneAnimeInfoMutation()

  const form = useForm<z.infer<typeof editAnimeFormSchema>>({
    resolver: zodResolver(editAnimeFormSchema),
    defaultValues: {
      _id: animeInfo._id.toString(),
      id: animeInfo.id,
      labels: animeInfo.labels,
      poster: animeInfo.poster ?? "",
      kind: animeInfo.kind,
      scores: animeInfo.scores,
      // anotherScores: animeInfo.anotherScores,
      status: animeInfo.status,
      // episodes: {
      //   count: animeInfo.episodes.count ?? 0,
      //   aired: animeInfo.episodes.aired ?? 0,
      //   duration: animeInfo.episodes.duration,
      //   nextEpisodeAt: animeInfo.episodes.nextEpisodeAt ?? undefined,
      // },
      // dates: {
      //   airedOn: animeInfo.dates.airedOn?.toString() ?? undefined,
      //   releasedOn: animeInfo.dates.releasedOn?.toString() ?? undefined,
      // },
      rating: animeInfo.rating,
      description: animeInfo.description ?? "",
      // screenshots: animeInfo.screenshots,
      // videos: animeInfo.videos,
      // genres: animeInfo.genres,
      // studios: animeInfo.studios,
      // franchise: {
      //   name: animeInfo.franchise.name ?? "",
      //   animes: animeInfo.franchise.animes,
      // },
      updateDate: animeInfo.updateDate.toString(),
    },
  })

  const formFields = Object.keys(editAnimeFormSchema.shape) as (keyof typeof editAnimeFormSchema.shape)[]

  const onSubmit = async (values: z.infer<typeof editAnimeFormSchema>) => {
    setIsLoading(true)

    console.log(values)

    // await updateAnimeInfo(values)
    //   .unwrap()
    //   .then((payload: any) => {
    //     toast({
    //       variant: "default",
    //       title: "Data changed",
    //     })
    //   })
    //   .catch((error: any) => {
    //     console.error("rejected", error)
    //     toast({
    //       variant: "destructive",
    //       title: "Data change error",
    //       description: error.error,
    //     })
    //   })

    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Button type="submit" className="w-full" disabled={isLoading || !form.formState.isDirty}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Edit
        </Button>
      </form>
    </Form>
  )
}
