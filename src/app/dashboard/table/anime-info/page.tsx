import { Badge } from "@/01-shared/ui/badge"
import { getAllAnime } from "@/02-entities/anime/api"
import AnimeTable from "@/04-widgets/anime-table"

export default async function Page() {
  const data = await getAllAnime()

  return (
    <>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-2">
        AnimeInfo table from mongoDB
        <Badge variant="secondary" className="ml-4">
          Only reading
        </Badge>
      </h3>
      <AnimeTable />

      <span className="">Count rows: {data.length}</span>
    </>
  )
}
