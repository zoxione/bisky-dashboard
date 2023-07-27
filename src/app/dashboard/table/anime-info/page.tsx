import { Badge } from "@/01-shared/ui/badge"
import UpdateAnimeButton from "@/03-features/update-anime/ui"
import AnimeTable from "@/04-widgets/anime-table"

export const revalidate = 60

export default async function Page() {
  return (
    <>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-2">
        AnimeInfo table from mongoDB
        <Badge variant="secondary" className="ml-4">
          Only reading
        </Badge>
      </h3>
      <AnimeTable />

      <UpdateAnimeButton />
    </>
  )
}
